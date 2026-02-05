package com.sharebite.backend.service;

import com.sharebite.backend.dto.ClaimRequest;
import com.sharebite.backend.dto.CreateListingRequest;
import com.sharebite.backend.dto.FoodListingDTO;
import com.sharebite.backend.model.Claim;
import com.sharebite.backend.model.ClaimStatus;
import com.sharebite.backend.model.FoodListing;
import com.sharebite.backend.model.ListingStatus;
import com.sharebite.backend.model.User;
import com.sharebite.backend.repository.ClaimRepository;
import com.sharebite.backend.repository.FoodListingRepository;
import com.sharebite.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service with basic listing and claim operations.
 */
@Service
public class ListingService {

    private final FoodListingRepository listingRepo;
    private final ClaimRepository claimRepo;
    private final UserRepository userRepository;

    public ListingService(FoodListingRepository listingRepo, ClaimRepository claimRepo, UserRepository userRepository) {
        this.listingRepo = listingRepo;
        this.claimRepo = claimRepo;
        this.userRepository = userRepository;
    }

    public FoodListingDTO createListing(CreateListingRequest req) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User donor = userRepository.findByEmail(email).orElseThrow();

        FoodListing f = new FoodListing();
        f.setTitle(req.getTitle());
        f.setDescription(req.getDescription());
        f.setQuantity(req.getQuantity() != null ? req.getQuantity() : 1);
        f.setExpiryDate(req.getExpiryDate());
        f.setLocation(req.getLocation());
        f.setDonor(donor);
        f.setStatus(ListingStatus.AVAILABLE);

        listingRepo.save(f);
        return toDto(f);
    }

    public List<FoodListingDTO> getAvailableListings() {
        List<FoodListing> listings = listingRepo.findByStatus(ListingStatus.AVAILABLE);
        return listings.stream().map(this::toDto).collect(Collectors.toList());
    }

    public Claim claimListing(Long listingId, ClaimRequest req) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User recipient = userRepository.findByEmail(email).orElseThrow();

        FoodListing listing = listingRepo.findById(listingId).orElseThrow();
        if (listing.getStatus() != ListingStatus.AVAILABLE) {
            throw new IllegalStateException("Listing not available");
        }

        Claim c = new Claim();
        c.setFoodListing(listing);
        c.setRecipient(recipient);
        c.setPickupTime(req.getPickupTime());
        c.setStatus(ClaimStatus.PENDING);
        claimRepo.save(c);

        listing.setStatus(ListingStatus.CLAIMED);
        listingRepo.save(listing);

        return c;
    }

    private FoodListingDTO toDto(FoodListing f) {
        FoodListingDTO d = new FoodListingDTO();
        d.setId(f.getId());
        d.setTitle(f.getTitle());
        d.setDescription(f.getDescription());
        d.setQuantity(f.getQuantity());
        d.setExpiryDate(f.getExpiryDate());
        d.setLocation(f.getLocation());
        d.setStatus(f.getStatus());
        if (f.getDonor() != null) {
            d.setDonorId(f.getDonor().getId());
            d.setDonorName(f.getDonor().getName());
        }
        return d;
    }
}
