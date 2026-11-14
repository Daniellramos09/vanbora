package com.vanbora.requests.infrastructure;

import com.vanbora.requests.domain.RequestStatus;
import com.vanbora.requests.domain.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, UUID> {
    List<ServiceRequest> findByStatusOrderByCreatedAtDesc(RequestStatus status);
    List<ServiceRequest> findByCustomerIdOrderByCreatedAtDesc(UUID customerId);
}
