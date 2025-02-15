package com.smartbanking.sol.services;

import com.smartbanking.sol.exception.InsufficientBalanceException;
import com.smartbanking.sol.model.Accounts;
import com.smartbanking.sol.model.User;
import com.smartbanking.sol.model.User.AccountStatus;
import com.smartbanking.sol.repository.AccountRepository;
import com.smartbanking.sol.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.security.auth.login.AccountNotFoundException;

@Service
public class AccountsService {

    @Autowired
    private AccountRepository accountsRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionService transactionService;
    // Get all accounts
    public List<Accounts> getAllAccounts() {
        return accountsRepository.findAll();
    }

    // Get account by ID
    public Optional<Accounts> getAccountById(Long id) {
        return accountsRepository.findById(id);
    }

    // Get account by account number
    public Optional<Accounts> getAccountByAccountNumber(String accountNumber) {
        return accountsRepository.findByAccountNumber(accountNumber);
    }

    // Create a new account
    @Transactional
    public boolean createAccountForUser(long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return false; // User does not exist
        }

        User user = userOptional.get();

        if (!user.isApproved()) {  
            return false; // Ensure the user is approved
        }

        if (accountsRepository.existsByUser(user)) {  
            return false; // Prevent duplicate accounts
        }

        // Generate a unique account number
        String accountNumber = generateUniqueAccountNumber();

        Accounts newAccount = new Accounts();
        newAccount.setUser(user);
        newAccount.setAccountType("SAVINGS");
        newAccount.setAccountNumber(accountNumber);
        newAccount.setCreatedAt(LocalDateTime.now());
        newAccount.setBalance(BigDecimal.ZERO); // Initialize balance
        newAccount.setActive(true); // Activate account

        accountsRepository.save(newAccount);
        return true;
    }
    
    @Transactional
    public boolean createNewAccountForUser(User user) {
        Optional<User> existingUser = userRepository.findById(user.getUserId());

        if (!existingUser.isPresent()) {  
            // Save the new user to persist it before linking it to the account
            user.setApproved(true);
            AccountStatus newStatus = AccountStatus.ACTIVE;
            user.setAccountStatus(newStatus);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user = userRepository.save(user);
        } else {
            // Use the existing user from the database
            user = existingUser.get();
        }

        // Check if the user already has an account
        if (accountsRepository.existsByUser(user)) {  
            return false; // Prevent duplicate accounts
        }

        // Generate a unique account number
        String accountNumber = generateUniqueAccountNumber();

        Accounts newAccount = new Accounts();
        newAccount.setUser(user); // Now user is managed
        newAccount.setAccountType("SAVINGS");
        newAccount.setAccountNumber(accountNumber);
        newAccount.setCreatedAt(LocalDateTime.now());
        newAccount.setBalance(BigDecimal.ZERO); // Initialize balance
        newAccount.setActive(true); // Activate account
        
        accountsRepository.save(newAccount);
        return true;
    }


    
 // Deposit Money
    @Transactional
    public Accounts deposit(String accountNumber, BigDecimal amount) throws AccountNotFoundException {
        Accounts account = accountsRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new AccountNotFoundException("Account not found!"));

        account.setBalance(account.getBalance().add(amount));
        transactionService.deposit(account, amount);
        return accountsRepository.save(account);
    }


    // Withdraw Money
    @Transactional
    public Accounts withdraw(String accountNumber, BigDecimal amount) throws AccountNotFoundException {
        Accounts account = accountsRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new AccountNotFoundException("Account not found!"));

        if (account.getBalance().compareTo(amount) < 0) {
            throw new InsufficientBalanceException("Insufficient balance!");
        }

        account.setBalance(account.getBalance().subtract(amount));
        transactionService.withdraw(account, amount);
        return accountsRepository.save(account);
    }


    // Helper method to generate a unique account number
    private String generateUniqueAccountNumber() {
        return "SB" + (635240850L + new SecureRandom().nextInt(100000));
    }



    // Update account details
    public Accounts updateAccount(Long id, Accounts updatedAccount) {
        return accountsRepository.findById(id).map(account -> {
            account.setAccountType(updatedAccount.getAccountType());
            account.setBalance(updatedAccount.getBalance());
            account.setActive(updatedAccount.isActive());
            return accountsRepository.save(account);
        }).orElseThrow(() -> new RuntimeException("Account not found"));
    }

    // Delete an account
    public void deleteAccount(Long id) {
        accountsRepository.deleteById(id);
    }

	public List<Accounts> getAccountsByUserId(long userId) {
		return accountsRepository.findByUserUserId(userId);
	}
}
