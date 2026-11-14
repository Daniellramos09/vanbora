package com.vanbora.requests.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "service_requests")
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID customerId;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceCategory category;

    @Column(nullable = false)
    private String origin;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private LocalDateTime departureAt;

    private LocalDateTime returnAt;

    @Column(nullable = false)
    private int passengers;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal estimatedPrice;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status = RequestStatus.OPEN;

    @Column(length = 1000)
    private String additionalDetails;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Version
    private Long version; // Lock otimista para concorrência (RN-003)

    public ServiceRequest() {}

    public ServiceRequest(UUID customerId, String customerName, String title, ServiceCategory category,
                          String origin, String destination, LocalDateTime departureAt, LocalDateTime returnAt,
                          int passengers, BigDecimal estimatedPrice, String additionalDetails) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.title = title;
        this.category = category;
        this.origin = origin;
        this.destination = destination;
        this.departureAt = departureAt;
        this.returnAt = returnAt;
        this.passengers = passengers;
        this.estimatedPrice = estimatedPrice;
        this.additionalDetails = additionalDetails;
    }

    public UUID getId() { return id; }
    public UUID getCustomerId() { return customerId; }
    public String getCustomerName() { return customerName; }
    public String getTitle() { return title; }
    public ServiceCategory getCategory() { return category; }
    public String getOrigin() { return origin; }
    public String getDestination() { return destination; }
    public LocalDateTime getDepartureAt() { return departureAt; }
    public void setDepartureAt(LocalDateTime departureAt) { this.departureAt = departureAt; }
    public LocalDateTime getReturnAt() { return returnAt; }
    public int getPassengers() { return passengers; }
    public BigDecimal getEstimatedPrice() { return estimatedPrice; }
    public void setEstimatedPrice(BigDecimal estimatedPrice) { this.estimatedPrice = estimatedPrice; }
    public RequestStatus getStatus() { return status; }
    public void setStatus(RequestStatus status) { this.status = status; }
    public String getAdditionalDetails() { return additionalDetails; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public Long getVersion() { return version; }
}
