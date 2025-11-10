import { useState, createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";

interface RoleContextType {
  userRole: "admin" | "employee";
  setUserRole: (role: "admin" | "employee") => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within AppLayout");
  return context;
};

export function AppLayout() {
  const [userRole, setUserRole] = useState<"admin" | "employee">("admin");

  return (
    <RoleContext.Provider value={{ userRole, setUserRole }}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar userRole={userRole} />
          <div className="flex-1 flex flex-col">
            <TopBar />
            <main className="flex-1 p-6 bg-background overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </RoleContext.Provider>
  );
}
