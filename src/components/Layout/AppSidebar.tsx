import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  FileText,
  ArrowLeftRight,
  BarChart3,
  Settings,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  userRole: "admin" | "employee";
}

const adminNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Expenses", url: "/expenses", icon: Receipt },
  { title: "Requests", url: "/requests", icon: FileText },
  { title: "Transactions", url: "/transactions", icon: ArrowLeftRight },
  { title: "Employees", url: "/employees", icon: Users },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

const employeeNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "My Expenses", url: "/expenses", icon: Receipt },
  { title: "My Requests", url: "/requests", icon: FileText },
  { title: "My Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar({ userRole }: AppSidebarProps) {
  const { state } = useSidebar();
  const navItems = userRole === "admin" ? adminNavItems : employeeNavItems;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Receipt className="h-6 w-6 text-primary-foreground" />
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">Imprest</h2>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {state === "expanded" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
