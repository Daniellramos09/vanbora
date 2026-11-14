package com.vanbora.bookings.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proposal_id", nullable = false, unique = true)
    private Proposal proposal;

    @Column(name = "accepted_at", nullable = false)
    @Builder.Default
    private LocalDateTime acceptedAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    @Builder.Default
    private BookingStatus status = BookingStatus.CONFIRMED;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "cancellation_reason", columnDefinition = "TEXT")
    private String cancellationReason;

    @Column(name = "cancelled_at")
    private LocalDateTime cancelledAt;

    @Column(name = "cancelled_by")
    private UUID cancelledBy;

    @Column(name = "refund_percentage", precision = 5, scale = 2)
    @Builder.Default
    private java.math.BigDecimal refundPercentage = java.math.BigDecimal.ZERO;

    @Column(name = "escrow_status", length = 30)
    @Builder.Default
    private String escrowStatus = "HELD"; // HELD, RELEASED, REFUNDED

    @Column(name = "check_in_code", length = 10)
    private String checkInCode;

    @Column(name = "checked_in_at")
    private LocalDateTime checkedInAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;
}
