package com.digital.invoice.services;

import com.digital.invoice.models.Address;
import com.digital.invoice.models.Customer;
import com.digital.invoice.models.Invoice;
import com.digital.invoice.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    @Autowired
    public InvoiceService(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    public List<Invoice> getInvoicesByBillingAddress(Address billingAddress) {
        return invoiceRepository.findByBillingAddressId(billingAddress.getId());
    }

    public List<Invoice> getInvoicesByCustomer(Customer customer) {
        return invoiceRepository.findByCustomerId(customer.getId());
    }

    public Invoice getInvoiceById(Long id){
        return invoiceRepository.findInvoiceById(id);
    }
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }
    public Invoice updateInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }


    public void deleteInvoice(Long invoiceId) {
        invoiceRepository.deleteById(invoiceId);

    }
}

