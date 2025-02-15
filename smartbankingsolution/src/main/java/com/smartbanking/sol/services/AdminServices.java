package com.smartbanking.sol.services;

import com.smartbanking.sol.model.User;
import com.smartbanking.sol.model.User.AccountStatus;
import com.smartbanking.sol.model.Transactions;
import com.smartbanking.sol.model.Admin;
import com.smartbanking.sol.model.AdminStatsResponse;
import com.smartbanking.sol.model.Loans;
import com.smartbanking.sol.repository.UserRepository;
import com.smartbanking.sol.repository.TransactionRepository;
import com.smartbanking.sol.repository.AdminRepository;
import com.smartbanking.sol.repository.LoansRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminServices {

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TransactionRepository transactionRepository;
    
    @Autowired
    private LoansRepository loanRepository;
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void addAdmin(Admin admin) {
        // Encrypt password before saving
        String hashedPassword = passwordEncoder.encode(admin.getPassword());
        admin.setPassword(hashedPassword);
        adminRepository.save(admin);
    }


    public boolean authenticateAdmin(String email, String password) {
        Optional<Admin> admin = adminRepository.findByAdminEmail(email);
        
        if (admin.isPresent()) {
            return passwordEncoder.matches(password, admin.get().getPassword());
        }
        
        return false;
    }

    public List<Admin> getAllEmpUsers() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getEmpUserById(long id) {
        return adminRepository.findById(id);
    }

    public void deleteEmpUser(long id) {
        adminRepository.deleteById(id);
    }
    
    // User Management
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(long id) {
        return userRepository.findById(id);
    }

    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }
    
    public User approveUser(long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            user.get().setApproved(true);
            return userRepository.save(user.get());
        }
        return null;
    }
    
    public void resetUserPassword(long id, String newPassword) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            user.get().setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user.get());
        }
    }

    // Transaction Handling
    public List<Transactions> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Transactions approveTransaction(long transactionId) {
        Optional<Transactions> transaction = transactionRepository.findById(transactionId);
        if (transaction.isPresent()) {
            transaction.get().setApproved(true);
            return transactionRepository.save(transaction.get());
        }
        return null;
    }
    
    // Loan Processing
    public List<Loans> getAllLoans() {
        return loanRepository.findAll();
    }

    public Loans approveLoan(long loanId) {
        Optional<Loans> loan = loanRepository.findById(loanId);
        if (loan.isPresent()) {
            loan.get().setApproved(true);
            return loanRepository.save(loan.get());
        }
        return null;
    }
    
    public void updateLoanStatus(long loanId, boolean approved) {
        Optional<Loans> loan = loanRepository.findById(loanId);
        if (loan.isPresent()) {
            Loans currentLoan = loan.get();
            currentLoan.setApproved(approved); // This method will update the status of the loan
            loanRepository.save(currentLoan); // Save the updated loan to the database
        } else {
            throw new IllegalArgumentException("Loan not found with ID: " + loanId);
        }
    }

    public void updateUserStatus(long userId, boolean approved) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            User currentUser = user.get();
            currentUser.setApproved(approved); // Update the approval status of the user
            //emailService.sendAccountApprovalEmail(user.get().getUserEmail(), true);
            AccountStatus newStatus = approved ? AccountStatus.ACTIVE : AccountStatus.REJECTED;
            int updatedRows = userRepository.updateAccountStatusByUserId(userId, newStatus);
            userRepository.save(currentUser); // Save the updated user to the database
            if (updatedRows == 0) {
                throw new RuntimeException("User not found or status not updated");
            }
        } else {
            throw new IllegalArgumentException("User not found with ID: " + userId);
        }
    }
    
    public AdminStatsResponse getAdminStatistics() {
        long totalUsers = userRepository.count();
        long activeAccounts = userRepository.countByIsApproved(true);
        long pendingRequests = userRepository.countByIsApproved(false);
        long totalTransactions = transactionRepository.count();

        return new AdminStatsResponse(totalUsers, activeAccounts, pendingRequests, totalTransactions);
    }
    public Admin updateAdmin(Long adminId, Admin updatedAdmin) {
        Optional<Admin> existingAdminOptional = adminRepository.findById(adminId);

        if (existingAdminOptional.isPresent()) {
            Admin existingAdmin = existingAdminOptional.get();
            
            // Update fields
            existingAdmin.setAdminName(updatedAdmin.getAdminName());
            existingAdmin.setPosition(updatedAdmin.getPosition());
            existingAdmin.setSalary(updatedAdmin.getSalary());
            existingAdmin.setAdminEmail(updatedAdmin.getAdminEmail());
            existingAdmin.setPhoneNo(updatedAdmin.getPhoneNo());

            // Updating address if present
            if (updatedAdmin.getAddress() != null) {
                existingAdmin.setAddress(updatedAdmin.getAddress());
            }

            return adminRepository.save(existingAdmin); // Save and return updated admin
        } else {
            throw new RuntimeException("Admin not found with ID: " + adminId);
        }
    }

}