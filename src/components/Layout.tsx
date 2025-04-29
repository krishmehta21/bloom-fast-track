
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Timer, BarChart2, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-4 py-3 bg-white/60 backdrop-blur-md border-b border-muted">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-bloom-purple to-bloom-purple-dark flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-lg font-semibold text-secondary">Bloom</span>
          </div>
          
          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:inline-block">{user.name}</span>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex">
        <div className="w-16 md:w-48 bg-white/60 backdrop-blur-md border-r border-muted p-2 flex flex-col">
          <nav className="flex flex-col gap-2 flex-1">
            <NavLink
              to="/"
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                ${isActive 
                  ? 'bg-bloom-purple text-white' 
                  : 'text-secondary hover:bg-bloom-purple hover:bg-opacity-10'}
              `}
            >
              <Timer size={18} />
              <span className="hidden md:inline">Fast Timer</span>
            </NavLink>
            
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                ${isActive 
                  ? 'bg-bloom-purple text-white' 
                  : 'text-secondary hover:bg-bloom-purple hover:bg-opacity-10'}
              `}
            >
              <BarChart2 size={18} />
              <span className="hidden md:inline">Dashboard</span>
            </NavLink>
          </nav>
          
          <Separator className="my-2" />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 justify-start text-sm font-medium text-secondary hover:bg-bloom-purple hover:bg-opacity-10"
          >
            <LogOut size={18} />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
