
import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("bloomUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  
  // For demo purposes only - in a real app, this would connect to a backend
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo authentication (in real app this would verify credentials with backend)
    if (email && password) {
      const demoUser = {
        id: "user-123",
        name: "Alex Johnson",
        email: email,
        avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=7E69AB&color=fff",
      };
      
      setUser(demoUser);
      localStorage.setItem("bloomUser", JSON.stringify(demoUser));
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
    }
    
    setIsLoading(false);
  };
  
  const signup = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo signup (in real app this would create account in backend)
    if (name && email && password) {
      const newUser = {
        id: "user-" + Math.floor(Math.random() * 1000),
        name: name,
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=7E69AB&color=fff`,
      };
      
      setUser(newUser);
      localStorage.setItem("bloomUser", JSON.stringify(newUser));
      toast({
        title: "Account created!",
        description: "Welcome to Bloom Fast Track.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Please fill all required fields and try again.",
      });
    }
    
    setIsLoading(false);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("bloomUser");
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
