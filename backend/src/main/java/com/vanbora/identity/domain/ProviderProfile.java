package com.vanbora.identity.domain;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "provider_profiles")
public class ProviderProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private UUID userId;

    private String nickname; // Ex: Seu Carlos da Van

    private String cnhNumber;

    @Column(nullable = false)
    private boolean hasCnhEar; // CNH Categoria D com anotação EAR

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProviderStatus status = ProviderStatus.UNDER_REVIEW;

    private String baseRegion; // Ex: Zona Leste, ABC, etc.

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(precision = 3, scale = 2)
    private java.math.BigDecimal rating = java.math.BigDecimal.valueOf(5.00);

    private int completedTrips = 0;

    private String operatingZones = "Grande São Paulo";

    private String amenities = "Ar-condicionado, Cinto em todos os assentos";

    public enum ProviderStatus {
        UNDER_REVIEW,
        APPROVED,
        CORRECTION_REQUIRED,
        SUSPENDED
    }

    public ProviderProfile() {}

    public ProviderProfile(UUID userId, String nickname, boolean hasCnhEar, String baseRegion) {
        this.userId = userId;
        this.nickname = nickname;
        this.hasCnhEar = hasCnhEar;
        this.baseRegion = baseRegion;
    }

    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }
    public String getCnhNumber() { return cnhNumber; }
    public void setCnhNumber(String cnhNumber) { this.cnhNumber = cnhNumber; }
    public boolean isHasCnhEar() { return hasCnhEar; }
    public void setHasCnhEar(boolean hasCnhEar) { this.hasCnhEar = hasCnhEar; }
    public ProviderStatus getStatus() { return status; }
    public void setStatus(ProviderStatus status) { this.status = status; }
    public String getBaseRegion() { return baseRegion; }
    public void setBaseRegion(String baseRegion) { this.baseRegion = baseRegion; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public java.math.BigDecimal getRating() { return rating; }
    public void setRating(java.math.BigDecimal rating) { this.rating = rating; }
    public int getCompletedTrips() { return completedTrips; }
    public void setCompletedTrips(int completedTrips) { this.completedTrips = completedTrips; }
    public String getOperatingZones() { return operatingZones; }
    public void setOperatingZones(String operatingZones) { this.operatingZones = operatingZones; }
    public String getAmenities() { return amenities; }
    public void setAmenities(String amenities) { this.amenities = amenities; }
}
