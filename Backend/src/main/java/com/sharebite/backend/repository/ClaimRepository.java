package com.sharebite.backend.repository;

import com.sharebite.backend.model.Claim;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for Claim entities.
 */
public interface ClaimRepository extends JpaRepository<Claim, Long> {
}
