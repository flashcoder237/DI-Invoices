package com.digital.invoice.repository;

import com.digital.invoice.models.Address;
import com.digital.invoice.models.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByBillingAddressId(Long billingAddressId);
    List<Invoice> findByCustomerId(Long id);

    Invoice findInvoiceById(Long id);
}
