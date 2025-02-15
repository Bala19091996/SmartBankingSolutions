package com.smartbanking.sol.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Transactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long transactionId;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Accounts account;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private LocalDateTime transactionDate;
    
    private String currency;
    private BigDecimal exchangeRate;

    public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public BigDecimal getExchangeRate() {
		return exchangeRate;
	}

	public void setExchangeRate(BigDecimal exchangeRate) {
		this.exchangeRate = exchangeRate;
	}

	@Enumerated(EnumType.STRING)
    private TransactionStatus status;

    @Column(nullable = false)
    private String transactionType;

    public Transactions() {
        this.transactionDate = LocalDateTime.now();
        this.status = TransactionStatus.PENDING; // Default status to PENDING
    }

    public long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(long transactionId) {
        this.transactionId = transactionId;
    }

    public Accounts getAccount() {
        return account;
    }

    public void setAccount(Accounts account) {
        this.account = account;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }

    public TransactionStatus getStatus() {
        return status;
    }

    public void setStatus(TransactionStatus status) {
        this.status = status;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    // Set transaction status based on approval
    public void setApproved(boolean isApproved) {
        this.status = isApproved ? TransactionStatus.APPROVED : TransactionStatus.REJECTED;
    }
    
    // Optional: a method to get a simple description of the transaction's status
    public String getTransactionStatusDescription() {
        return "Transaction " + this.transactionId + " is " + this.status;
    }
}
