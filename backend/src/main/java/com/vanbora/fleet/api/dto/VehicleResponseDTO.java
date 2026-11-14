package com.vanbora.fleet.api.dto;

import com.vanbora.fleet.domain.Vehicle;
import com.vanbora.fleet.domain.VehicleStatus;

import java.util.UUID;

public record VehicleResponseDTO(
    UUID id,
    UUID providerId,
    String plate,
    String model,
    Integer manufactureYear,
    Integer capacity,
    VehicleStatus status,
    String photoUrl
) {
    public static VehicleResponseDTO fromEntity(Vehicle vehicle) {
        return new VehicleResponseDTO(
            vehicle.getId(),
            vehicle.getProviderId(),
            vehicle.getPlate(),
            vehicle.getModel(),
            vehicle.getManufactureYear(),
            vehicle.getCapacity(),
            vehicle.getStatus(),
            vehicle.getPhotoUrl()
        );
    }
}
