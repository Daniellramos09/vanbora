package com.vanbora.requests.api;

import com.vanbora.requests.api.dto.CreateTripRequestDTO;
import com.vanbora.requests.api.dto.TripRequestResponseDTO;
import com.vanbora.requests.application.TripPriceCalculator;
import com.vanbora.requests.application.TripRequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/requests")
@Tag(name = "Solicitações de Viagem", description = "Endpoints para cálculo de preço, publicação e consulta no radar")
public class TripRequestController {

    private final TripRequestService requestService;
    private final TripPriceCalculator priceCalculator;

    public TripRequestController(TripRequestService requestService, TripPriceCalculator priceCalculator) {
        this.requestService = requestService;
        this.priceCalculator = priceCalculator;
    }

    @GetMapping("/estimate")
    @Operation(summary = "Simulação pública de preço justo por rota e capacidade (Sem leilão)")
    public ResponseEntity<TripPriceCalculator.RecordEstimate> estimatePrice(
            @RequestParam(defaultValue = "40") int distanceKm,
            @RequestParam(defaultValue = "4") int hours,
            @RequestParam(defaultValue = "15") int passengers,
            @RequestParam(defaultValue = "0") int waypoints) {
        return ResponseEntity.ok(priceCalculator.calculate(distanceKm, hours, passengers, waypoints));
    }

    @PostMapping
    @PreAuthorize("hasRole('CLIENT')")
    @Operation(summary = "Criar e publicar nova solicitação de viagem (Exclusivo para Passageiro/Cliente)")
    public ResponseEntity<TripRequestResponseDTO> createRequest(
            @Valid @RequestBody CreateTripRequestDTO dto,
            Authentication authentication) {
        UUID customerId = (UUID) authentication.getPrincipal();
        TripRequestResponseDTO response = requestService.createRequest(customerId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/radar")
    @Operation(summary = "Consultar viagens abertas no radar da Grande SP")
    public ResponseEntity<List<TripRequestResponseDTO>> getRadarTrips() {
        return ResponseEntity.ok(requestService.getOpenRadarRequests());
    }

    @GetMapping("/my-requests")
    @PreAuthorize("hasRole('CLIENT')")
    @Operation(summary = "Listar viagens publicadas pelo cliente logado")
    public ResponseEntity<List<TripRequestResponseDTO>> getMyRequests(Authentication authentication) {
        UUID customerId = (UUID) authentication.getPrincipal();
        return ResponseEntity.ok(requestService.getCustomerRequests(customerId));
    }
}
