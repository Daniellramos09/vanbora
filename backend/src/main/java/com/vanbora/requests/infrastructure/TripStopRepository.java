package com.vanbora.requests.infrastructure;

import com.vanbora.requests.domain.TripStop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TripStopRepository extends JpaRepository<TripStop, UUID> {
    List<TripStop> findByRequestIdOrderBySequenceOrderAsc(UUID requestId);
}
