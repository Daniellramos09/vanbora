package com.vanbora.identity.api;

import com.vanbora.identity.api.dto.ProviderCatalogItemDTO;
import com.vanbora.identity.domain.ProviderProfile;
import com.vanbora.identity.domain.User;
import com.vanbora.identity.infrastructure.ProviderProfileRepository;
import com.vanbora.identity.infrastructure.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/providers")
@Tag(name = "Catálogo de Motoristas", description = "Consulta pública de motoristas verificados por região de atuação")
public class ProviderCatalogController {

    private final ProviderProfileRepository providerRepository;
    private final UserRepository userRepository;

    public ProviderCatalogController(ProviderProfileRepository providerRepository, UserRepository userRepository) {
        this.providerRepository = providerRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/catalog")
    @Operation(summary = "Lista pública de motoristas parceiros habilitados com suas regiões de atuação")
    public ResponseEntity<List<ProviderCatalogItemDTO>> getCatalog(
            @RequestParam(required = false) String region) {

        List<ProviderProfile> profiles = providerRepository.findAll();
        Map<UUID, User> usersMap = userRepository.findAll().stream()
                .collect(Collectors.toMap(User::getId, u -> u, (u1, u2) -> u1));

        List<ProviderCatalogItemDTO> catalog = profiles.stream()
                .filter(p -> region == null || region.isBlank() || 
                             (p.getBaseRegion() != null && p.getBaseRegion().toLowerCase().contains(region.toLowerCase())) ||
                             (p.getOperatingZones() != null && p.getOperatingZones().toLowerCase().contains(region.toLowerCase())))
                .map(p -> {
                    User user = usersMap.get(p.getUserId());
                    String name = user != null ? user.getName() : "Motorista Parceiro";
                    return new ProviderCatalogItemDTO(
                            p.getId(),
                            p.getUserId(),
                            name,
                            p.getNickname() != null ? p.getNickname() : name,
                            p.getBaseRegion() != null ? p.getBaseRegion() : "Grande São Paulo",
                            p.getOperatingZones() != null ? p.getOperatingZones() : "São Paulo e Região Metropolitana",
                            p.getRating() != null ? p.getRating() : BigDecimal.valueOf(5.0),
                            p.getCompletedTrips(),
                            p.getBio() != null ? p.getBio() : "Motorista experiente dedicado a passeios em família, buffets e eventos.",
                            p.getAmenities() != null ? p.getAmenities() : "Ar-condicionado, Tomada USB, Cinto em todos os assentos",
                            p.isHasCnhEar()
                    );
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(catalog);
    }
}
