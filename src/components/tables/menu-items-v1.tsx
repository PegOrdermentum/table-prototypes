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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DetailSheet } from "@/components/detail-sheet";
import {
  menuItems as initialMenuItems,
  type MenuItem,
  type MenuItemStatus,
} from "@/data/menu-items";
import { toast } from "sonner";

function statusVariant(status: MenuItemStatus) {
  switch (status) {
    case "published":
      return "default" as const;
    case "draft":
      return "outline" as const;
    case "experiment":
      return "secondary" as const;
  }
}

function marginColor(margin: number) {
  if (margin >= 70) return "text-green-600";
  if (margin >= 60) return "text-yellow-600";
  return "text-red-600";
}

export function MenuItemsTableV1() {
  const [items, setItems] = useState<MenuItem[]>(initialMenuItems);
  const [detailItem, setDetailItem] = useState<MenuItem | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  function handleRowClick(item: MenuItem) {
    setDetailItem(item);
    setSheetOpen(true);
    toast.info(`Navigating to ${item.name}`, {
      description: "Full row click triggered navigation",
    });
  }

  function updateItem(id: string, updates: Partial<MenuItem>) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, ...updates };
        if (updates.price !== undefined) {
          updated.margin = Math.round(
            ((updated.price - updated.foodCost) / updated.price) * 100
          );
        }
        return updated;
      })
    );
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Menu Item</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Food Cost</TableHead>
              <TableHead className="text-right">Margin</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                className="cursor-pointer clickable-row"
                onClick={() => handleRowClick(item)}
              >
                <TableCell>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded object-cover bg-muted"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <p data-main-column className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="w-24">
                    <Input
                      type="number"
                      step="0.50"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(item.id, {
                          price: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="h-8 text-sm"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  ${item.foodCost.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <span className={`font-medium ${marginColor(item.margin)}`}>
                    {item.margin}%
                  </span>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Select
                    value={item.status}
                    onValueChange={(val) =>
                      updateItem(item.id, {
                        status: val as MenuItemStatus,
                      })
                    }
                  >
                    <SelectTrigger className="h-8 w-32 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">
                        <Badge variant="outline" className="text-xs">
                          Draft
                        </Badge>
                      </SelectItem>
                      <SelectItem value="published">
                        <Badge variant="default" className="text-xs">
                          Published
                        </Badge>
                      </SelectItem>
                      <SelectItem value="experiment">
                        <Badge variant="secondary" className="text-xs">
                          Experiment
                        </Badge>
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
        type="menu-item"
      />
    </div>
  );
}
