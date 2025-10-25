import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye } from "lucide-react";

const requests = [
  {
    id: 1,
    employee: "John Doe",
    totalAmount: 4200,
    items: 3,
    date: "2025-01-15",
    status: "pending",
  },
  {
    id: 2,
    employee: "Jane Smith",
    totalAmount: 2100,
    items: 2,
    date: "2025-01-14",
    status: "approved",
  },
  {
    id: 3,
    employee: "Mike Johnson",
    totalAmount: 5600,
    items: 5,
    date: "2025-01-13",
    status: "pending",
  },
  {
    id: 4,
    employee: "Sarah Williams",
    totalAmount: 890,
    items: 1,
    date: "2025-01-12",
    status: "rejected",
  },
];

export default function Requests() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Expense Requests</h1>
        <p className="text-muted-foreground">Review and manage expense requests</p>
      </div>

      <div className="grid gap-4">
        {requests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{request.employee}</h3>
                    <p className="text-sm text-muted-foreground">
                      {request.items} items • {request.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-2xl font-bold">
                      ₹{request.totalAmount.toLocaleString()}
                    </p>
                  </div>

                  <Badge
                    variant={
                      request.status === "approved"
                        ? "default"
                        : request.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                    className={
                      request.status === "approved"
                        ? "bg-success hover:bg-success/80"
                        : request.status === "pending"
                        ? "bg-warning hover:bg-warning/80"
                        : ""
                    }
                  >
                    {request.status}
                  </Badge>

                  <Button variant="outline" className="gap-2">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
