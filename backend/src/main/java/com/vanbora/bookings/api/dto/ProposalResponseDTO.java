package com.vanbora.bookings.api.dto;

import com.vanbora.bookings.domain.Proposal;
import com.vanbora.bookings.domain.ProposalStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record ProposalResponseDTO(
    UUID id,
    UUID requestId,
    UUID providerId,
    UUID vehicleId,
    BigDecimal amount,
    String conditions,
    LocalDateTime expiresAt,
    ProposalStatus status,
    LocalDateTime createdAt
) {
    public static ProposalResponseDTO fromEntity(Proposal proposal) {
        return new ProposalResponseDTO(
            proposal.getId(),
            proposal.getRequestId(),
            proposal.getProviderId(),
            proposal.getVehicleId(),
            proposal.getAmount(),
            proposal.getConditions(),
            proposal.getExpiresAt(),
            proposal.getStatus(),
            proposal.getCreatedAt()
        );
    }
}
