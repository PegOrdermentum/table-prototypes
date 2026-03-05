"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Invoice } from "@/data/invoices";
import type { Product } from "@/data/products";
import type { MenuItem } from "@/data/menu-items";

interface DetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Invoice | Product | MenuItem | null;
  type: "invoice" | "product" | "menu-item";
}

function statusColor(status: string) {
  switch (status) {
    case "paid":
    case "published":
      return "default" as const;
    case "pending":
    case "experiment":
      return "secondary" as const;
    case "overdue":
      return "destructive" as const;
    case "draft":
      return "outline" as const;
    case "cancelled":
      return "destructive" as const;
    default:
      return "secondary" as const;
  }
}

function InvoiceDetail({ invoice }: { invoice: Invoice }) {
  return (
    <>
      <SheetHeader>
        <SheetTitle>{invoice.invoiceNumber}</SheetTitle>
        <SheetDescription>{invoice.customer}</SheetDescription>
      </SheetHeader>
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Invoice Date</p>
            <p className="text-sm font-medium">{invoice.invoiceDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Due Date</p>
            <p className="text-sm font-medium">{invoice.dueDate}</p>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge variant={statusColor(invoice.status)} className="mt-1">
              {invoice.status}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="text-sm font-medium">
              ${invoice.amount.toFixed(2)}
            </p>
          </div>
        </div>
        <Separator />
        <div>
          <p className="text-sm text-muted-foreground">Description</p>
          <p className="text-sm">{invoice.description}</p>
        </div>
      </div>
    </>
  );
}

function ProductDetail({ product }: { product: Product }) {
  return (
    <>
      <SheetHeader>
        <SheetTitle>{product.productName}</SheetTitle>
        <SheetDescription>SKU: {product.sku}</SheetDescription>
      </SheetHeader>
      <div className="mt-6 space-y-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.productName}
          className="w-full h-48 object-cover rounded-md bg-muted"
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="text-sm font-medium">{product.category}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Unit</p>
            <p className="text-sm font-medium">{product.unit}</p>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Base Price</p>
            <p className="text-sm font-medium">
              ${product.basePrice.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Stock Level</p>
            <p className="text-sm font-medium">{product.stockLevel}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">In Stock</p>
            <Badge variant={product.inStock ? "default" : "destructive"}>
              {product.inStock ? "Yes" : "No"}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Badge</p>
            {product.badge !== "none" ? (
              <Badge variant="secondary">{product.badge}</Badge>
            ) : (
              <p className="text-sm text-muted-foreground">None</p>
            )}
          </div>
        </div>
        <Separator />
        <div>
          <p className="text-sm text-muted-foreground">Description</p>
          <p className="text-sm">{product.description}</p>
        </div>
      </div>
    </>
  );
}

function MenuItemDetail({ menuItem }: { menuItem: MenuItem }) {
  return (
    <>
      <SheetHeader>
        <SheetTitle>{menuItem.name}</SheetTitle>
        <SheetDescription>{menuItem.category}</SheetDescription>
      </SheetHeader>
      <div className="mt-6 space-y-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={menuItem.image}
          alt={menuItem.name}
          className="w-full h-48 object-cover rounded-md bg-muted"
        />
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-sm font-medium">
              ${menuItem.price.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Food Cost</p>
            <p className="text-sm font-medium">
              ${menuItem.foodCost.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Margin</p>
            <p className="text-sm font-medium">{menuItem.margin}%</p>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge variant={statusColor(menuItem.status)} className="mt-1">
              {menuItem.status}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Allergens</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {menuItem.allergens.map((a) => (
                <Badge key={a} variant="outline" className="text-xs">
                  {a}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <Separator />
        <div>
          <p className="text-sm text-muted-foreground">Description</p>
          <p className="text-sm">{menuItem.description}</p>
        </div>
      </div>
    </>
  );
}

export function DetailSheet({
  open,
  onOpenChange,
  item,
  type,
}: DetailSheetProps) {
  if (!item) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-md">
        {type === "invoice" && <InvoiceDetail invoice={item as Invoice} />}
        {type === "product" && <ProductDetail product={item as Product} />}
        {type === "menu-item" && (
          <MenuItemDetail menuItem={item as MenuItem} />
        )}
      </SheetContent>
    </Sheet>
  );
}
