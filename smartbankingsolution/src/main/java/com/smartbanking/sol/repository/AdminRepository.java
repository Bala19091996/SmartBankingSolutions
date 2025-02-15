package com.smartbanking.sol.repository;

import com.smartbanking.sol.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin>  findByAdminEmail(String adminEmail);
}
