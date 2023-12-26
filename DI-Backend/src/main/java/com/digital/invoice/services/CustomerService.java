package com.digital.invoice.services;

import com.digital.invoice.models.Customer;
import com.digital.invoice.models.Invoice;
import com.digital.invoice.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + customerId));
    }

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public List<Customer> getCustomersByName(String name){
        return customerRepository.getCustomersByName(name);
    }


    public Customer updateCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public boolean deleteCustomer(Long customerId) {
        try {
            Optional<Customer> customerOptional = customerRepository.findById(customerId);

            if (customerOptional.isPresent()) {
                customerRepository.deleteById(customerId);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }
    }
