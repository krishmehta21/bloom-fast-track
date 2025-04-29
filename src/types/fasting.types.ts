
import { ReactNode } from "react";

export interface FastingSession {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in hours
}

export interface FastingContextType {
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

export interface FastingProviderProps {
  children: ReactNode;
}
