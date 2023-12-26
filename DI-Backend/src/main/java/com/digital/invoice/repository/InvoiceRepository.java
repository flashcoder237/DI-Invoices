package com.digital.invoice.repository;

import com.digital.invoice.models.Address;
import com.digital.invoice.models.Invoice;
import com.digital.invoice.models.InvoiceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByBillingAddressId(Long billingAddressId);
    Invoice findByCustomerId(Long id);
    Invoice findInvoiceByItemsContaining(InvoiceItem invoiceItem);
    @Query(value = "SELECT i.* FROM invoice i JOIN invoice_item ii ON i.id = ii.invoice_id WHERE ii.name = :itemName", nativeQuery = true)
    List<Invoice> findInvoicesByInvoiceItemName(@Param("itemName") String itemName);

}
