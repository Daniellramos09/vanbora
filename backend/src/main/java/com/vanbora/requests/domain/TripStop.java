package com.vanbora.requests.domain;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "trip_stops")
public class TripStop {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID requestId;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private int passengersCount = 1;

    @Column(nullable = false)
    private int sequenceOrder = 1;

    public TripStop() {}

    public TripStop(UUID requestId, String address, int passengersCount, int sequenceOrder) {
        this.requestId = requestId;
        this.address = address;
        this.passengersCount = passengersCount;
        this.sequenceOrder = sequenceOrder;
    }

    public UUID getId() { return id; }
    public UUID getRequestId() { return requestId; }
    public void setRequestId(UUID requestId) { this.requestId = requestId; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public int getPassengersCount() { return passengersCount; }
    public void setPassengersCount(int passengersCount) { this.passengersCount = passengersCount; }
    public int getSequenceOrder() { return sequenceOrder; }
    public void setSequenceOrder(int sequenceOrder) { this.sequenceOrder = sequenceOrder; }
}
