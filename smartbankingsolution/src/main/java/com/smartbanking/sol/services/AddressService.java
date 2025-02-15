package com.smartbanking.sol.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartbanking.sol.model.Address;
import com.smartbanking.sol.repository.AddressRepository;

@Service
public class AddressService {
    
    @Autowired
    private AddressRepository addressRepository;

    @Transactional
    public Address saveAddress(Address address) {
        return addressRepository.save(address);
    }
}
