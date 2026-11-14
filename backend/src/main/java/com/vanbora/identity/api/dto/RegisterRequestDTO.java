package com.vanbora.identity.api.dto;

import com.vanbora.identity.domain.CustomerProfile.CustomerType;
import com.vanbora.shared.domain.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequestDTO(
    @NotBlank(message = "O nome é obrigatório")
    String name,

    @NotBlank(message = "O e-mail é obrigatório")
    @Email(message = "E-mail com formato inválido")
    String email,

    @NotBlank(message = "O telefone / WhatsApp é obrigatório")
    String phone,

    @NotBlank(message = "A senha é obrigatória")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    String password,

    @NotNull(message = "O papel do usuário é obrigatório")
    UserRole role,

    // Opcionais para Cliente
    CustomerType clientType,
    String companyName,
    String city,

    // Opcionais para Motorista
    String nickname,
    String vanModel,
    Integer vanCapacity,
    Boolean hasCnhEar,
    String baseRegion
) {}
