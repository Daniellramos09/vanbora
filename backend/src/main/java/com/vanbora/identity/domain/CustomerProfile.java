package com.vanbora.identity.domain;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "customer_profiles")
public class CustomerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private UUID userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CustomerType type; // PF ou PJ

    private String document; // CPF ou CNPJ (protegido LGPD)

    private String companyName;

    private String city;

    public enum CustomerType {
        PF, PJ
    }

    public CustomerProfile() {}

    public CustomerProfile(UUID userId, CustomerType type, String companyName, String city) {
        this.userId = userId;
        this.type = type;
        this.companyName = companyName;
        this.city = city;
    }

    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public CustomerType getType() { return type; }
    public void setType(CustomerType type) { this.type = type; }
    public String getDocument() { return document; }
    public void setDocument(String document) { this.document = document; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
}
