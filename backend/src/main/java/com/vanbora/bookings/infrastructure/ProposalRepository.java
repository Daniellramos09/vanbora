package com.vanbora.bookings.infrastructure;

import com.vanbora.bookings.domain.Proposal;
import com.vanbora.bookings.domain.ProposalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, UUID> {
    List<Proposal> findByRequestId(UUID requestId);
    List<Proposal> findByProviderId(UUID providerId);
    List<Proposal> findByRequestIdAndStatus(UUID requestId, ProposalStatus status);
}
