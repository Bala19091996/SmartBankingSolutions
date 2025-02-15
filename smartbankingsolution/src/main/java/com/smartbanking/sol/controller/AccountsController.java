package com.smartbanking.sol.controller;

import com.smartbanking.sol.model.Accounts;
import com.smartbanking.sol.model.User;
import com.smartbanking.sol.services.AccountsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

import javax.security.auth.login.AccountNotFoundException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/accounts")
public class AccountsController {

    @Autowired
    private AccountsService accountsService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Accounts>> getAccountsByUserId(@PathVariable long userId) {
        List<Accounts> accounts = accountsService.getAccountsByUserId(userId);
        return ResponseEntity.ok(accounts);
    }
    // Get all accounts
    @GetMapping("/getallaccounts")
    public List<Accounts> getAllAccounts() {
        return accountsService.getAllAccounts();
    }

    // Get account by ID
    @GetMapping("/{id}")
    public ResponseEntity<Accounts> getAccountById(@PathVariable Long id) {
        return accountsService.getAccountById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get account by account number
    @GetMapping("/accountNumber/{accountNumber}")
    public ResponseEntity<Accounts> getAccountByAccountNumber(@PathVariable String accountNumber) {
        return accountsService.getAccountByAccountNumber(accountNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/users/{userId}/create-account")
    public ResponseEntity<String> createAccount(@PathVariable long userId) {
        boolean success = accountsService.createAccountForUser(userId);
        return success ? ResponseEntity.ok("Account created successfully!") :
                         ResponseEntity.status(400).body("User not approved or account already exists.");
    }

    @PostMapping("/add")
    public ResponseEntity<String> createAccount(@RequestBody User user) {
        accountsService.createNewAccountForUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("Account created successfully");
    }

    
    // Update an account
    @PutMapping("/{id}")
    public ResponseEntity<Accounts> updateAccount(@PathVariable Long id, @RequestBody Accounts updatedAccount) {
        return ResponseEntity.ok(accountsService.updateAccount(id, updatedAccount));
    }

    // Delete an account
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        accountsService.deleteAccount(id);
        return ResponseEntity.noContent().build();
    }

    // Deposit money
    @PostMapping("/{id}/deposit")
    public ResponseEntity<Accounts> deposit(@PathVariable String id, @RequestParam BigDecimal amount) throws AccountNotFoundException {
        return ResponseEntity.ok(accountsService.deposit(id, amount));
    }

    // Withdraw money
    @PostMapping("/{id}/withdraw")
    public ResponseEntity<Accounts> withdraw(@PathVariable String id, @RequestParam BigDecimal amount) throws AccountNotFoundException {
        return ResponseEntity.ok(accountsService.withdraw(id, amount));
    }
}
