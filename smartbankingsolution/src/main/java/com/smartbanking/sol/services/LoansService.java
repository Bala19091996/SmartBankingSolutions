package com.smartbanking.sol.services;

import com.smartbanking.sol.model.Accounts;
import com.smartbanking.sol.model.LoanStatus;
import com.smartbanking.sol.model.Loans;
import com.smartbanking.sol.model.User;
import com.smartbanking.sol.repository.LoansRepository;
import com.smartbanking.sol.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class LoansService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AccountsService accountService;
	
    private final LoansRepository loansRepository;

    public LoansService(LoansRepository loansRepository) {
        this.loansRepository = loansRepository;
    }

    public Loans applyForLoan(User user, BigDecimal amount, double interestRate, 
    		int tenure, String type) {
        Loans loan = new Loans();
        loan.setUser(user);
        loan.setLoanAmount(amount);
        loan.setInterestRate(interestRate);
        loan.setTenureInMonths(tenure);
        loan.setLoanType(type);
        LoanStatus status = LoanStatus.PENDING;
        loan.setStatus(status);

        return loansRepository.save(loan);
    }
    
    // Get loan by ID
    public Optional<Loans> getLoanById(Long loanId) {
        return loansRepository.findById(loanId);
    }

    // Approve Loan
    public Loans approveLoan(Long loanId) {
        Optional<Loans> optionalLoan = loansRepository.findById(loanId);
        if (optionalLoan.isPresent()) {
            Loans loan = optionalLoan.get();
            if (loan.getStatus() == LoanStatus.PENDING) {
                loan.approveLoan();
                loan.setRepaymentStartDate(LocalDate.now().plusMonths(1)); // Repayment starts next month
                return loansRepository.save(loan);
            }
        }
        throw new RuntimeException("Loan not found or already processed");
    }

    // Reject Loan
    public Loans rejectLoan(Long loanId) {
        Optional<Loans> optionalLoan = loansRepository.findById(loanId);
        if (optionalLoan.isPresent()) {
            Loans loan = optionalLoan.get();
            if (loan.getStatus() == LoanStatus.PENDING) {
                loan.rejectLoan();
                return loansRepository.save(loan);
            }
        }
        throw new RuntimeException("Loan not found or already processed");
    }

    // Mark Loan as Paid
    public Loans markLoanAsPaid(Long loanId) {
        Optional<Loans> optionalLoan = loansRepository.findById(loanId);
        if (optionalLoan.isPresent()) {
            Loans loan = optionalLoan.get();
            if (loan.getStatus() == LoanStatus.APPROVED) {
                loan.setStatus(LoanStatus.CLOSED);
                return loansRepository.save(loan);
            }
        }
        throw new RuntimeException("Loan not found or not in APPROVED status");
    }

	public List<Loans> getAllLoans() {
		return loansRepository.findAll();
	}
	
	 // Check Loan Eligibility
    public boolean checkLoanEligibility(long userId, BigDecimal loanAmount) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return false;

        Accounts account = accountService.getAccountsByUserId(userId).get(0);
        // Criteria: User should be approved and balance should be at least 20% of requested loan
        BigDecimal minimumBalanceRequired = loanAmount.multiply(new BigDecimal("0.2"));

        return user.isApproved() && account.getBalance().compareTo(minimumBalanceRequired) >= 0;
    }

    // Calculate EMI using formula: EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]
    public BigDecimal calculateEMI(BigDecimal principal, double rate, int tenure) {
        double monthlyRate = rate / (12 * 100);
        double numerator = principal.doubleValue() * monthlyRate * Math.pow(1 + monthlyRate, tenure);
        double denominator = Math.pow(1 + monthlyRate, tenure) - 1;

        return BigDecimal.valueOf(numerator / denominator);
    }
}
