package com.digital.invoice.repository;

import com.digital.invoice.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
    // Additional query methods if needed
}
