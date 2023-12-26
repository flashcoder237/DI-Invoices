package com.digital.invoice.services;

import com.digital.invoice.models.Invoice;
import com.digital.invoice.models.InvoiceItem;
import com.digital.invoice.repository.InvoiceItemRepository;
import com.digital.invoice.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InvoiceItemService {
    private final InvoiceItemRepository invoiceItemRepository;
    // private final InvoiceRepository invoiceRepository;

    @Autowired
    public InvoiceItemService(InvoiceItemRepository invoiceItemRepository) {
        this.invoiceItemRepository = invoiceItemRepository;
       // this.invoiceRepository = invoiceRepository;
    }

    public List<InvoiceItem> getAllInvoiceItems() {
        return invoiceItemRepository.findAll();
    }

    public InvoiceItem createInvoiceItem(InvoiceItem address) {
        // Custom logic if needed
        return invoiceItemRepository.save(address);
    }

    public Optional<InvoiceItem> getInvoiceItemById(Long id) {
        return invoiceItemRepository.findById(id);
    }

    public InvoiceItem updateInvoiceItem(Long id, InvoiceItem updatedInvoiceItem) {
        Optional<InvoiceItem> existingInvoiceItemOptional = invoiceItemRepository.findById(id);

        if (existingInvoiceItemOptional.isPresent()) {
            InvoiceItem existingInvoiceItem = existingInvoiceItemOptional.get();

            // Update fields
            existingInvoiceItem.setName(updatedInvoiceItem.getName());
            existingInvoiceItem.setQuantity(updatedInvoiceItem.getQuantity());
            existingInvoiceItem.setPrice(updatedInvoiceItem.getPrice());
            return invoiceItemRepository.save(existingInvoiceItem);
        } else {
            // Handle not found
            return null;
        }
    }

    public boolean deleteInvoiceItem(Long id) {
        try {
            Optional<InvoiceItem> invoiceItemOptional = invoiceItemRepository.findById(id);

            if (invoiceItemOptional.isPresent()) {
                invoiceItemRepository.deleteById(id);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    public List<InvoiceItem> getInvoiceItemsByName(String name) {
        return  invoiceItemRepository.getInvoiceItemsByName(name);
    }
}
