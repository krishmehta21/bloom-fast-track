
import { Circle, Target, Clock } from "lucide-react";

interface FastingStageProps {
  currentStage: number;
}

const FastingStages: React.FC<FastingStageProps> = ({ currentStage }) => {
  const stages = [
    {
      name: "Fat Burning",
      description: "Your body is burning stored fat for energy",
      hours: "4-12 hours",
      icon: Circle,
      active: currentStage >= 1,
    },
    {
      name: "Ketosis",
      description: "Your liver is producing ketone bodies",
      hours: "12-24 hours",
      icon: Target,
      active: currentStage >= 2,
    },
    {
      name: "Autophagy",
      description: "Your cells are removing damaged components",
      hours: "24+ hours",
      icon: Clock,
      active: currentStage >= 3,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stages.map((stage, index) => (
        <div
          key={stage.name}
          className={`p-4 rounded-xl transition-all duration-300 ${
            stage.active
              ? "bg-white shadow-lg border border-bloom-purple-light"
              : "bg-white/50 border border-gray-100"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-full ${
                stage.active
                  ? "bg-bloom-purple text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <stage.icon size={18} />
            </div>
            <div>
              <h3 className="font-medium text-sm">{stage.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {stage.description}
              </p>
              <p
                className={`text-xs font-medium mt-2 ${
                  stage.active ? "text-bloom-purple-dark" : "text-muted-foreground"
                }`}
              >
                {stage.hours}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FastingStages;
