package com.smartbanking.sol.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.smartbanking.sol.model.Address;
import com.smartbanking.sol.model.User;
import com.smartbanking.sol.repository.AddressRepository;
import com.smartbanking.sol.repository.UserRepository;

import jakarta.transaction.Transactional;

import java.util.Optional;

@Service
public class UserServices {

    private final UserRepository userRepository;
    @Autowired
    private AddressRepository addressRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServices(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }
    
    public boolean resetPassword(String email, String newPassword) {
        Optional<User> userOpt = userRepository.findByUserEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }
        return false; // User not found
    }

    // Find a user by email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByUserEmail(email);
    }

    @Transactional
    public void addUser(User user) {
        Optional<User> existingUser = userRepository.findByUserEmail(user.getUserEmail());
        if (existingUser.isPresent()) {
            throw new IllegalStateException("User with this email already exists.");
        }

        Optional<Address> existingAddress = addressRepository.findByStreetAndCityAndStateAndZipcode(
            user.getAddress().getStreet(),
            user.getAddress().getCity(),
            user.getAddress().getState(),
            user.getAddress().getZipcode()
        );
        if (existingAddress.isPresent()) {
            user.setAddress(existingAddress.get());  // Reuse existing address
        } else {
            addressRepository.save(user.getAddress());  // Save new address
        }
        // ✅ Properly encode the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }


    // Validate password
    public boolean isPasswordValid(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

}
