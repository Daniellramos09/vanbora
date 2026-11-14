package com.vanbora.bookings.api.dto;

import com.vanbora.bookings.domain.Booking;
import com.vanbora.bookings.domain.BookingStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record BookingResponseDTO(
    UUID id,
    UUID proposalId,
    UUID requestId,
    UUID providerId,
    UUID vehicleId,
    BigDecimal amount,
    LocalDateTime acceptedAt,
    BookingStatus status,
    String escrowStatus,
    String checkInCode,
    LocalDateTime checkedInAt,
    LocalDateTime completedAt
) {
    public static BookingResponseDTO fromEntity(Booking booking) {
        return new BookingResponseDTO(
            booking.getId(),
            booking.getProposal().getId(),
            booking.getProposal().getRequestId(),
            booking.getProposal().getProviderId(),
            booking.getProposal().getVehicleId(),
            booking.getProposal().getAmount(),
            booking.getAcceptedAt(),
            booking.getStatus(),
            booking.getEscrowStatus(),
            booking.getCheckInCode(),
            booking.getCheckedInAt(),
            booking.getCompletedAt()
        );
    }
}
