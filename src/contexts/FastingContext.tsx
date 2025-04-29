
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

interface FastingSession {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in hours
}

interface FastingContextType {
  isActive: boolean;
  startTime: Date | null;
  elapsedTime: number; // in milliseconds
  currentStage: number;
  sessions: FastingSession[];
  progress: number;
  targetHours: number;
  setTargetHours: (hours: number) => void;
  startFast: () => void;
  endFast: () => void;
  formatTimeLeft: () => string;
}

const FastingContext = createContext<FastingContextType | undefined>(undefined);

export const FastingProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessions, setSessions] = useState<FastingSession[]>([
    {
      id: "1",
      startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      endTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000),
      duration: 16
    },
    {
      id: "2",
      startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000),
      duration: 18
    },
    {
      id: "3",
      startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000),
      duration: 14
    }
  ]);
  const [targetHours, setTargetHours] = useState(16);
  const { toast } = useToast();
  
  // Calculate progress percentage
  const progress = isActive ? Math.min(100, (elapsedTime / (targetHours * 60 * 60 * 1000)) * 100) : 0;

  // Determine current fasting stage
  const elapsedHours = elapsedTime / (60 * 60 * 1000);
  let currentStage = 0;
  if (elapsedHours >= 4) currentStage = 1;  // Fat burning
  if (elapsedHours >= 12) currentStage = 2; // Ketosis
  if (elapsedHours >= 24) currentStage = 3; // Autophagy
  
  // Update timer every second when active
  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive && startTime) {
      interval = window.setInterval(() => {
        const now = new Date();
        setElapsedTime(now.getTime() - startTime.getTime());
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime]);
  
  // Load data from localStorage (for demo)
  useEffect(() => {
    const savedState = localStorage.getItem('fastingState');
    if (savedState) {
      const state = JSON.parse(savedState);
      setIsActive(state.isActive);
      if (state.startTime) setStartTime(new Date(state.startTime));
      setTargetHours(state.targetHours || 16);
      
      // Calculate elapsed time when restoring state
      if (state.isActive && state.startTime) {
        const now = new Date();
        const start = new Date(state.startTime);
        setElapsedTime(now.getTime() - start.getTime());
      }
    }
    
    const savedSessions = localStorage.getItem('fastingSessions');
    if (savedSessions) {
      const sessions = JSON.parse(savedSessions).map((session: any) => ({
        ...session,
        startTime: new Date(session.startTime),
        endTime: new Date(session.endTime)
      }));
      setSessions(sessions);
    }
  }, []);
  
  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('fastingState', JSON.stringify({
      isActive,
      startTime,
      targetHours
    }));
    
    // Save sessions with serializable dates
    localStorage.setItem('fastingSessions', JSON.stringify(sessions));
  }, [isActive, startTime, targetHours, sessions]);
  
  const startFast = () => {
    const now = new Date();
    setStartTime(now);
    setIsActive(true);
    setElapsedTime(0);
    
    toast({
      title: "Fast started",
      description: "Your fasting timer has begun. Stay strong!",
    });
  };
  
  const endFast = () => {
    if (!startTime) return;
    
    const now = new Date();
    const duration = (now.getTime() - startTime.getTime()) / (60 * 60 * 1000); // hours
    
    const newSession = {
      id: Math.random().toString(36).substring(2, 9),
      startTime,
      endTime: now,
      duration
    };
    
    setSessions(prev => [newSession, ...prev]);
    setIsActive(false);
    setStartTime(null);
    setElapsedTime(0);
    
    toast({
      title: "Fast completed",
      description: `Great work! You fasted for ${formatDuration(duration)}.`,
    });
  };
  
  const formatDuration = (hours: number): string => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };
  
  const formatTimeLeft = (): string => {
    if (!isActive) return `${targetHours}:00:00`;
    
    const targetMs = targetHours * 60 * 60 * 1000;
    const remaining = Math.max(0, targetMs - elapsedTime);
    
    const hours = Math.floor(remaining / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <FastingContext.Provider
      value={{
        isActive,
        startTime,
        elapsedTime,
        currentStage,
        sessions,
        progress,
        targetHours,
        setTargetHours,
        startFast,
        endFast,
        formatTimeLeft
      }}
    >
      {children}
    </FastingContext.Provider>
  );
};

export const useFasting = (): FastingContextType => {
  const context = useContext(FastingContext);
  if (context === undefined) {
    throw new Error("useFasting must be used within a FastingProvider");
  }
  return context;
};
