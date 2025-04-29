
import { useState } from "react";
import Layout from "../components/Layout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useFasting } from "../contexts/FastingContext";
import { ArrowUp, Award, Clock, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DashboardPage = () => {
  const { sessions, targetHours, setTargetHours } = useFasting();
  const { user } = useAuth();
  const [fastingPlan, setFastingPlan] = useState("16:8");
  
  // Calculate stats
  const longestFast = sessions.reduce((max, session) => Math.max(max, session.duration), 0);
  const averageFast = sessions.length > 0
    ? sessions.reduce((sum, session) => sum + session.duration, 0) / sessions.length
    : 0;
  
  // Prepare weekly data for chart
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date,
      hours: 0
    };
  });
  
  sessions.forEach(session => {
    const sessionDate = new Date(session.startTime);
    const dayIndex = last7Days.findIndex(day => 
      day.date.getDate() === sessionDate.getDate() &&
      day.date.getMonth() === sessionDate.getMonth() &&
      day.date.getFullYear() === sessionDate.getFullYear()
    );
    
    if (dayIndex !== -1) {
      last7Days[dayIndex].hours = session.duration;
    }
  });
  
  // Current streak calculation
  let currentStreak = 0;
  let checking = true;
  let currentDate = new Date();
  
  while (checking && currentStreak < sessions.length) {
    // Check if there's a session for the current date being checked
    const hasFastedToday = sessions.some(session => {
      const sessionDate = new Date(session.startTime);
      return (
        sessionDate.getDate() === currentDate.getDate() &&
        sessionDate.getMonth() === currentDate.getMonth() &&
        sessionDate.getFullYear() === currentDate.getFullYear()
      );
    });
    
    if (hasFastedToday) {
      currentStreak++;
      // Move to previous day
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      checking = false;
    }
  }
  
  return (
    <Layout>
      <div className="space-y-8 py-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and set goals</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2 p-2 bg-bloom-purple/10 rounded-full text-bloom-purple">
                  <ArrowUp size={16} />
                </div>
                <div className="text-2xl font-bold">{currentStreak} days</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Longest Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2 p-2 bg-bloom-green rounded-full text-accent-foreground">
                  <Award size={16} />
                </div>
                <div className="text-2xl font-bold">{longestFast.toFixed(1)}h</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2 p-2 bg-bloom-blue rounded-full text-blue-700">
                  <Clock size={16} />
                </div>
                <div className="text-2xl font-bold">{averageFast.toFixed(1)}h</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Fasts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2 p-2 bg-bloom-purple-light rounded-full text-bloom-purple-dark">
                  <Target size={16} />
                </div>
                <div className="text-2xl font-bold">{sessions.length}</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={last7Days}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      dx={-10}
                    />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#9b87f5" 
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#9b87f5" }}
                      activeDot={{ r: 6, fill: "#7E69AB" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Settings & Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="plan">
                <TabsList className="w-full">
                  <TabsTrigger value="plan" className="flex-1">Fasting Plan</TabsTrigger>
                  <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
                </TabsList>
                
                <TabsContent value="plan" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="fasting-plan">Select Fasting Plan</Label>
                    <Select 
                      value={fastingPlan} 
                      onValueChange={setFastingPlan}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fasting plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="16:8">16:8 (16h fast, 8h eating)</SelectItem>
                        <SelectItem value="18:6">18:6 (18h fast, 6h eating)</SelectItem>
                        <SelectItem value="20:4">20:4 (20h fast, 4h eating)</SelectItem>
                        <SelectItem value="OMAD">OMAD (One Meal A Day)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="target-hours">Target Hours</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="target-hours"
                        type="number" 
                        min={1} 
                        max={72} 
                        value={targetHours}
                        onChange={(e) => setTargetHours(parseInt(e.target.value))} 
                        className="w-20" 
                      />
                      <span className="text-sm self-center">hours</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-bloom-purple hover:bg-bloom-purple-dark">
                    Save Settings
                  </Button>
                </TabsContent>
                
                <TabsContent value="profile" className="space-y-4 mt-4">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>{user?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="font-medium">{user?.name}</h3>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="user-name">Display Name</Label>
                    <Input id="user-name" defaultValue={user?.name} />
                  </div>
                  
                  <Button className="w-full bg-bloom-purple hover:bg-bloom-purple-dark">
                    Update Profile
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
