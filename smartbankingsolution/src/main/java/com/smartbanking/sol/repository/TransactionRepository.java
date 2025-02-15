package com.smartbanking.sol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.smartbanking.sol.model.Transactions;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transactions, Long> {

	List<Transactions> findByAccount_User_UserId(Long userId);
    // Find all transactions by account ID (assuming `account` is related to `Account` object)

    // Find all transactions by user ID (user accessed via Account)
    List<Transactions> findByAccount_User_UserId(long userId);  // Updated query

	List<Transactions> findByAccountAccountId(long accountId);


}
