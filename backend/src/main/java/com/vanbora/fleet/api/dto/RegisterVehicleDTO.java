package com.vanbora.fleet.api.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterVehicleDTO(
    @NotBlank(message = "Placa do veículo é obrigatória")
    String plate,

    @NotBlank(message = "Modelo do veículo é obrigatório (ex: Mercedes Sprinter 19L)")
    String model,

    @NotNull(message = "Ano de fabricação é obrigatório")
    @Min(value = 2000, message = "Ano de fabricação mínimo 2000")
    Integer manufactureYear,

    @NotNull(message = "Capacidade de passageiros é obrigatória")
    @Min(value = 7, message = "Capacidade mínima de 7 lugares")
    @Max(value = 32, message = "Capacidade máxima de 32 lugares")
    Integer capacity,

    String photoUrl
) {}
