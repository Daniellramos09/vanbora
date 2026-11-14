package com.vanbora.identity.application;

import com.vanbora.identity.api.dto.AuthResponseDTO;
import com.vanbora.identity.api.dto.LoginRequestDTO;
import com.vanbora.identity.api.dto.RegisterRequestDTO;
import com.vanbora.identity.domain.ConsentType;
import com.vanbora.identity.domain.CustomerProfile;
import com.vanbora.identity.domain.ProviderProfile;
import com.vanbora.identity.domain.User;
import com.vanbora.identity.domain.UserConsent;
import com.vanbora.identity.infrastructure.CustomerProfileRepository;
import com.vanbora.identity.infrastructure.ProviderProfileRepository;
import com.vanbora.identity.infrastructure.UserConsentRepository;
import com.vanbora.identity.infrastructure.UserRepository;
import com.vanbora.shared.domain.UserRole;
import com.vanbora.shared.exception.BusinessRuleException;
import com.vanbora.shared.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final CustomerProfileRepository customerProfileRepository;
    private final ProviderProfileRepository providerProfileRepository;
    private final UserConsentRepository userConsentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            CustomerProfileRepository customerProfileRepository,
            ProviderProfileRepository providerProfileRepository,
            UserConsentRepository userConsentRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.customerProfileRepository = customerProfileRepository;
        this.providerProfileRepository = providerProfileRepository;
        this.userConsentRepository = userConsentRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponseDTO register(RegisterRequestDTO dto) {
        if (userRepository.existsByEmail(dto.email())) {
            throw new BusinessRuleException("Este e-mail já está cadastrado na plataforma.");
        }

        String passwordHash = passwordEncoder.encode(dto.password());
        User user = new User(dto.name(), dto.email(), passwordHash, dto.phone(), dto.role());
        User savedUser = userRepository.save(user);

        if (dto.role() == UserRole.ROLE_CLIENT) {
            CustomerProfile profile = new CustomerProfile(
                    savedUser.getId(),
                    dto.clientType() != null ? dto.clientType() : CustomerProfile.CustomerType.PF,
                    dto.companyName(),
                    dto.city() != null ? dto.city() : "São Paulo - SP"
            );
            customerProfileRepository.save(profile);
        } else if (dto.role() == UserRole.ROLE_PROVIDER) {
            ProviderProfile profile = new ProviderProfile(
                    savedUser.getId(),
                    dto.nickname() != null ? dto.nickname() : dto.name(),
                    Boolean.TRUE.equals(dto.hasCnhEar()),
                    dto.baseRegion() != null ? dto.baseRegion() : "Grande São Paulo"
            );
            providerProfileRepository.save(profile);
        }

        // Registro de Consentimento LGPD (Art. 7º e 8º da Lei nº 13.709/2018)
        if (Boolean.TRUE.equals(dto.acceptedTerms())) {
            UserConsent consent = UserConsent.builder()
                    .userId(savedUser.getId())
                    .consentType(ConsentType.PRIVACY_POLICY)
                    .termVersion(dto.termVersion() != null ? dto.termVersion() : "v1.0-2026")
                    .granted(true)
                    .ipAddress("127.0.0.1")
                    .userAgent("VanBora Web Client")
                    .build();
            userConsentRepository.save(consent);
        }

        String token = jwtService.generateToken(savedUser.getId(), savedUser.getEmail(), savedUser.getRole());

        return new AuthResponseDTO(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getPhone(),
                savedUser.getRole(),
                token
        );
    }

    @Transactional(readOnly = true)
    public AuthResponseDTO login(LoginRequestDTO dto) {
        User user = userRepository.findByEmail(dto.email())
                .orElseThrow(() -> new BusinessRuleException("E-mail ou senha incorretos."));

        if (!passwordEncoder.matches(dto.password(), user.getPasswordHash())) {
            throw new BusinessRuleException("E-mail ou senha incorretos.");
        }

        if (!user.isActive()) {
            throw new BusinessRuleException("Esta conta está desativada. Entre em contato com o suporte.");
        }

        String token = jwtService.generateToken(user.getId(), user.getEmail(), user.getRole());

        return new AuthResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole(),
                token
        );
    }
}
