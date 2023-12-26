package com.digital.invoice.services;

import com.digital.invoice.models.Address;
import com.digital.invoice.models.Customer;
import com.digital.invoice.models.Invoice;
import com.digital.invoice.models.InvoiceItem;
import com.digital.invoice.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final AddressService addressService;

    private final CustomerService customerService;
    private final InvoiceItemService invoiceItemService;

    @Autowired
    public InvoiceService(InvoiceRepository invoiceRepository, AddressService addressService, CustomerService customerService, InvoiceItemService invoiceItemService) {
        this.addressService = addressService;
        this.customerService = customerService;
        this.invoiceRepository = invoiceRepository;
        this.invoiceItemService = invoiceItemService;
    }

    public List<Invoice> getInvoicesByBillingAddress(Address billingAddress) {
        return invoiceRepository.findByBillingAddressId(billingAddress.getId());
    }

    public Invoice getInvoicesByCustomer(Customer customer) {
        return invoiceRepository.findByCustomerId(customer.getId());
    }

    public List<Invoice> getInvoicesByCustomersName(String name){
        List<Invoice> invoices = new ArrayList<>();
        List<Customer> customers = customerService.getCustomersByName(name);
        customers.forEach(customer -> {
            invoices.add(invoiceRepository.findByCustomerId(customer.getId()));
        });
        return invoices;
    }

    public List<Invoice> getInvoicesByInvoiceItemsName(String name){
        return invoiceRepository.findInvoicesByInvoiceItemName(name);
    }

    public Optional<Invoice> getInvoiceById(Long id){
        return invoiceRepository.findById(id);
    }
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }


    public Invoice createInvoice(Invoice invoice) {
        Invoice newInvoice = new Invoice();

        Address billingAddress = invoice.getBillingAddress();
        Customer customer = invoice.getCustomer();

        newInvoice.setCustomer(customer);
        newInvoice.setBillingAddress(billingAddress);

        for (InvoiceItem item : invoice.getItems()) {
            InvoiceItem invoiceItem = new InvoiceItem(item.getName(), item.getQuantity(), item.getPrice());
            newInvoice.addInvoiceItem(invoiceItem);
        }
        return invoiceRepository.save(newInvoice);
    }

    public List<Invoice> addInvoices(List<Invoice> invoices) {
        List<Invoice> newInvoices = new ArrayList<>();


        for (Invoice invoice : invoices) {
            newInvoices.add(createInvoice(invoice));
        }

        return newInvoices;
    }
    public Invoice updateInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }


    public boolean deleteInvoice(Long invoiceId) {
        try {
            Optional<Invoice> invoiceOptional = invoiceRepository.findById(invoiceId);

            if (invoiceOptional.isPresent()) {
                invoiceRepository.deleteById(invoiceId);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }
}

