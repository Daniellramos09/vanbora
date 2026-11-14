package com.vanbora.bookings.api.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record SubmitProposalDTO(
    @NotNull(message = "ID da solicitação é obrigatório")
    UUID requestId,

    UUID vehicleId,

    @NotNull(message = "Valor proposto é obrigatório")
    @DecimalMin(value = "50.00", message = "Valor mínimo para atendimento é R$ 50,00")
    BigDecimal amount,

    String conditions,

    @NotNull(message = "Data de validade da proposta é obrigatória")
    @Future(message = "A validade deve ser uma data futura")
    LocalDateTime expiresAt
) {}
