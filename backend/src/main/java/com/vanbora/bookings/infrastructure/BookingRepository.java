package com.vanbora.bookings.infrastructure;

import com.vanbora.bookings.domain.Booking;
import com.vanbora.bookings.domain.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    Optional<Booking> findByProposalId(UUID proposalId);

    @Query("SELECT b FROM Booking b WHERE b.proposal.providerId = :providerId ORDER BY b.createdAt DESC")
    List<Booking> findByProviderId(@Param("providerId") UUID providerId);

    @Query("SELECT b FROM Booking b WHERE b.status = :status ORDER BY b.createdAt DESC")
    List<Booking> findByStatus(@Param("status") BookingStatus status);
}
