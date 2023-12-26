package com.digital.invoice.controllers;

import com.digital.invoice.models.Invoice;
import com.digital.invoice.models.InvoiceItem;

import com.digital.invoice.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.digital.invoice.services.InvoiceItemService;

import java.util.List;

@RestController
@RequestMapping("/api/invoicesitems")
public class InvoiceItemController {

    private final InvoiceItemService invoiceItemService;
    private final InvoiceService invoiceService;

    @Autowired
    public InvoiceItemController(InvoiceItemService invoiceItemService, InvoiceService invoiceService){
        this.invoiceItemService = invoiceItemService;
        this.invoiceService = invoiceService;
    }

    @GetMapping("/{name}")
    public List<InvoiceItem> getInvoiceItemsByName(@PathVariable String name){
        return invoiceItemService.getInvoiceItemsByName(name);
    }

    @GetMapping
    public List<InvoiceItem> getAllInvoiceItems(){
        return invoiceItemService.getAllInvoiceItems();
    }

    @GetMapping("/{name}/invoices")
    public List<Invoice> getInvoicesByInvoiceItemName(@PathVariable String name){
     return invoiceService.getInvoicesByInvoiceItemsName(name);
    }
    @DeleteMapping("/invoiceItems/delete/{invoiceItem_id}")
    public boolean deleteInvoiceItem(@PathVariable Long invoiceItem_id){
        return invoiceItemService.deleteInvoiceItem(invoiceItem_id);
    }
}
