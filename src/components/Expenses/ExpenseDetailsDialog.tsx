import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, CreditCard, Tag, FileText, Receipt } from "lucide-react";

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

interface ExpenseDetailsDialogProps {
  expense: Expense | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExpenseDetailsDialog({
  expense,
  open,
  onOpenChange,
}: ExpenseDetailsDialogProps) {
  if (!expense) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            Expense Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Title and Amount */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold">{expense.title}</h3>
              <p className="text-sm text-muted-foreground">ID: #{expense.id}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                ₹{expense.amount.toLocaleString()}
              </p>
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
          </div>

          <Separator />

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-medium">{expense.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Payment Mode</p>
                <p className="font-medium">{expense.mode}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 col-span-2">
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
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  Notes
                </div>
                <p className="text-sm bg-muted/50 p-3 rounded-lg">
                  {expense.notes}
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
