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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DetailSheet } from "@/components/detail-sheet";
import {
  products as initialProducts,
  type Product,
  type ProductBadge,
} from "@/data/products";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

function badgeLabel(badge: ProductBadge) {
  switch (badge) {
    case "none":
      return "None";
    case "on-special":
      return "On Special";
    case "best-buy":
      return "Best Buy";
    case "staff-pick":
      return "Staff Pick";
  }
}

function badgeVariant(badge: ProductBadge) {
  switch (badge) {
    case "none":
      return "outline" as const;
    case "on-special":
      return "destructive" as const;
    case "best-buy":
      return "default" as const;
    case "staff-pick":
      return "secondary" as const;
  }
}

export function ProductsTableV1() {
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [detailItem, setDetailItem] = useState<Product | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  function handleRowClick(product: Product) {
    setDetailItem(product);
    setSheetOpen(true);
    toast.info(`Navigating to ${product.productName}`, {
      description: "Full row click triggered navigation",
    });
  }

  function updateProduct(id: string, updates: Partial<Product>) {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }

  function handleDelete(product: Product) {
    setItems((prev) => prev.filter((p) => p.id !== product.id));
    toast.success(`Deleted ${product.productName}`);
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead>In Stock</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Base Price</TableHead>
              <TableHead>Badge</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((product) => (
              <TableRow
                key={product.id}
                className="cursor-pointer clickable-row"
                onClick={() => handleRowClick(product)}
              >
                <TableCell>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-10 h-10 rounded object-cover bg-muted"
                  />
                </TableCell>
                <TableCell>
                  <span data-main-column className="font-medium">
                    {product.productName}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground font-mono text-xs">
                  {product.sku}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={
                      product.stockLevel === 0
                        ? "text-destructive font-medium"
                        : product.stockLevel < 20
                          ? "text-orange-600 font-medium"
                          : ""
                    }
                  >
                    {product.stockLevel}
                  </span>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center">
                    <Switch
                      checked={product.inStock}
                      onCheckedChange={(checked) =>
                        updateProduct(product.id, { inStock: checked })
                      }
                    />
                  </div>
                </TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="w-24">
                    <Input
                      type="number"
                      step="0.01"
                      value={product.basePrice}
                      onChange={(e) =>
                        updateProduct(product.id, {
                          basePrice: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="h-8 text-sm"
                    />
                  </div>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Select
                    value={product.badge}
                    onValueChange={(val) =>
                      updateProduct(product.id, {
                        badge: val as ProductBadge,
                      })
                    }
                  >
                    <SelectTrigger className="h-8 w-28 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="on-special">On Special</SelectItem>
                      <SelectItem value="best-buy">Best Buy</SelectItem>
                      <SelectItem value="staff-pick">Staff Pick</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          toast.info(`Edit prices for ${product.productName}`);
                        }}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Prices
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(product)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
        type="product"
      />
    </div>
  );
}
