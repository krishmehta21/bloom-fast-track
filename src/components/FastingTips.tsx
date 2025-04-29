
import { Droplet, Zap, Clock, Heart } from "lucide-react";

interface FastingTipsProps {
  currentStage: number;
}

const FastingTips: React.FC<FastingTipsProps> = ({ currentStage }) => {
  // Tips based on fasting stage
  const tips = [
    {
      title: "Stay hydrated",
      content: "Drink plenty of water throughout your fasting period to stay hydrated and help manage hunger and fatigue.",
      icon: Droplet,
      color: "blue",
    },
    {
      title: "Mindful activity",
      content: "During longer fasts, consider light exercise like walking or gentle yoga instead of high-intensity workouts.",
      icon: Heart,
      color: "pink",
    },
    {
      title: "Break your fast gently",
      content: "When ending your fast, start with small portions of easily digestible foods rather than a large meal.",
      icon: Clock,
      color: "purple",
    },
    {
      title: "Keep electrolytes balanced",
      content: "Consider adding a pinch of salt to your water during extended fasts to maintain electrolyte balance.",
      icon: Zap,
      color: "yellow",
    }
  ];

  // Get tip based on current stage
  const currentTip = tips[currentStage % tips.length];

  // Map color to tailwind classes
  const colorMap: Record<string, string> = {
    blue: "text-blue-400",
    green: "text-green-400",
    yellow: "text-yellow-400",
    purple: "text-purple-400",
    pink: "text-pink-400"
  };
  
  const iconColorClass = colorMap[currentTip.color] || "text-blue-400";

  return (
    <div className="mt-8 w-full px-2 animate-fade-in" style={{animationDelay: "0.7s"}}>
      <h2 className="flex items-center gap-2 text-xl font-semibold text-yellow-400 mb-3 px-2">
        <span className="text-yellow-400">💡</span> Fasting Tips
      </h2>
      
      <div className="bg-black/40 rounded-xl p-5 glass-card animate-scale-in" style={{animationDelay: "0.8s"}}>
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-full bg-black/40 ${iconColorClass} animate-float`}>
            <currentTip.icon size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">{currentTip.title}</h3>
            <p className="text-gray-300 mt-2 leading-relaxed">{currentTip.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastingTips;
