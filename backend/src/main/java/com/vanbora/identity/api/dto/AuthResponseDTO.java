package com.vanbora.identity.api.dto;

import com.vanbora.shared.domain.UserRole;
import java.util.UUID;

public record AuthResponseDTO(
    UUID id,
    String name,
    String email,
    String phone,
    UserRole role,
    String token
) {}
