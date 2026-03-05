export type InvoiceStatus = "paid" | "pending" | "overdue" | "draft" | "cancelled";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  status: InvoiceStatus;
  amount: number;
  customer: string;
  description: string;
}

export const invoices: Invoice[] = [
  {
    id: "inv-001",
    invoiceNumber: "INV-2024-001",
    invoiceDate: "2024-01-15",
    dueDate: "2024-02-15",
    status: "paid",
    amount: 1250.0,
    customer: "Acme Corporation",
    description: "Website development - Phase 1",
  },
  {
    id: "inv-002",
    invoiceNumber: "INV-2024-002",
    invoiceDate: "2024-01-20",
    dueDate: "2024-02-20",
    status: "paid",
    amount: 3400.0,
    customer: "TechStart Inc.",
    description: "Mobile app design and prototyping",
  },
  {
    id: "inv-003",
    invoiceNumber: "INV-2024-003",
    invoiceDate: "2024-02-01",
    dueDate: "2024-03-01",
    status: "pending",
    amount: 890.0,
    customer: "Green Valley Farms",
    description: "Brand identity package",
  },
  {
    id: "inv-004",
    invoiceNumber: "INV-2024-004",
    invoiceDate: "2024-02-10",
    dueDate: "2024-03-10",
    status: "overdue",
    amount: 5600.0,
    customer: "Metro Health Clinic",
    description: "Patient portal development",
  },
  {
    id: "inv-005",
    invoiceNumber: "INV-2024-005",
    invoiceDate: "2024-02-15",
    dueDate: "2024-03-15",
    status: "pending",
    amount: 2100.0,
    customer: "Sunrise Bakery",
    description: "E-commerce store setup",
  },
  {
    id: "inv-006",
    invoiceNumber: "INV-2024-006",
    invoiceDate: "2024-03-01",
    dueDate: "2024-04-01",
    status: "draft",
    amount: 750.0,
    customer: "BookWorm Publishing",
    description: "Newsletter template design",
  },
  {
    id: "inv-007",
    invoiceNumber: "INV-2024-007",
    invoiceDate: "2024-03-05",
    dueDate: "2024-04-05",
    status: "pending",
    amount: 4200.0,
    customer: "FitLife Gym",
    description: "Membership management system",
  },
  {
    id: "inv-008",
    invoiceNumber: "INV-2024-008",
    invoiceDate: "2024-03-10",
    dueDate: "2024-04-10",
    status: "cancelled",
    amount: 1800.0,
    customer: "Coastal Realty",
    description: "Property listing website",
  },
  {
    id: "inv-009",
    invoiceNumber: "INV-2024-009",
    invoiceDate: "2024-03-15",
    dueDate: "2024-04-15",
    status: "overdue",
    amount: 3150.0,
    customer: "Urban Threads",
    description: "Inventory management dashboard",
  },
  {
    id: "inv-010",
    invoiceNumber: "INV-2024-010",
    invoiceDate: "2024-03-20",
    dueDate: "2024-04-20",
    status: "paid",
    amount: 6800.0,
    customer: "Pinnacle Consulting",
    description: "CRM integration project",
  },
  {
    id: "inv-011",
    invoiceNumber: "INV-2024-011",
    invoiceDate: "2024-03-25",
    dueDate: "2024-04-25",
    status: "pending",
    amount: 920.0,
    customer: "Happy Paws Vet",
    description: "Appointment booking system",
  },
  {
    id: "inv-012",
    invoiceNumber: "INV-2024-012",
    invoiceDate: "2024-04-01",
    dueDate: "2024-05-01",
    status: "draft",
    amount: 2750.0,
    customer: "Silver Screen Studios",
    description: "Video streaming platform MVP",
  },
];
