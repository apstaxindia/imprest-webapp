import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Tag,
  FileText,
  Receipt,
  Edit,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  ImageIcon,
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

const getStatusConfig = (status: string) => {
  switch (status) {
    case "approved":
      return {
        icon: CheckCircle2,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
      };
    case "pending":
      return {
        icon: Clock,
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        badge: "bg-amber-100 text-amber-700 border-amber-200",
      };
    case "rejected":
      return {
        icon: XCircle,
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
        badge: "bg-red-100 text-red-700 border-red-200",
      };
    default:
      return {
        icon: AlertCircle,
        color: "text-muted-foreground",
        bg: "bg-muted",
        border: "border-border",
        badge: "bg-muted text-muted-foreground",
      };
  }
};

export default function ExpenseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const expense = expenses.find((e) => e.id === Number(id));

  if (!expense) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold">Expense Not Found</h2>
        <p className="text-muted-foreground">
          The expense you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate("/expenses")} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Expenses
        </Button>
      </div>
    );
  }

  const statusConfig = getStatusConfig(expense.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/expenses")}
            className="shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{expense.title}</h1>
              <Badge
                variant="outline"
                className={`capitalize ${statusConfig.badge}`}
              >
                <StatusIcon className="h-3 w-3 mr-1" />
                {expense.status}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-1">
              Expense #{expense.id} • Created on{" "}
              {new Date(expense.date).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex gap-2 ml-14 sm:ml-0">
          <Button variant="outline" size="sm" className="gap-2">
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </div>

      {/* Amount Card */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-primary to-primary/80 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-primary-foreground/80 text-sm font-medium mb-1">
                Total Amount
              </p>
              <p className="text-4xl sm:text-5xl font-bold text-primary-foreground">
                ₹{expense.amount.toLocaleString()}
              </p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bg} ${statusConfig.border} border`}>
              <StatusIcon className={`h-5 w-5 ${statusConfig.color}`} />
              <span className={`font-medium capitalize ${statusConfig.color}`}>
                {expense.status}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Details Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Info Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <Tag className="h-5 w-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Category
                  </p>
                  <p className="font-semibold mt-0.5 truncate">{expense.category}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Payment
                  </p>
                  <p className="font-semibold mt-0.5 truncate">{expense.mode}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow col-span-2 sm:col-span-1">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Date
                  </p>
                  <p className="font-semibold mt-0.5">
                    {new Date(expense.date).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Notes */}
          {expense.notes && (
            <Card className="overflow-hidden">
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold text-sm">Notes & Description</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-muted-foreground leading-relaxed">
                  {expense.notes}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Receipt */}
          <Card className="overflow-hidden">
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold text-sm">Receipt</h3>
                </div>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="aspect-[4/3] rounded-lg border-2 border-dashed bg-muted/30 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground text-center px-4">
                  No receipt uploaded
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Upload Receipt
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="overflow-hidden">
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm">Activity Timeline</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="relative space-y-4">
                {/* Created */}
                <div className="flex gap-3">
                  <div className="relative flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center z-10">
                      <Receipt className="h-4 w-4 text-primary" />
                    </div>
                    {expense.status !== "pending" && (
                      <div className="w-0.5 h-full bg-border absolute top-8" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="font-medium text-sm">Expense Submitted</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(expense.date).toLocaleDateString("en-IN", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Status */}
                {expense.status !== "pending" && (
                  <div className="flex gap-3">
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center z-10 ${statusConfig.bg}`}
                      >
                        <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm capitalize">
                        {expense.status === "approved" ? "Approved" : "Rejected"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(expense.date).toLocaleDateString("en-IN", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )}

                {expense.status === "pending" && (
                  <div className="flex gap-3">
                    <div className="relative flex flex-col items-center">
                      <div className="h-8 w-8 rounded-full bg-amber-50 flex items-center justify-center z-10 border-2 border-dashed border-amber-300">
                        <Clock className="h-4 w-4 text-amber-600" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-amber-600">
                        Awaiting Approval
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Under review
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
