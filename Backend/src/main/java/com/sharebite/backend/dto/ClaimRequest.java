package com.sharebite.backend.dto;

import jakarta.validation.constraints.NotNull;
import java.time.Instant;

/**
 * DTO for claiming a listing.
 */
public class ClaimRequest {
    @NotNull
    private Instant pickupTime;

    public Instant getPickupTime() { return pickupTime; }
    public void setPickupTime(Instant pickupTime) { this.pickupTime = pickupTime; }
}
