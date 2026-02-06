import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export default function Expenses() {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const filteredExpenses =
    filter === "all"
      ? expenses
      : expenses.filter((expense) => expense.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">Manage all expense records</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Expense
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Expenses</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                variant={filter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("pending")}
              >
                Pending
              </Button>
              <Button
                variant={filter === "approved" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("approved")}
              >
                Approved
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.title}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>₹{expense.amount.toLocaleString()}</TableCell>
                  <TableCell>{expense.mode}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => navigate(`/expenses/${expense.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
