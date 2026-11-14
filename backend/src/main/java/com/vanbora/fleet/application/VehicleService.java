package com.vanbora.fleet.application;

import com.vanbora.fleet.api.dto.RegisterVehicleDTO;
import com.vanbora.fleet.api.dto.VehicleResponseDTO;
import com.vanbora.fleet.domain.Vehicle;
import com.vanbora.fleet.domain.VehicleStatus;
import com.vanbora.fleet.infrastructure.VehicleRepository;
import com.vanbora.shared.exception.BusinessRuleException;
import com.vanbora.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    @Transactional
    public VehicleResponseDTO registerVehicle(UUID providerId, RegisterVehicleDTO dto) {
        String cleanPlate = dto.plate().trim().toUpperCase().replace("-", "");
        if (vehicleRepository.existsByPlate(cleanPlate)) {
            throw new BusinessRuleException("Já existe um veículo cadastrado com a placa informada.");
        }

        Vehicle vehicle = Vehicle.builder()
                .providerId(providerId)
                .plate(cleanPlate)
                .model(dto.model().trim())
                .manufactureYear(dto.manufactureYear())
                .capacity(dto.capacity())
                .photoUrl(dto.photoUrl())
                .status(VehicleStatus.PENDING_APPROVAL)
                .build();

        Vehicle saved = vehicleRepository.save(vehicle);
        return VehicleResponseDTO.fromEntity(saved);
    }

    @Transactional(readOnly = true)
    public List<VehicleResponseDTO> listProviderVehicles(UUID providerId) {
        return vehicleRepository.findByProviderId(providerId)
                .stream()
                .map(VehicleResponseDTO::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public VehicleResponseDTO getVehicleById(UUID vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Veículo não encontrado com id: " + vehicleId));
        return VehicleResponseDTO.fromEntity(vehicle);
    }
}
