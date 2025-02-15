package com.smartbanking.sol.repository;

import com.smartbanking.sol.model.LoanStatus;
import com.smartbanking.sol.model.Loans;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LoansRepository extends JpaRepository<Loans, Long> {
	List<Loans> findByUserUserId(long userId);
	List<Loans> findByStatusAndRepaymentStartDateNotNull(LoanStatus status);
}
