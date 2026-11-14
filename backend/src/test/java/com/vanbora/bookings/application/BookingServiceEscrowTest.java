package com.vanbora.bookings.application;

import com.vanbora.bookings.api.dto.BookingResponseDTO;
import com.vanbora.bookings.domain.Booking;
import com.vanbora.bookings.domain.BookingStatus;
import com.vanbora.bookings.domain.Proposal;
import com.vanbora.bookings.infrastructure.BookingRepository;
import com.vanbora.bookings.infrastructure.ProposalRepository;
import com.vanbora.requests.domain.RequestStatus;
import com.vanbora.requests.domain.ServiceRequest;
import com.vanbora.requests.infrastructure.ServiceRequestRepository;
import com.vanbora.shared.audit.AuditService;
import com.vanbora.shared.exception.BusinessRuleException;
import com.vanbora.shared.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("BookingService - Testes de Integridade de Custódia & Check-in Anti-Fraude")
class BookingServiceEscrowTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private ProposalRepository proposalRepository;

    @Mock
    private ServiceRequestRepository serviceRequestRepository;

    @Mock
    private AuditService auditService;

    @InjectMocks
    private BookingService bookingService;

    private UUID bookingId;
    private Proposal proposal;
    private Booking booking;

    @BeforeEach
    void setUp() {
        bookingId = UUID.randomUUID();
        proposal = Proposal.builder()
                .id(UUID.randomUUID())
                .requestId(UUID.randomUUID())
                .providerId(UUID.randomUUID())
                .vehicleId(UUID.randomUUID())
                .amount(new BigDecimal("1200.00"))
                .build();

        booking = Booking.builder()
                .id(bookingId)
                .proposal(proposal)
                .status(BookingStatus.CONFIRMED)
                .escrowStatus("HELD")
                .checkInCode("VB-7890")
                .build();
    }

    @Test
    @DisplayName("Deve validar check-in com sucesso quando o código de 4 dígitos estiver correto (case-insensitive)")
    void shouldCheckInSuccessfullyWhenCodeMatches() {
        when(bookingRepository.findById(bookingId)).thenReturn(Optional.of(booking));
        when(bookingRepository.save(any(Booking.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Envia com minúsculo e espaços para testar resiliência
        BookingResponseDTO response = bookingService.checkIn(bookingId, "  vb-7890  ");

        assertThat(response).isNotNull();
        assertThat(response.status()).isEqualTo(BookingStatus.IN_PROGRESS);
        assertThat(response.checkedInAt()).isNotNull();
        verify(bookingRepository, times(1)).save(booking);
    }

    @Test
    @DisplayName("Deve rejeitar check-in com BusinessRuleException se o código for inválido/falso")
    void shouldRejectCheckInWhenCodeIsInvalid() {
        when(bookingRepository.findById(bookingId)).thenReturn(Optional.of(booking));

        assertThatThrownBy(() -> bookingService.checkIn(bookingId, "VB-0000"))
                .isInstanceOf(BusinessRuleException.class)
                .hasMessageContaining("Código de check-in inválido");

        assertThat(booking.getStatus()).isEqualTo(BookingStatus.CONFIRMED);
        verify(bookingRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve permitir liberação de custódia (completeTrip) se a viagem estiver em andamento")
    void shouldCompleteTripAndReleaseEscrowWhenInProgress() {
        booking.setStatus(BookingStatus.IN_PROGRESS);
        booking.setCheckedInAt(LocalDateTime.now().minusHours(3));

        when(bookingRepository.findById(bookingId)).thenReturn(Optional.of(booking));
        when(bookingRepository.save(any(Booking.class))).thenAnswer(invocation -> invocation.getArgument(0));

        BookingResponseDTO response = bookingService.completeTrip(bookingId);

        assertThat(response.status()).isEqualTo(BookingStatus.COMPLETED);
        assertThat(response.escrowStatus()).isEqualTo("RELEASED");
        assertThat(response.completedAt()).isNotNull();
        verify(bookingRepository, times(1)).save(booking);
    }

    @Test
    @DisplayName("Anti-Fraude: Deve bloquear liberação de custódia se o passageiro ainda NÃO embarcou")
    void shouldBlockEscrowReleaseIfPassengerDidNotCheckIn() {
        // Viagem ainda está CONFIRMED (Aguardando embarque), e não IN_PROGRESS
        booking.setStatus(BookingStatus.CONFIRMED);

        when(bookingRepository.findById(bookingId)).thenReturn(Optional.of(booking));

        assertThatThrownBy(() -> bookingService.completeTrip(bookingId))
                .isInstanceOf(BusinessRuleException.class)
                .hasMessageContaining("Apenas viagens em andamento podem ser finalizadas");

        assertThat(booking.getEscrowStatus()).isEqualTo("HELD");
        verify(bookingRepository, never()).save(any());
    }

    @Test
    @DisplayName("Anti-Duplicação: Não deve permitir liberar a custódia duas vezes (Double Spending)")
    void shouldBlockSecondEscrowReleaseAttempt() {
        // Viagem já foi COMPLETED e o saldo já foi liberado
        booking.setStatus(BookingStatus.COMPLETED);
        booking.setEscrowStatus("RELEASED");

        when(bookingRepository.findById(bookingId)).thenReturn(Optional.of(booking));

        assertThatThrownBy(() -> bookingService.completeTrip(bookingId))
                .isInstanceOf(BusinessRuleException.class)
                .hasMessageContaining("Apenas viagens em andamento podem ser finalizadas");

        verify(bookingRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve lançar ResourceNotFoundException se a contratação não existir")
    void shouldThrowNotFoundWhenBookingDoesNotExist() {
        UUID fakeId = UUID.randomUUID();
        when(bookingRepository.findById(fakeId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> bookingService.checkIn(fakeId, "VB-1234"))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}
