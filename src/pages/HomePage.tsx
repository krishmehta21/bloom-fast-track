
import { useEffect } from "react";
import Layout from "../components/Layout";
import CircularProgressBar from "../components/CircularProgressBar";
import FastingStages from "../components/FastingStages";
import FastingHistory from "../components/FastingHistory";
import { useFasting } from "../contexts/FastingContext";
import { Button } from "@/components/ui/button";
import { Play, Square } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HomePage = () => {
  const {
    isActive,
    startFast,
    endFast,
    formatTimeLeft,
    progress,
    currentStage,
    sessions,
    elapsedTime
  } = useFasting();
  
  // Calculate total time spent fasting this week
  const weeklyTotal = sessions
    .filter(session => {
      const now = new Date();
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      return new Date(session.startTime) >= weekAgo;
    })
    .reduce((acc, session) => acc + session.duration, 0);
  
  // Calculate total time spent fasting all-time
  const allTimeTotal = sessions.reduce((acc, session) => acc + session.duration, 0);

  return (
    <Layout>
      <div className="space-y-8 py-4">
        <div>
          <h1 className="text-3xl font-bold">Fast Timer</h1>
          <p className="text-muted-foreground">Track your fasting progress</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="glass-card rounded-2xl p-8 mb-6 flex flex-col items-center justify-center">
              <CircularProgressBar progress={progress}>
                <div className="text-center">
                  <div className="text-4xl font-bold">{formatTimeLeft()}</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {isActive ? "Remaining" : "Target time"}
                  </div>
                </div>
              </CircularProgressBar>
              
              <div className="mt-8 flex gap-4">
                {!isActive ? (
                  <Button
                    onClick={startFast}
                    size="lg"
                    className="bg-bloom-purple hover:bg-bloom-purple-dark"
                  >
                    <Play size={18} className="mr-2" />
                    Start Fast
                  </Button>
                ) : (
                  <Button
                    onClick={endFast}
                    size="lg"
                    variant="outline"
                    className="border-bloom-purple text-bloom-purple hover:bg-bloom-purple hover:text-white"
                  >
                    <Square size={18} className="mr-2" />
                    End Fast
                  </Button>
                )}
              </div>
              
              <div className="mt-8 w-full">
                <h3 className="font-semibold mb-4">Fasting Stages</h3>
                <FastingStages currentStage={currentStage} />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Weekly Total</p>
                    <p className="text-2xl font-bold">{weeklyTotal.toFixed(1)}h</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">All-time Total</p>
                    <p className="text-2xl font-bold">{allTimeTotal.toFixed(1)}h</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Fasts Completed</p>
                    <p className="text-2xl font-bold">{sessions.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <FastingHistory sessions={sessions.slice(0, 5)} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
