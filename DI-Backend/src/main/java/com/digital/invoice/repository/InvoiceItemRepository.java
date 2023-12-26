package com.digital.invoice.repository;

import com.digital.invoice.models.Customer;
import com.digital.invoice.models.Invoice;
import com.digital.invoice.models.InvoiceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InvoiceItemRepository extends JpaRepository<InvoiceItem, Long> {
    List<InvoiceItem> getInvoiceItemsByName(String name);
    InvoiceItem findInvoiceItemById(Long id);
}
