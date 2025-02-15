package com.smartbanking.sol.controller;

import com.smartbanking.sol.model.LoanStatus;
import com.smartbanking.sol.model.Loans;
import com.smartbanking.sol.model.User;
import com.smartbanking.sol.repository.LoansRepository;
import com.smartbanking.sol.repository.UserRepository;
import com.smartbanking.sol.services.LoansService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoansService loanService;
    
    @Autowired
    private LoansRepository loansRepository;

    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/apply")
    public ResponseEntity<?> applyForLoan(@RequestBody LoanRequest loanRequest) {
        User user = userRepository.findById(loanRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Loans loan = new Loans();
        loan.setUser(user);
        loan.setLoanAmount(loanRequest.getLoanAmount());
        loan.setInterestRate(loanRequest.getInterestRate());
        loan.setTenureInMonths(loanRequest.getTenureInMonths());
        loan.setLoanType(loanRequest.getLoanType());
        loan.setStatus(LoanStatus.PENDING);

        loansRepository.save(loan);
        return ResponseEntity.ok("Loan application submitted successfully");
    }


    // Get all loans
    @GetMapping("/all")
    public ResponseEntity<List<Loans>> getAllLoans() {
        return ResponseEntity.ok(loanService.getAllLoans());
    }

    // Get loan by ID
    @GetMapping("/{loanId}")
    public ResponseEntity<Loans> getLoanById(@PathVariable Long loanId) {
        Optional<Loans> loan = loanService.getLoanById(loanId);
        return loan.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Approve Loan
    @PutMapping("/approve/{loanId}")
    public ResponseEntity<Loans> approveLoan(@PathVariable Long loanId) {
        return ResponseEntity.ok(loanService.approveLoan(loanId));
    }

    // Reject Loan
    @PutMapping("/reject/{loanId}")
    public ResponseEntity<Loans> rejectLoan(@PathVariable Long loanId) {
        return ResponseEntity.ok(loanService.rejectLoan(loanId));
    }

    // Mark Loan as Paid
    @PutMapping("/paid/{loanId}")
    public ResponseEntity<Loans> markLoanAsPaid(@PathVariable Long loanId) {
        return ResponseEntity.ok(loanService.markLoanAsPaid(loanId));
    }
    
    
    // Check Loan Eligibility
    @GetMapping("/checkEligibility")
    public Map<String, Object> checkLoanEligibility(@RequestParam long userId, @RequestParam BigDecimal loanAmount) {
        boolean isEligible = loanService.checkLoanEligibility(userId, loanAmount);

        Map<String, Object> response = new HashMap<>();
        response.put("userId", userId);
        response.put("loanAmount", loanAmount);
        response.put("isEligible", isEligible);

        return response;
    }

    // Calculate EMI
    @GetMapping("/calculateEMI")
    public Map<String, Object> calculateEMI(@RequestParam BigDecimal loanAmount, @RequestParam double interestRate, @RequestParam int tenure) {
        BigDecimal emi = loanService.calculateEMI(loanAmount, interestRate, tenure);

        Map<String, Object> response = new HashMap<>();
        response.put("loanAmount", loanAmount);
        response.put("interestRate", interestRate);
        response.put("tenure", tenure);
        response.put("monthlyEMI", emi);

        return response;
    }
    
}










class LoanRequest {
    private long userId;
    private BigDecimal loanAmount;
    private double interestRate;
    private int tenureInMonths;
    private String loanType;
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
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
    
    // Getters and setters
    
}
