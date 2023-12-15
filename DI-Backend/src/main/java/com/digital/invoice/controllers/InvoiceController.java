package com.digital.invoice.controllers;

import com.digital.invoice.models.Address;
import com.digital.invoice.models.Customer;
import com.digital.invoice.models.Invoice;
import com.digital.invoice.models.InvoiceItem;
import com.digital.invoice.services.AddressService;
import com.digital.invoice.services.CustomerService;
import com.digital.invoice.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;
    private final AddressService addressService;

    private final CustomerService customerService;
    @Autowired
    public InvoiceController(InvoiceService invoiceService, AddressService addressService, CustomerService customerService) {
        this.invoiceService = invoiceService;
        this.addressService = addressService;
        this.customerService = customerService;
    }

    @GetMapping("/byBillingAddress/{billingAddressId}")
    public List<Invoice> getInvoicesByBillingAddress(@PathVariable Long billingAddressId) {
        Optional<Address> billingAddress = addressService.getAddressById(billingAddressId);
        return billingAddress.map(invoiceService::getInvoicesByBillingAddress).orElse(null);
    }

    @GetMapping("/byCustomer")
    public List<Invoice> getInvoicesByCustomer(@RequestParam Long customerId) {
        Customer customer = customerService.getCustomerById(customerId);
        return invoiceService.getInvoicesByCustomer(customer);
    }

    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    // Une méthode pour créer une facture
    @PostMapping
    public Invoice createInvoice(@RequestBody Invoice invoice) {
        Invoice newInvoice = new Invoice();

        Address billingAddress = invoice.getBillingAddress();
        Customer customer = invoice.getCustomer();
        addressService.createAddress(billingAddress);
        customerService.createCustomer(customer);

        newInvoice.setCustomer(customer);
        newInvoice.setBillingAddress(billingAddress);

        for (InvoiceItem item : invoice.getItems()) {
            InvoiceItem invoiceItem = new InvoiceItem(item.getName(), item.getQuantity(), item.getPrice());
            newInvoice.addInvoiceItem(invoiceItem);
        }
        return invoiceService.createInvoice(newInvoice);
    }


    @PutMapping("/update/{invoice_id}")
    public Invoice updateInvoice(@PathVariable Long invoice_id, @RequestBody Invoice invoice) {
        Invoice existingInvoice = invoiceService.getInvoiceById(invoice_id);
        existingInvoice.setCustomer(invoice.getCustomer());
        existingInvoice.setBillingAddress(invoice.getBillingAddress());
        existingInvoice.setItems(new ArrayList<>());

        for (InvoiceItem item : invoice.getItems()){
            existingInvoice.addInvoiceItem(item);
        }
        return invoiceService.updateInvoice(existingInvoice);
    }

    // Une méthode pour supprimer une facture
    @DeleteMapping("/delete/{invoiceId}")
    public void deleteInvoice(@PathVariable Long invoiceId) {
        invoiceService.deleteInvoice(invoiceId);
    }
}

