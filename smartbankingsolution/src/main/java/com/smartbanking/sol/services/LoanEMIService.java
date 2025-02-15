package com.smartbanking.sol.services;

import com.smartbanking.sol.model.Accounts;
import com.smartbanking.sol.model.Loans;
import com.smartbanking.sol.model.LoanStatus;
import com.smartbanking.sol.repository.AccountRepository;
import com.smartbanking.sol.repository.LoansRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
public class LoanEMIService {

    private final LoansRepository loansRepository;
    private final AccountRepository accountsRepository;

    public LoanEMIService(LoansRepository loansRepository, AccountRepository accountsRepository) {
        this.loansRepository = loansRepository;
        this.accountsRepository = accountsRepository;
    }

    // Scheduled to run on the 1st of every month at midnight
    @SuppressWarnings("null")
	@Scheduled(cron = "0 0 0 1 * ?")
    public void deductEMIMonthly() {
        List<Loans> activeLoans = loansRepository.findByStatusAndRepaymentStartDateNotNull(LoanStatus.APPROVED);

        for (Loans loan : activeLoans) {
            Accounts account = null;
            BigDecimal emiAmount = calculateEMI(loan.getLoanAmount(), loan.getInterestRate(), loan.getTenureInMonths());

            if (account.getBalance().compareTo(emiAmount) >= 0) {
                account.withdraw(emiAmount);
                accountsRepository.save(account);
                updateLoanBalance(loan, emiAmount);
            }
        }
    }

    private BigDecimal calculateEMI(BigDecimal loanAmount, double interestRate, int tenure) {
        double monthlyRate = (interestRate / 100) / 12;
        double emi = (loanAmount.doubleValue() * monthlyRate * Math.pow(1 + monthlyRate, tenure)) 
                     / (Math.pow(1 + monthlyRate, tenure) - 1);
        return BigDecimal.valueOf(emi);
    }

    private void updateLoanBalance(Loans loan, BigDecimal emiAmount) {
        BigDecimal remainingBalance = loan.getLoanAmount().subtract(emiAmount);
        if (remainingBalance.compareTo(BigDecimal.ZERO) <= 0) {
            loan.setStatus(LoanStatus.CLOSED);
        }
        loan.setLoanAmount(remainingBalance);
        loansRepository.save(loan);
    }
}
