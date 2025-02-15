package com.smartbanking.sol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.smartbanking.sol.model.User;
import com.smartbanking.sol.services.UserServices;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserServices userService;
    
   
    // start point to test if the service is running
    @GetMapping("/home")
    public String home() {
        return "Hello! Welcome to Smart Banking Solution.";
    }

    // Add a new user
    @PostMapping("/addUser")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        try {
            // Check if a user with the same email already exists
            Optional<User> existingUser = userService.getUserByEmail(user.getUserEmail());
            if (existingUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("A user with this email already exists.");
            }
            
            // Add user to the database
            userService.addUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User successfully registered.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while adding the user: " + e.getMessage());
        }
    }

    //login the user with login credentials
    @PostMapping("/signin")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        try {
            // Find user by email
            Optional<User> foundUser = userService.getUserByEmail(user.getUserEmail());

            if (foundUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }


            // Verify password using isPasswordValid method from userService
            boolean isValidPassword = userService.isPasswordValid(user.getPassword(), foundUser.get().getPassword());
            if (isValidPassword) {
                return ResponseEntity.ok(foundUser.get());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(null);
            }
        } catch (Exception e) {
            // Log the exception and return an error message if error occurs
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
    

    //updating user attributes usin postmapping and jason object from frontend side
    @PutMapping("/updateUser")
    public ResponseEntity<String> updateUser(@RequestBody User user) {
        try {
            Optional<User> existingUser = userService.getUserByEmail(user.getUserEmail());
            if (existingUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found with email: " + user.getUserEmail());
            }
            user.setUserId(existingUser.get().getUserId());
            userService.addUser(user); // Save updated user
            return ResponseEntity.ok("User successfully updated.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while updating the user: " + e.getMessage());
        }
    }
    
    //reseting password using postmapping
    @PostMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");
        if (userService.resetPassword(email, newPassword)) {
            return ResponseEntity.ok("Password reset successful.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found with the provided email.");
        }
    }

    

}
