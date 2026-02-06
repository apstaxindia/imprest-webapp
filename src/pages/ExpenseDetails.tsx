import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Tag,
  FileText,
  Receipt,
  Edit,
  Trash2,
} from "lucide-react";

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  mode: string;
  date: string;
  status: string;
  notes?: string;
}

// Mock data - in real app this would come from API/database
const expenses: Expense[] = [
  {
    id: 1,
    title: "Travel to Client Site",
    amount: 2500,
    category: "Travel",
    mode: "Cash",
    date: "2025-01-15",
    status: "approved",
    notes: "Client meeting at their office location. Included cab fare and lunch.",
  },
  {
    id: 2,
    title: "Office Supplies",
    amount: 450,
    category: "Supplies",
    mode: "UPI",
    date: "2025-01-14",
    status: "pending",
    notes: "Purchased stationery items for the team.",
  },
  {
    id: 3,
    title: "Team Lunch",
    amount: 1200,
    category: "Food",
    mode: "Cash",
    date: "2025-01-12",
    status: "approved",
    notes: "Monthly team lunch celebration.",
  },
  {
    id: 4,
    title: "Software License",
    amount: 3400,
    category: "Software",
    mode: "Bank Transfer",
    date: "2025-01-10",
    status: "approved",
    notes: "Annual subscription renewal for project management tool.",
  },
  {
    id: 5,
    title: "Parking Fee",
    amount: 150,
    category: "Travel",
    mode: "Cash",
    date: "2025-01-08",
    status: "rejected",
  },
];

export default function ExpenseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const expense = expenses.find((e) => e.id === Number(id));

  if (!expense) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <h2 className="text-2xl font-semibold">Expense Not Found</h2>
        <p className="text-muted-foreground">
          The expense you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate("/expenses")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Expenses
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/expenses")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Expense Details</h1>
            <p className="text-muted-foreground">View expense information</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" className="gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Main Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Receipt className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">{expense.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">ID: #{expense.id}</p>
                </div>
              </div>
              <Badge
                variant={
                  expense.status === "approved"
                    ? "default"
                    : expense.status === "pending"
                    ? "secondary"
                    : "destructive"
                }
                className={
                  expense.status === "approved"
                    ? "bg-success hover:bg-success/80"
                    : expense.status === "pending"
                    ? "bg-warning hover:bg-warning/80"
                    : ""
                }
              >
                {expense.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount */}
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
              <p className="text-4xl font-bold text-primary">
                ₹{expense.amount.toLocaleString()}
              </p>
            </div>

            <Separator />

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Tag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="font-medium">{expense.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Payment Mode</p>
                  <p className="font-medium">{expense.mode}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 sm:col-span-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {new Date(expense.date).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            {expense.notes && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <FileText className="h-4 w-4" />
                    Notes
                  </div>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                    {expense.notes}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Right Column - Receipt & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Receipt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-lg bg-muted/30">
                <Receipt className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No receipt uploaded</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div className="w-px h-full bg-border" />
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium">Expense Created</p>
                    <p className="text-xs text-muted-foreground">{expense.date}</p>
                  </div>
                </div>
                {expense.status !== "pending" && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          expense.status === "approved" ? "bg-success" : "bg-destructive"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium capitalize">
                        {expense.status}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
