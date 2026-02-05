package com.sharebite.backend.controller;

import com.sharebite.backend.dto.ClaimRequest;
import com.sharebite.backend.dto.CreateListingRequest;
import com.sharebite.backend.dto.FoodListingDTO;
import com.sharebite.backend.model.Claim;
import com.sharebite.backend.service.ListingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Endpoints for managing listings and claims.
 */
@RestController
@RequestMapping("/api/listings")
public class ListingController {

    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @PostMapping
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('DONOR')")
    public ResponseEntity<FoodListingDTO> createListing(@Valid @RequestBody CreateListingRequest req) {
        FoodListingDTO dto = listingService.createListing(req);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<FoodListingDTO>> getAvailable() {
        return ResponseEntity.ok(listingService.getAvailableListings());
    }

    @PostMapping("/{id}/claim")
    public ResponseEntity<Claim> claimListing(@PathVariable("id") Long id, @Valid @RequestBody ClaimRequest req) {
        Claim c = listingService.claimListing(id, req);
        return ResponseEntity.ok(c);
    }
}
