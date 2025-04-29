
import { Droplet } from "lucide-react";

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
    },
    {
      title: "Avoid intense exercise",
      content: "During longer fasts, consider light exercise like walking or gentle yoga instead of high-intensity workouts.",
      icon: Droplet,
    },
    {
      title: "Break your fast gently",
      content: "When ending your fast, start with small portions of easily digestible foods rather than a large meal.",
      icon: Droplet,
    }
  ];

  // Get tip based on current stage
  const currentTip = tips[currentStage % tips.length];

  return (
    <div className="mt-8 px-4">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-yellow-400 mb-3">
        <span className="text-yellow-400">💡</span> Tips
      </h2>
      
      <div className="bg-black/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="text-fast-orange p-1">
            <currentTip.icon size={22} className="text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{currentTip.title}</h3>
            <p className="text-gray-300 text-sm mt-1">{currentTip.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastingTips;
