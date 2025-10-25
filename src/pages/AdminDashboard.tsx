import { DollarSign, Clock, CheckCircle, XCircle } from "lucide-react";
import { StatCard } from "@/components/Dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const recentTransactions = [
  {
    id: 1,
    employee: "John Doe",
    amount: 2500,
    mode: "Bank Transfer",
    status: "approved",
    date: "2025-01-15",
  },
  {
    id: 2,
    employee: "Jane Smith",
    amount: 1200,
    mode: "Cash",
    status: "pending",
    date: "2025-01-14",
  },
  {
    id: 3,
    employee: "Mike Johnson",
    amount: 3400,
    mode: "UPI",
    status: "approved",
    date: "2025-01-14",
  },
  {
    id: 4,
    employee: "Sarah Williams",
    amount: 890,
    mode: "Cash",
    status: "rejected",
    date: "2025-01-13",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of expense management system
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Expenses"
          value="₹45,231"
          icon={DollarSign}
          description="This month"
          trend={{ value: "12.5%", isPositive: true }}
          variant="default"
        />
        <StatCard
          title="Pending Reimbursements"
          value="₹12,450"
          icon={Clock}
          description="15 requests"
          variant="warning"
        />
        <StatCard
          title="Approved Requests"
          value="24"
          icon={CheckCircle}
          description="This month"
          variant="success"
        />
        <StatCard
          title="Rejected Requests"
          value="3"
          icon={XCircle}
          description="This month"
          variant="destructive"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.employee}
                  </TableCell>
                  <TableCell>₹{transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>{transaction.mode}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "approved"
                          ? "default"
                          : transaction.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                      className={
                        transaction.status === "approved"
                          ? "bg-success hover:bg-success/80"
                          : transaction.status === "pending"
                          ? "bg-warning hover:bg-warning/80"
                          : ""
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
