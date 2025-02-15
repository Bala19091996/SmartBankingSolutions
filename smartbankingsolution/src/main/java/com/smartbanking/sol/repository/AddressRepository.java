package com.smartbanking.sol.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartbanking.sol.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
	Optional<Address> findByStreetAndCityAndStateAndZipcode(
	        String street, String city, String state, String zipcode
	    );
}
