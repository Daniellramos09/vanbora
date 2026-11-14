package com.vanbora.fleet.api;

import com.vanbora.fleet.api.dto.RegisterVehicleDTO;
import com.vanbora.fleet.api.dto.VehicleResponseDTO;
import com.vanbora.fleet.application.VehicleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/vehicles")
@Tag(name = "Frota (Fleet)", description = "Gerenciamento de veículos de motoristas parceiros")
@SecurityRequirement(name = "BearerAuth")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PostMapping
    @PreAuthorize("hasRole('PROVIDER')")
    @Operation(summary = "Cadastrar novo veículo", description = "Motorista parceiro cadastra uma nova van para aprovação")
    public ResponseEntity<VehicleResponseDTO> registerVehicle(
            @RequestParam UUID providerId,
            @Valid @RequestBody RegisterVehicleDTO dto
    ) {
        VehicleResponseDTO response = vehicleService.registerVehicle(providerId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @PreAuthorize("hasRole('PROVIDER')")
    @Operation(summary = "Listar veículos do parceiro", description = "Retorna todos os veículos pertencentes ao prestador")
    public ResponseEntity<List<VehicleResponseDTO>> listVehicles(@RequestParam UUID providerId) {
        return ResponseEntity.ok(vehicleService.listProviderVehicles(providerId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obter dados do veículo", description = "Consulta informações de uma van específica")
    public ResponseEntity<VehicleResponseDTO> getVehicle(@PathVariable UUID id) {
        return ResponseEntity.ok(vehicleService.getVehicleById(id));
    }
}
