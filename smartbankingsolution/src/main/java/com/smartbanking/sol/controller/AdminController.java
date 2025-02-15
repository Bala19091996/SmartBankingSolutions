	package com.smartbanking.sol.controller;
	
import com.smartbanking.sol.model.Admin;
import com.smartbanking.sol.model.AdminStatsResponse;
import com.smartbanking.sol.model.User;
import com.smartbanking.sol.services.AdminServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
	
	@RestController
	@CrossOrigin(origins = "*")
	@RequestMapping("/api/admin")
	public class AdminController {
	
	    @Autowired
	    private AdminServices adminService;
	
	 // Add New Admin
	    @PostMapping("/add")
	    public ResponseEntity<String> addAdmin(@RequestBody Admin admin) {
	        adminService.addAdmin(admin);
	        return ResponseEntity.ok("Admin added successfully!");
	    }

	    // API to get admin dashboard statistics
	    @GetMapping("/stats")
	    public ResponseEntity<AdminStatsResponse> getAdminStats() {
	        return ResponseEntity.ok(adminService.getAdminStatistics());
	    }
	    
	    @PutMapping("/update/{adminId}")
	    public ResponseEntity<Admin> updateAdmin(@PathVariable Long adminId, @RequestBody Admin admin) {
	        Admin updatedAdmin = adminService.updateAdmin(adminId, admin);
	        return ResponseEntity.ok(updatedAdmin);
	    }
	    
	    // Admin Login API
	    @PostMapping("/login")
	    public ResponseEntity<?> adminLogin(@RequestBody Admin request) {
	        boolean isAuthenticated = adminService.authenticateAdmin(request.getAdminEmail(), request.getPassword());
	        if (isAuthenticated) {
	            Map<String, String> response = new HashMap<>();
	            response.put("token", "token");
	            return ResponseEntity.ok(response);
	        } else {
	            return ResponseEntity.status(401).body("Invalid email or password");
	        }
	    }
	    
	    @GetMapping("/employees")
	    public ResponseEntity<List<Admin>> getAllEmpUsers() {
	        return ResponseEntity.ok(adminService.getAllEmpUsers());
	    }
	
	    // 2. Get User by ID
	    @GetMapping("/admin/{empId}")
	    public ResponseEntity<Admin> getEmpUserById(@PathVariable long empId) {
	        return ResponseEntity.ok(adminService.getEmpUserById(empId).get());
	    }
	
	    // 3. Delete User
	    @DeleteMapping("/employee/{empId}")
	    public ResponseEntity<String> deleteEmpUser(@PathVariable long empId) {
	        adminService.deleteUser(empId);
	        return ResponseEntity.ok("Employee deleted successfully");
	    }
	    
	    // 1. Get All Users
	    @GetMapping("/users")
	    public ResponseEntity<List<User>> getAllUsers() {
	        return ResponseEntity.ok(adminService.getAllUsers());
	    }
	
	    // 2. Get User by ID
	    @GetMapping("/users/{userId}")
	    public ResponseEntity<User> getUserById(@PathVariable long userId) {
	        return ResponseEntity.ok(adminService.getUserById(userId).get());
	    }
	
	    // 3. Delete User
	    @DeleteMapping("/users/{userId}")
	    public ResponseEntity<String> deleteUser(@PathVariable long userId) {
	        adminService.deleteUser(userId);
	        return ResponseEntity.ok("User deleted successfully");
	    }
	
	    // 4. Approve or Reject User Registration
	    @PutMapping("/users/approve/{userId}")
	    public ResponseEntity<String> updateUserStatus(@PathVariable long userId, @RequestParam boolean approved) {
	        adminService.updateUserStatus(userId, approved);
	        return ResponseEntity.ok(approved ? "User approved mail sent" : "User rejected");
	    }
	
	    // 5. Reset User Password
	    @PutMapping("/users/{userId}/reset-password")
	    public ResponseEntity<String> resetUserPassword(@PathVariable long userId, @RequestParam String newPassword) {
	        adminService.resetUserPassword(userId, newPassword);
	        return ResponseEntity.ok("Password reset successfully");
	    }
	
	    // 6. Get All Transactions
	    @GetMapping("/transactions")
	    public ResponseEntity<List<?>> getAllTransactions() {
	        return ResponseEntity.ok(adminService.getAllTransactions());
	    }

	    // 8. Get All Loan Applications
	    @GetMapping("/loans")
	    public ResponseEntity<List<?>> getAllLoanApplications() {
	        return ResponseEntity.ok(adminService.getAllLoans());
	    }
	
	    // 9. Approve or Reject Loan Applications
	    @PostMapping("/loans/{loanId}/status")
	    public ResponseEntity<String> updateLoanStatus(@PathVariable long loanId, @RequestParam boolean approved) {
	        adminService.updateLoanStatus(loanId, approved);
	        return ResponseEntity.ok(approved ? "Loan approved" : "Loan rejected");
	    }
	}
