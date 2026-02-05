package com.sharebite.backend.model;

import jakarta.persistence.*;
import java.time.Instant;

/**
 * Entity representing a claim on a food listing by a recipient.
 */
@Entity
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private FoodListing foodListing;

    @ManyToOne(optional = false)
    private User recipient;

    @Enumerated(EnumType.STRING)
    private ClaimStatus status = ClaimStatus.PENDING;

    private Instant pickupTime;

    private Instant createdAt = Instant.now();

    public Claim() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public FoodListing getFoodListing() { return foodListing; }
    public void setFoodListing(FoodListing foodListing) { this.foodListing = foodListing; }
    public User getRecipient() { return recipient; }
    public void setRecipient(User recipient) { this.recipient = recipient; }
    public ClaimStatus getStatus() { return status; }
    public void setStatus(ClaimStatus status) { this.status = status; }
    public Instant getPickupTime() { return pickupTime; }
    public void setPickupTime(Instant pickupTime) { this.pickupTime = pickupTime; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
