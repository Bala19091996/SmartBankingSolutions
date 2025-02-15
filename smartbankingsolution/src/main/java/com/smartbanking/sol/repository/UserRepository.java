package com.smartbanking.sol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.smartbanking.sol.model.User;
import com.smartbanking.sol.model.User.AccountStatus;

import jakarta.transaction.Transactional;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	Optional<User> findByUserEmail(String userEmail);
	
	 // Count total users
    long count();

    // Count active users (approved accounts)
    long countByIsApproved(boolean isApproved);
    
    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.accountStatus = :status WHERE u.userId = :userId")
    int updateAccountStatusByUserId(Long userId, AccountStatus status);
}
