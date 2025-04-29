
export const formatDuration = (hours: number): string => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
};

export const calculateCurrentStage = (elapsedHours: number): number => {
  let currentStage = 0;
  if (elapsedHours >= 4) currentStage = 1;  // Fat burning
  if (elapsedHours >= 12) currentStage = 2; // Ketosis
  if (elapsedHours >= 24) currentStage = 3; // Autophagy
  
  return currentStage;
};

export const calculateProgress = (
  isActive: boolean, 
  elapsedTime: number, 
  targetHours: number
): number => {
  return isActive 
    ? Math.min(100, (elapsedTime / (targetHours * 60 * 60 * 1000)) * 100) 
    : 0;
};

export const formatTimeRemaining = (
  isActive: boolean,
  targetHours: number,
  elapsedTime: number
): string => {
  if (!isActive) return `${targetHours}:00:00`;
  
  const targetMs = targetHours * 60 * 60 * 1000;
  const remaining = Math.max(0, targetMs - elapsedTime);
  
  const hours = Math.floor(remaining / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
