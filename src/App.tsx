import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout, useRole } from "./components/Layout/AppLayout";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Expenses from "./pages/Expenses";
import ExpenseDetails from "./pages/ExpenseDetails";
import Requests from "./pages/Requests";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function Dashboard() {
  const { userRole } = useRole();
  return userRole === "admin" ? <AdminDashboard /> : <EmployeeDashboard />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/expenses/:id" element={<ExpenseDetails />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/transactions" element={<div>Transactions Page</div>} />
            <Route path="/employees" element={<div>Employees Page</div>} />
            <Route path="/reports" element={<div>Reports Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
