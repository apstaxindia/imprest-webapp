import { DollarSign, Clock, CheckCircle, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/Dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const recentActivity = [
  {
    id: 1,
    title: "Travel Reimbursement",
    amount: 2500,
    status: "approved",
    date: "2025-01-15",
  },
  {
    id: 2,
    title: "Office Supplies",
    amount: 450,
    status: "pending",
    date: "2025-01-14",
  },
  {
    id: 3,
    title: "Client Meeting Lunch",
    amount: 1200,
    status: "approved",
    date: "2025-01-12",
  },
  {
    id: 4,
    title: "Software Subscription",
    amount: 890,
    status: "pending",
    date: "2025-01-10",
  },
];

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Employee!</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Expense
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Expenses"
          value="₹8,450"
          icon={DollarSign}
          description="This month"
          variant="default"
        />
        <StatCard
          title="Pending Requests"
          value="₹2,340"
          icon={Clock}
          description="2 requests"
          variant="warning"
        />
        <StatCard
          title="Approved Amount"
          value="₹6,110"
          icon={CheckCircle}
          description="This month"
          variant="success"
        />
        <StatCard
          title="Total Reimbursed"
          value="₹45,680"
          icon={TrendingUp}
          description="All time"
          variant="default"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">
                    ₹{activity.amount.toLocaleString()}
                  </span>
                  <Badge
                    variant={
                      activity.status === "approved" ? "default" : "secondary"
                    }
                    className={
                      activity.status === "approved"
                        ? "bg-success hover:bg-success/80"
                        : "bg-warning hover:bg-warning/80"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
