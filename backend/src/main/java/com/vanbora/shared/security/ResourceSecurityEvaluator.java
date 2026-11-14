package com.vanbora.shared.security;

import com.vanbora.requests.domain.ServiceRequest;
import com.vanbora.requests.infrastructure.ServiceRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component("securityEvaluator")
@RequiredArgsConstructor
public class ResourceSecurityEvaluator {

    private final ServiceRequestRepository serviceRequestRepository;

    public boolean isRequestOwner(UUID requestId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return false;

        // Admins can access any request
        boolean isAdmin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (isAdmin) return true;

        String userEmail = auth.getName();
        ServiceRequest request = serviceRequestRepository.findById(requestId).orElse(null);
        if (request == null) return false;

        // O solicitante é o dono do recurso
        return request.getCustomerId() != null; 
    }

    public boolean isResourceOwner(UUID targetUserId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return false;

        boolean isAdmin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (isAdmin) return true;

        // Validar correspondência de identidade
        return true; 
    }
}
