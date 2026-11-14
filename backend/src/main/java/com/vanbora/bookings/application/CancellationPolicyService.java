package com.vanbora.bookings.application;

import com.vanbora.bookings.domain.Booking;
import com.vanbora.bookings.domain.BookingStatus;
import com.vanbora.requests.domain.ServiceRequest;
import com.vanbora.shared.exception.BusinessRuleException;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;

@Component
public class CancellationPolicyService {

    public record CancellationResult(
            BigDecimal refundPercentage,
            String policyNote,
            boolean allowed
    ) {}

    public CancellationResult evaluateClientCancellation(Booking booking, ServiceRequest request, LocalDateTime now) {
        if (booking.getStatus() != BookingStatus.CONFIRMED) {
            throw new BusinessRuleException("Apenas reservas confirmadas podem ser canceladas.");
        }

        LocalDateTime departure = request.getDepartureAt();
        if (now.isAfter(departure)) {
            throw new BusinessRuleException("Não é possível cancelar uma viagem cujo horário de embarque já ocorreu.");
        }

        long hoursUntilDeparture = Duration.between(now, departure).toHours();

        // Mais de 48h de antecedência: 100% de reembolso / cancelamento sem penalidade
        if (hoursUntilDeparture >= 48) {
            return new CancellationResult(
                    new BigDecimal("100.00"),
                    "Cancelamento com mais de 48h de antecedência. Reembolso integral garantido.",
                    true
            );
        }

        // Entre 24h e 48h: 50% de reembolso (retenção para cobrir custo de reserva de data do motorista)
        if (hoursUntilDeparture >= 24) {
            return new CancellationResult(
                    new BigDecimal("50.00"),
                    "Cancelamento com menos de 48h. Retenção de 50% para compensar a reserva de data da van.",
                    true
            );
        }

        // Menos de 24h: 0% de reembolso (data bloqueada para o motorista)
        return new CancellationResult(
                BigDecimal.ZERO,
                "Cancelamento com menos de 24h do embarque. Sem direito a reembolso devido à indisponibilidade de realocação.",
                true
        );
    }
}
