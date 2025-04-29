
import { useEffect } from "react";
import Layout from "../components/Layout";
import CircularProgressBar from "../components/CircularProgressBar";
import FastingStages from "../components/FastingStages";
import FastingHistory from "../components/FastingHistory";
import FastingTips from "../components/FastingTips";
import { useFasting } from "../contexts/FastingContext";
import { Button } from "@/components/ui/button";
import { Play, Square, Calendar, CircleOff, Flame, Droplet } from "lucide-react";

const HomePage = () => {
  const {
    isActive,
    startFast,
    endFast,
    formatTimeLeft,
    progress,
    currentStage,
    sessions,
    elapsedTime,
    startTime,
  } = useFasting();
  
  // Format elapsed time in hours and minutes
  const formatElapsedTime = () => {
    if (!isActive) return "0h 0m";
    
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    
    return `${hours}h ${minutes}m`;
  };

  // Format seconds to display
  const formatSeconds = () => {
    if (!isActive) return "";
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    return `${seconds}s`;
  };
  
  // Format remaining time
  const formatRemainingTime = () => {
    if (!isActive) return "";
    const remaining = useFasting().targetHours * 60 * 60 * 1000 - elapsedTime;
    if (remaining <= 0) return "Completed";
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };
  
  // Format start and end time
  const formatStartEndTime = () => {
    if (!startTime) return { date: "Today", time: "00:00 AM" };
    
    const date = new Date(startTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    return {
      date: "Today",
      time: `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`
    };
  };
  
  // Calculate estimated end time
  const calculateEndTime = () => {
    if (!startTime) return { date: "Today", time: "00:00 PM" };
    
    const endTime = new Date(startTime.getTime() + useFasting().targetHours * 60 * 60 * 1000);
    const hours = endTime.getHours();
    const minutes = endTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    return {
      date: "Today",
      time: `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`
    };
  };
  
  const startTimeFormatted = formatStartEndTime();
  const endTimeFormatted = calculateEndTime();
  
  // Progress markers for the circular progress bar
  const progressMarkers = [
    {
      position: 15,
      icon: <Flame className="h-4 w-4 text-orange-400" />,
      isActive: currentStage >= 1,
    },
    {
      position: 45,
      icon: <Flame className="h-4 w-4 text-red-400" />,
      isActive: currentStage >= 2,
    },
    {
      position: 75,
      icon: <Droplet className="h-4 w-4 text-blue-400" />,
      isActive: currentStage >= 3,
    },
    {
      position: 95,
      icon: <Droplet className="h-4 w-4 text-gray-400" />,
      isActive: false,
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="py-4 px-6 text-center relative">
        <h1 className="text-2xl font-bold tracking-wider">EASY FAST</h1>
      </header>
      
      <main className="flex-1 flex flex-col items-center px-4 pb-20 max-w-lg mx-auto">
        <div className="w-full flex justify-between items-center mb-2">
          {isActive && (
            <div className="ml-auto px-5 py-1.5 bg-black border border-orange-700 rounded-full flex items-center gap-1">
              <span className="text-orange-500 font-medium">20:4</span>
              <span className="text-orange-500">✎</span>
            </div>
          )}
        </div>
        
        <div className="relative w-full">
          <CircularProgressBar 
            progress={progress} 
            strokeWidth={30}
            circleColor="#222222"
            markers={progressMarkers}
          >
            <div className="text-center">
              <p className="text-gray-300 text-sm mb-1">
                {isActive ? "Fasting for" : "Ready to start?"}
              </p>
              
              <div className="text-4xl font-bold text-white relative">
                {isActive ? formatElapsedTime() : "Start Fast"}
                {isActive && (
                  <span className="text-sm absolute -bottom-5 left-1/2 transform -translate-x-1/2">
                    {formatSeconds()}
                  </span>
                )}
              </div>
              
              {isActive && (
                <>
                  <div className="mt-6 text-gray-400">
                    Remaining
                  </div>
                  <div className="text-lg text-white">
                    {formatRemainingTime()}
                  </div>
                </>
              )}
            </div>
          </CircularProgressBar>
        </div>
        
        {isActive ? (
          <Button
            onClick={endFast}
            className="w-full py-6 mt-4 bg-fast-orange hover:bg-fast-orange/90 rounded-full text-white font-medium text-lg"
            variant="default"
          >
            End Fast
          </Button>
        ) : (
          <Button
            onClick={startFast}
            className="w-full py-6 mt-4 bg-fast-orange hover:bg-fast-orange/90 rounded-full text-white font-medium text-lg"
            variant="default"
          >
            Start Fast
          </Button>
        )}
        
        {isActive && (
          <div className="w-full flex justify-between mt-8 px-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-gray-400">
                <Calendar size={16} />
                <span className="text-sm">Start</span>
              </div>
              <div className="font-medium">{startTimeFormatted.date}</div>
              <div>{startTimeFormatted.time}</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-gray-400">
                <Calendar size={16} />
                <span className="text-sm">End</span>
              </div>
              <div className="font-medium">{endTimeFormatted.date}</div>
              <div>{endTimeFormatted.time}</div>
            </div>
          </div>
        )}
        
        <FastingTips currentStage={currentStage} />
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-900 pt-2 pb-6">
        <div className="flex justify-around items-center">
          <div className="flex flex-col items-center text-fast-orange">
            <div className="p-2 bg-fast-orange/10 rounded-md">
              <Flame size={20} />
            </div>
            <span className="text-sm mt-1">Fast</span>
          </div>
          
          <div className="flex flex-col items-center text-gray-500">
            <div className="p-2">
              <Calendar size={20} />
            </div>
            <span className="text-sm mt-1">Journal</span>
          </div>
          
          <div className="flex flex-col items-center text-gray-500">
            <div className="p-2">
              <CircleOff size={20} />
            </div>
            <span className="text-sm mt-1">Dashboard</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
