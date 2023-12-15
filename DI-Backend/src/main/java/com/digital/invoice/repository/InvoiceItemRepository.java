package com.digital.invoice.repository;

import com.digital.invoice.models.InvoiceItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceItemRepository extends JpaRepository<InvoiceItem, Long> {
    // Additional query methods if needed
}
