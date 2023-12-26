package com.digital.invoice.controllers;

import com.digital.invoice.models.Customer;
import com.digital.invoice.models.Invoice;
import com.digital.invoice.services.CustomerService;
import com.digital.invoice.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;
    private final InvoiceService invoiceService;

    @Autowired
    public CustomerController(CustomerService customerService, InvoiceService invoiceService){
        this.customerService = customerService;
        this.invoiceService = invoiceService;
    }

    @GetMapping("/{name}")
    public List<Customer> getCustomersByName(@PathVariable String name){
        return customerService.getCustomersByName(name);
    }

    @GetMapping
    public List<Customer> getAllCustomers(){
        return customerService.getAllCustomers();
    }

    @GetMapping("/{name}/invoices")
    public List<Invoice> getCustomerInvoicesByName(@PathVariable String name){
        return invoiceService.getInvoicesByCustomersName(name);
    }

    @DeleteMapping("/customers/delete/{customer_id}")
    public boolean deletECustomer(@PathVariable Long customer_id){
        return customerService.deleteCustomer(customer_id);
    }
}
