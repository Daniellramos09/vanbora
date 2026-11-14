package com.vanbora.requests.api.dto;

import com.vanbora.requests.domain.RequestStatus;
import com.vanbora.requests.domain.ServiceCategory;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record TripRequestResponseDTO(
    UUID id,
    UUID customerId,
    String customerName,
    String title,
    ServiceCategory category,
    String origin,
    String destination,
    LocalDateTime departureAt,
    LocalDateTime returnAt,
    int passengers,
    BigDecimal estimatedPrice,
    RequestStatus status,
    String additionalDetails,
    List<WaypointResponseDTO> waypoints,
    LocalDateTime createdAt
) {
    public record WaypointResponseDTO(
        UUID id,
        String address,
        int passengersCount,
        int sequenceOrder
    ) {}
}
