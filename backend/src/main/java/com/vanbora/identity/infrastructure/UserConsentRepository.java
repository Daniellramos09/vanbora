package com.vanbora.identity.infrastructure;

import com.vanbora.identity.domain.ConsentType;
import com.vanbora.identity.domain.UserConsent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserConsentRepository extends JpaRepository<UserConsent, UUID> {
    List<UserConsent> findByUserId(UUID userId);
    boolean existsByUserIdAndConsentTypeAndGrantedTrue(UUID userId, ConsentType consentType);
}
