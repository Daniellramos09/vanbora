package com.vanbora.identity.application;

import com.vanbora.identity.api.dto.AuthResponseDTO;
import com.vanbora.identity.api.dto.RegisterRequestDTO;
import com.vanbora.identity.domain.CustomerProfile.CustomerType;
import com.vanbora.identity.domain.User;
import com.vanbora.identity.infrastructure.CustomerProfileRepository;
import com.vanbora.identity.infrastructure.ProviderProfileRepository;
import com.vanbora.identity.infrastructure.UserRepository;
import com.vanbora.shared.domain.UserRole;
import com.vanbora.shared.exception.BusinessRuleException;
import com.vanbora.shared.security.JwtService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("AuthService - Casos de Uso de Autenticação")
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private CustomerProfileRepository customerProfileRepository;

    @Mock
    private ProviderProfileRepository providerProfileRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    @Test
    @DisplayName("Deve cadastrar cliente com sucesso e gerar token JWT")
    void shouldRegisterClientSuccessfully() {
        // Arrange
        RegisterRequestDTO dto = new RegisterRequestDTO(
                "Carlos Silva",
                "carlos@example.com",
                "11988887777",
                "senhaForte123",
                UserRole.ROLE_CLIENT,
                CustomerType.PF,
                null,
                "São Paulo",
                null,
                null,
                null,
                null,
                null
        );

        when(userRepository.existsByEmail("carlos@example.com")).thenReturn(false);
        when(passwordEncoder.encode("senhaForte123")).thenReturn("encodedPassword");

        User savedUser = new User("Carlos Silva", "carlos@example.com", "encodedPassword", "11988887777", UserRole.ROLE_CLIENT);
        UUID userId = UUID.randomUUID();

        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        when(jwtService.generateToken(any(), eq("carlos@example.com"), eq(UserRole.ROLE_CLIENT)))
                .thenReturn("mock.jwt.token");

        // Act
        AuthResponseDTO response = authService.register(dto);

        // Assert
        assertThat(response).isNotNull();
        assertThat(response.token()).isEqualTo("mock.jwt.token");
        assertThat(response.email()).isEqualTo("carlos@example.com");
        verify(customerProfileRepository, times(1)).save(any());
        verify(providerProfileRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve recusar cadastro quando o e-mail já estiver em uso")
    void shouldRejectRegistrationWhenEmailAlreadyExists() {
        RegisterRequestDTO dto = new RegisterRequestDTO(
                "Carlos Silva",
                "carlos@example.com",
                "11988887777",
                "senhaForte123",
                UserRole.ROLE_CLIENT,
                CustomerType.PF,
                null,
                "São Paulo",
                null,
                null,
                null,
                null,
                null
        );

        when(userRepository.existsByEmail("carlos@example.com")).thenReturn(true);

        assertThatThrownBy(() -> authService.register(dto))
                .isInstanceOf(BusinessRuleException.class)
                .hasMessageContaining("Este e-mail já está cadastrado na plataforma.");

        verify(userRepository, never()).save(any());
    }
}
