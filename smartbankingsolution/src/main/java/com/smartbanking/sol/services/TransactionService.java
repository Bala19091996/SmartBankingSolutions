package com.smartbanking.sol.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.smartbanking.sol.model.Accounts;
import com.smartbanking.sol.model.Transactions;
import com.smartbanking.sol.model.TransactionStatus;
import com.smartbanking.sol.repository.TransactionRepository;

import jakarta.transaction.Transactional;

import com.smartbanking.sol.repository.AccountRepository;

@Service
public class TransactionService {

    private final TransactionRepository transactionsRepository;
    private final AccountRepository accountRepository;
    private final CurrencyExchangeService currencyExchangeService;
    
    public String processCrossBorderPayment(String senderAccount, String recipientAccount, BigDecimal amount, String senderCurrency, String recipientCurrency, String note) {
        Accounts sender = accountRepository.findByAccountNumber(senderAccount).get();
        Accounts recipient = accountRepository.findByAccountNumber(recipientAccount).get();

        if (sender == null || recipient == null) {
            return "Invalid sender or recipient account.";
        }

        if (sender.getBalance().compareTo(amount) < 0) {
            return "Insufficient funds.";
        }

        // Fetch real-time exchange rate
        BigDecimal exchangeRate = currencyExchangeService.getExchangeRate(senderCurrency, recipientCurrency);
        BigDecimal convertedAmount = amount.multiply(exchangeRate);

        // Deduct from sender
        sender.withdraw(amount);
        accountRepository.save(sender);

        // Credit recipient
        recipient.deposit(convertedAmount);
        accountRepository.save(recipient);

        // Create transaction record
        Transactions transaction = new Transactions();
        transaction.setAccount(sender);
        transaction.setAmount(amount);
        transaction.setTransactionType("CROSS_BORDER");
        transaction.setStatus(TransactionStatus.PENDING);
        transaction.setCurrency(senderCurrency);
        transaction.setExchangeRate(exchangeRate);
        transactionsRepository.save(transaction);

        return "Cross-border payment successful. Exchange Rate: " + exchangeRate;
    }

    public TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository) {
        this.transactionsRepository = transactionRepository;
        this.accountRepository = accountRepository;
		this.currencyExchangeService = new CurrencyExchangeService();
    }
    
    public List<Transactions> getTransactionsByUserId(Long userId) {
        return transactionsRepository.findByAccount_User_UserId(userId);
    }
    
    public Transactions deposit(Accounts account, BigDecimal amount) {
        Transactions transaction = new Transactions();
        transaction.setAccount(account);
        transaction.setAmount(amount);
        transaction.setTransactionType("DEPOSIT");
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setStatus(TransactionStatus.APPROVED);
        return transactionsRepository.save(transaction);
    }

    public Transactions withdraw(Accounts account, BigDecimal amount) {
        if (account.getBalance().compareTo(amount) < 0) {
            throw new IllegalStateException("Insufficient funds");
        }
        Transactions transaction = new Transactions();
        transaction.setAccount(account);
        transaction.setAmount(amount);
        transaction.setTransactionType("WITHDRAWAL");
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setStatus(TransactionStatus.APPROVED);
        return transactionsRepository.save(transaction);
    }

    @Transactional
    public String transferFunds(String senderAccountNumber, String recipientAccountNumber, BigDecimal amount, String note) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            return "Transfer amount must be greater than zero.";
        }
        Optional<Accounts> senderOpt = accountRepository.findByAccountNumber(senderAccountNumber);
        Optional<Accounts> recipientOpt = accountRepository.findByAccountNumber(recipientAccountNumber);
        if (senderOpt.isEmpty() || recipientOpt.isEmpty()) {
            return "Invalid sender or recipient account.";
        }
        Accounts sender = senderOpt.get();
        Accounts recipient = recipientOpt.get();
        if (!sender.isActive() || !recipient.isActive()) {
            return "One or both accounts are inactive.";
        }
        if (sender.getBalance().compareTo(amount) < 0) {
            return "Insufficient balance in sender's account.";
        }
        // Perform the transfer
        sender.withdraw(amount);
        recipient.deposit(amount);
        // Save updated account balances
        accountRepository.save(sender);
        accountRepository.save(recipient);
        // Log the transaction
        Transactions transaction = new Transactions();
        transaction.setAccount(sender);
        transaction.setAmount(amount);
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setStatus(TransactionStatus.APPROVED);
        transaction.setTransactionType("FUND_TRANSFER");
        transactionsRepository.save(transaction);
        return "Transfer successful.";
    }
    
    
    // Get transactions by account ID
    public List<Transactions> getTransactionsByAccountId(long accountId) {
        return transactionsRepository.findByAccountAccountId(accountId);
    }


	public List<Transactions> getAllTransactions() {
		return transactionsRepository.findAll();
	}
	
	
	
}
