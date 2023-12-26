package com.digital.invoice.controllers;

import com.digital.invoice.models.Address;
import com.digital.invoice.models.Customer;
import com.digital.invoice.models.Invoice;
import com.digital.invoice.models.InvoiceItem;
import com.digital.invoice.services.AddressService;
import com.digital.invoice.services.CustomerService;
import com.digital.invoice.services.InvoiceItemService;
import com.digital.invoice.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;
    private final AddressService addressService;
    private final InvoiceItemService invoiceItemService;

    private final CustomerService customerService;
    @Autowired
    public InvoiceController(InvoiceService invoiceService, AddressService addressService, CustomerService customerService, InvoiceItemService invoiceItemService) {
        this.invoiceService = invoiceService;
        this.addressService = addressService;
        this.customerService = customerService;
        this.invoiceItemService = invoiceItemService;
    }

    @GetMapping("/byBillingAddress/{billingAddressId}")
    public List<Invoice> getInvoicesByBillingAddress(@PathVariable Long billingAddressId) {
        Optional<Address> billingAddress = addressService.getAddressById(billingAddressId);
        return billingAddress.map(invoiceService::getInvoicesByBillingAddress).orElse(null);
    }

    @GetMapping("/byCustomer")
    public Invoice getInvoicesByCustomer(@RequestParam Long customerId) {
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
        return invoiceService.createInvoice(invoice);
    }

    @GetMapping("/{invoice_id}")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long invoice_id){
        Optional<Invoice> invoiceOptional = invoiceService.getInvoiceById(invoice_id);
        return invoiceOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/list")
    public List<Invoice> createInvoices(@RequestBody List<Invoice> invoices) {
        return invoiceService.addInvoices(invoices);
    }

    @PutMapping("/update/{invoice_id}")
    public Invoice updateInvoice(@PathVariable Long invoice_id, @RequestBody Invoice invoice) {
        Optional<Invoice> optionalExistingInvoice = invoiceService.getInvoiceById(invoice_id);
        if (optionalExistingInvoice.isPresent()){
            Invoice existingInvoice = optionalExistingInvoice.get();
            existingInvoice.setCustomer(invoice.getCustomer());
            existingInvoice.setBillingAddress(invoice.getBillingAddress());
            existingInvoice.setItems(new ArrayList<>());


            for (InvoiceItem item : invoice.getItems()){
                existingInvoice.addInvoiceItem(item);
            }
            return invoiceService.updateInvoice(existingInvoice);
        }
        return null;
    }

    // Une méthode pour supprimer une facture
    @DeleteMapping("/delete/{invoiceId}")
    public boolean deleteInvoice(@PathVariable Long invoiceId) {
        return invoiceService.deleteInvoice(invoiceId);
    }
}

