
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

interface FastingSession {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in hours
}

interface FastingHistoryProps {
  sessions: FastingSession[];
}

const FastingHistory: React.FC<FastingHistoryProps> = ({ sessions }) => {
  const formatDuration = (hours: number): string => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold mb-4">Fasting History</h3>
      
      {sessions.length === 0 ? (
        <p className="text-center text-muted-foreground py-4 text-sm">
          No fasting sessions recorded yet
        </p>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    {format(session.startTime, "MMMM d")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(session.startTime, "h:mm a")} - {format(session.endTime, "h:mm a")}
                  </p>
                </div>
                <div>
                  <span className="inline-block bg-bloom-green px-3 py-1 rounded-full text-xs font-medium text-accent-foreground">
                    {formatDuration(session.duration)}
                  </span>
                </div>
              </div>
              <Separator className="mt-3" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FastingHistory;
