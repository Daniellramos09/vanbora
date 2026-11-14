package com.vanbora.identity.api.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record ProviderCatalogItemDTO(
    UUID id,
    UUID userId,
    String name,
    String nickname,
    String baseRegion,
    String operatingZones,
    BigDecimal rating,
    int completedTrips,
    String bio,
    String amenities,
    boolean verifiedCnhEar
) {}
