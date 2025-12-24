import { Bell, LogIn, Search, UserCog, Users } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRole } from "./AppLayout";
import { useNavigate } from "react-router-dom";

export function TopBar() {
  const { userRole, setUserRole } = useRole();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-6">
      <SidebarTrigger />
      
      <div className="flex-1 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search expenses, requests..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted">
        <Badge variant="outline" className="capitalize">{userRole}</Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setUserRole(userRole === "admin" ? "employee" : "admin")}
          className="gap-2"
        >
          {userRole === "admin" ? <Users className="h-4 w-4" /> : <UserCog className="h-4 w-4" />}
          Switch to {userRole === "admin" ? "Employee" : "Admin"}
        </Button>
      </div>

      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2"
        onClick={() => navigate("/auth")}
      >
        <LogIn className="h-4 w-4" />
        Login
      </Button>

      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                {userRole === "admin" ? "AD" : "EM"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
