package com.vanbora.bookings.application;

import com.vanbora.bookings.domain.Booking;
import com.vanbora.bookings.domain.BookingStatus;
import com.vanbora.requests.domain.ServiceRequest;
import com.vanbora.shared.exception.BusinessRuleException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("CancellationPolicyService - Regras de Cancelamento e Reembolso")
class CancellationPolicyServiceTest {

    private final CancellationPolicyService service = new CancellationPolicyService();

    @Test
    @DisplayName("Cancelamento com mais de 48h deve garantir 100% de reembolso")
    void shouldReturnFullRefundWhenCancelledMoreThan48HoursBefore() {
        Booking booking = Booking.builder().status(BookingStatus.CONFIRMED).build();
        ServiceRequest request = new ServiceRequest();
        
        LocalDateTime now = LocalDateTime.of(2026, 11, 20, 10, 0);
        LocalDateTime departure = LocalDateTime.of(2026, 11, 25, 8, 0); // ~118h antes
        request.setDepartureAt(departure);

        CancellationPolicyService.CancellationResult result = service.evaluateClientCancellation(booking, request, now);

        assertThat(result.allowed()).isTrue();
        assertThat(result.refundPercentage()).isEqualTo(new BigDecimal("100.00"));
        assertThat(result.policyNote()).contains("Reembolso integral garantido");
    }

    @Test
    @DisplayName("Cancelamento entre 24h e 48h deve reter 50% para compensar a van")
    void shouldReturnFiftyPercentRefundWhenCancelledBetween24And48Hours() {
        Booking booking = Booking.builder().status(BookingStatus.CONFIRMED).build();
        ServiceRequest request = new ServiceRequest();

        LocalDateTime now = LocalDateTime.of(2026, 11, 20, 10, 0);
        LocalDateTime departure = LocalDateTime.of(2026, 11, 21, 14, 0); // 28h antes
        request.setDepartureAt(departure);

        CancellationPolicyService.CancellationResult result = service.evaluateClientCancellation(booking, request, now);

        assertThat(result.allowed()).isTrue();
        assertThat(result.refundPercentage()).isEqualTo(new BigDecimal("50.00"));
    }

    @Test
    @DisplayName("Cancelamento com menos de 24h deve reter 100% (0% de reembolso)")
    void shouldReturnZeroRefundWhenCancelledLessThan24HoursBefore() {
        Booking booking = Booking.builder().status(BookingStatus.CONFIRMED).build();
        ServiceRequest request = new ServiceRequest();

        LocalDateTime now = LocalDateTime.of(2026, 11, 20, 10, 0);
        LocalDateTime departure = LocalDateTime.of(2026, 11, 20, 16, 0); // 6h antes
        request.setDepartureAt(departure);

        CancellationPolicyService.CancellationResult result = service.evaluateClientCancellation(booking, request, now);

        assertThat(result.allowed()).isTrue();
        assertThat(result.refundPercentage()).isEqualTo(BigDecimal.ZERO);
    }

    @Test
    @DisplayName("Não deve permitir cancelar viagem cujo embarque já passou")
    void shouldRejectCancellationIfDepartureAlreadyPassed() {
        Booking booking = Booking.builder().status(BookingStatus.CONFIRMED).build();
        ServiceRequest request = new ServiceRequest();

        LocalDateTime now = LocalDateTime.of(2026, 11, 20, 10, 0);
        LocalDateTime departure = LocalDateTime.of(2026, 11, 20, 8, 0); // 2h depois do embarque
        request.setDepartureAt(departure);

        assertThatThrownBy(() -> service.evaluateClientCancellation(booking, request, now))
                .isInstanceOf(BusinessRuleException.class)
                .hasMessageContaining("horário de embarque já ocorreu");
    }
}
