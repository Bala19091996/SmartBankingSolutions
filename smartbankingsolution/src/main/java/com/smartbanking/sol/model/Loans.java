package com.smartbanking.sol.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "loan")
public class Loans {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long loanId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private BigDecimal loanAmount;

    @Column(nullable = false)
    private double interestRate;

    @Column(nullable = false)
    private int tenureInMonths;

    @Column(nullable = false)
    private String loanType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoanStatus status;

    @Column(nullable = false)
    private LocalDate applicationDate;

    private LocalDate approvalDate;
    private LocalDate repaymentStartDate;

    public Loans() {
        this.applicationDate = LocalDate.now();
    }

    public long getLoanId() {
        return loanId;
    }

    public void setLoanId(long loanId) {
        this.loanId = loanId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BigDecimal getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(BigDecimal loanAmount) {
        this.loanAmount = loanAmount;
    }

    public double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }

    public int getTenureInMonths() {
        return tenureInMonths;
    }

    public void setTenureInMonths(int tenureInMonths) {
        this.tenureInMonths = tenureInMonths;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public LoanStatus getStatus() {
        return status;
    }

    public void setStatus(LoanStatus status) {
        this.status = status;
    }

    public LocalDate getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(LocalDate applicationDate) {
        this.applicationDate = applicationDate;
    }

    public LocalDate getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(LocalDate approvalDate) {
        this.approvalDate = approvalDate;
    }

    public LocalDate getRepaymentStartDate() {
        return repaymentStartDate;
    }

    public void setRepaymentStartDate(LocalDate repaymentStartDate) {
        this.repaymentStartDate = repaymentStartDate;
    }

    public void approveLoan() {
        this.status = LoanStatus.APPROVED;
        this.approvalDate = LocalDate.now();
    }

    public void rejectLoan() {
        this.status = LoanStatus.REJECTED;
    }
    
 // Loans class

    public void setApproved(boolean isApproved) {
        this.status = isApproved ? LoanStatus.APPROVED : LoanStatus.REJECTED;
    }

}
