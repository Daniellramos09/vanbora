package com.vanbora.fleet.infrastructure;

import com.vanbora.fleet.domain.Vehicle;
import com.vanbora.fleet.domain.VehicleStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, UUID> {
    List<Vehicle> findByProviderId(UUID providerId);
    List<Vehicle> findByProviderIdAndStatus(UUID providerId, VehicleStatus status);
    Optional<Vehicle> findByPlate(String plate);
    boolean existsByPlate(String plate);
}
