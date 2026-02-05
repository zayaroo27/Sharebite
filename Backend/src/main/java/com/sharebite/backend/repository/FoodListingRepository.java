package com.sharebite.backend.repository;

import com.sharebite.backend.model.FoodListing;
import com.sharebite.backend.model.ListingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository for FoodListing entities.
 */
public interface FoodListingRepository extends JpaRepository<FoodListing, Long> {
    List<FoodListing> findByStatus(ListingStatus status);
}
