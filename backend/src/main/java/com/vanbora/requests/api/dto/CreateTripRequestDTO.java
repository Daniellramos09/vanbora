package com.vanbora.requests.api.dto;

import com.vanbora.requests.domain.ServiceCategory;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public record CreateTripRequestDTO(
    String title,

    @NotNull(message = "A categoria é obrigatória")
    ServiceCategory category,

    @NotBlank(message = "O endereço de origem é obrigatório")
    String origin,

    @NotBlank(message = "O endereço de destino é obrigatório")
    String destination,

    @NotNull(message = "A data e horário de partida são obrigatórios")
    @Future(message = "A data de partida deve estar no futuro")
    LocalDateTime departureAt,

    LocalDateTime returnAt,

    @Min(value = 1, message = "A viagem deve ter pelo menos 1 passageiro")
    int passengers,

    List<CreateWaypointDTO> waypoints,

    String additionalDetails
) {
    public record CreateWaypointDTO(
        @NotBlank String address,
        int passengersCount
    ) {}
}
