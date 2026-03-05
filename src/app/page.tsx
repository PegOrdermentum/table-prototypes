"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { InvoicesTableV1 } from "@/components/tables/invoices-v1";
import { InvoicesTableV2 } from "@/components/tables/invoices-v2";
import { ProductsTableV1 } from "@/components/tables/products-v1";
import { ProductsTableV2 } from "@/components/tables/products-v2";
import { MenuItemsTableV1 } from "@/components/tables/menu-items-v1";
import { MenuItemsTableV2 } from "@/components/tables/menu-items-v2";
import {
  MousePointerClick,
  TableIcon,
  PointerIcon,
} from "lucide-react";

type DataTable = "invoices" | "products" | "menu-items";

const dataTableLabels: Record<DataTable, string> = {
  invoices: "Invoices",
  products: "Products",
  "menu-items": "Menu Items",
};

const dataTableDescriptions: Record<DataTable, string> = {
  invoices:
    "Checkbox for bulk export, no editable cells, no row actions",
  products:
    "Editable: in-stock toggle, base price, badge. Row actions: edit prices, delete",
  "menu-items":
    "Editable: price, status dropdown. No row actions",
};

export default function Home() {
  const [activeTable, setActiveTable] = useState<DataTable>("invoices");
  const [activeVariant, setActiveVariant] = useState<"v1" | "v2">("v1");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <TableIcon className="h-6 w-6" />
            <div>
              <h1 className="text-xl font-semibold">
                Table Interaction Prototypes
              </h1>
              <p className="text-sm text-muted-foreground">
                Testing click behavior variants across different data tables
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Data table selector */}
        <div className="mb-6">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Data Table
          </p>
          <div className="flex gap-2">
            {(Object.keys(dataTableLabels) as DataTable[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTable(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTable === key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {dataTableLabels[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Variant selector */}
        <div className="mb-6">
          <Tabs
            value={activeVariant}
            onValueChange={(v) => setActiveVariant(v as "v1" | "v2")}
          >
            <TabsList className="grid w-full max-w-xl grid-cols-2">
              <TabsTrigger value="v1" className="gap-2">
                <MousePointerClick className="h-4 w-4" />
                Variant 1: Full Row Click
              </TabsTrigger>
              <TabsTrigger value="v2" className="gap-2">
                <PointerIcon className="h-4 w-4" />
                Variant 2: Main Column Click
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Description card */}
        <div className="mb-6 p-4 rounded-lg border bg-card">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-semibold">
                  {dataTableLabels[activeTable]}
                </h2>
                <Badge variant="outline">
                  {activeVariant === "v1"
                    ? "Full Row Click"
                    : "Main Column Click"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {dataTableDescriptions[activeTable]}
              </p>
              {activeVariant === "v1" ? (
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>
                    <strong>Behavior:</strong> Entire row is clickable
                    with pointer cursor. Clicking anywhere navigates to
                    the detail view.
                  </p>
                  <p>
                    <strong>Editable cells:</strong> Clicking the
                    editable control (input, switch, dropdown) stays in
                    edit mode. Clicking outside the control but within
                    the cell triggers navigation.
                  </p>
                  <p>
                    <strong>Checkboxes / Actions:</strong> These have
                    their own click handlers and do not trigger
                    navigation.
                  </p>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>
                    <strong>Behavior:</strong> Only the main column
                    (name/number) is clickable, styled as a link with
                    hover underline.
                  </p>
                  <p>
                    <strong>Editable cells:</strong> Editing works
                    normally. Clicking outside the editable area within
                    the cell does NOT navigate.
                  </p>
                  <p>
                    <strong>Other cells:</strong> Row has hover
                    background highlight, but clicking non-interactive
                    cells does nothing.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table content */}
        <div>
          {activeTable === "invoices" && activeVariant === "v1" && (
            <InvoicesTableV1 />
          )}
          {activeTable === "invoices" && activeVariant === "v2" && (
            <InvoicesTableV2 />
          )}
          {activeTable === "products" && activeVariant === "v1" && (
            <ProductsTableV1 />
          )}
          {activeTable === "products" && activeVariant === "v2" && (
            <ProductsTableV2 />
          )}
          {activeTable === "menu-items" && activeVariant === "v1" && (
            <MenuItemsTableV1 />
          )}
          {activeTable === "menu-items" && activeVariant === "v2" && (
            <MenuItemsTableV2 />
          )}
        </div>
      </main>
    </div>
  );
}
