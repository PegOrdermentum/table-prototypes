"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DetailSheet } from "@/components/detail-sheet";
import { invoices, type Invoice, type InvoiceStatus } from "@/data/invoices";
import { Download } from "lucide-react";
import { toast } from "sonner";

function statusVariant(status: InvoiceStatus) {
  switch (status) {
    case "paid":
      return "default" as const;
    case "pending":
      return "secondary" as const;
    case "overdue":
      return "destructive" as const;
    case "draft":
      return "outline" as const;
    case "cancelled":
      return "destructive" as const;
  }
}

export function InvoicesTableV1() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [detailItem, setDetailItem] = useState<Invoice | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const allSelected =
    selected.size === invoices.length && invoices.length > 0;
  const someSelected = selected.size > 0 && !allSelected;

  function toggleAll() {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(invoices.map((i) => i.id)));
    }
  }

  function toggleOne(id: string) {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelected(next);
  }

  function handleRowClick(invoice: Invoice) {
    setDetailItem(invoice);
    setSheetOpen(true);
    toast.info(`Navigating to ${invoice.invoiceNumber}`, {
      description: "Full row click triggered navigation",
    });
  }

  function handleExport() {
    const selectedInvoices = invoices.filter((i) => selected.has(i.id));
    toast.success(`Exporting ${selectedInvoices.length} invoice(s)`, {
      description: selectedInvoices
        .map((i) => i.invoiceNumber)
        .join(", "),
    });
  }

  return (
    <div>
      {selected.size > 0 && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">
            {selected.size} invoice(s) selected
          </span>
          <Button size="sm" variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Selected
          </Button>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected ? true : someSelected ? "indeterminate" : false}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>Invoice Number</TableHead>
              <TableHead>Invoice Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice.id}
                className="cursor-pointer clickable-row"
                onClick={() => handleRowClick(invoice)}
                data-state={selected.has(invoice.id) ? "selected" : undefined}
              >
                <TableCell
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    checked={selected.has(invoice.id)}
                    onCheckedChange={() => toggleOne(invoice.id)}
                  />
                </TableCell>
                <TableCell>
                  <span data-main-column className="font-medium">
                    {invoice.invoiceNumber}
                  </span>
                </TableCell>
                <TableCell>{invoice.invoiceDate}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  ${invoice.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DetailSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        item={detailItem}
        type="invoice"
      />
    </div>
  );
}
