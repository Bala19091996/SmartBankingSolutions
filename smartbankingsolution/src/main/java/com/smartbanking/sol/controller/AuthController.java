package com.smartbanking.sol.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.smartbanking.sol.model.User;
import com.smartbanking.sol.security.JwtUtil;
import com.smartbanking.sol.services.UserServices;

import java.util.Optional;

public class AuthController {
    private final UserServices userService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserServices userService, JwtUtil jwtUtil, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/jwt/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.addUser(user);
        return ResponseEntity.ok("User Registered Successfully");
    }

    @PostMapping("/jwt/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User user) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserEmail(), user.getPassword()));
        Optional<User> foundUser = userService.getUserByEmail(user.getUserEmail());

        if (foundUser.isPresent()) {
            String token = jwtUtil.generateToken(foundUser.get().getUserEmail());
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(401).body("Invalid Credentials");
    }
}
