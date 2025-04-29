
import React from 'react';

interface CircularProgressBarProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  circleColor?: string;
  progressColor?: string;
  children?: React.ReactNode;
  markers?: Array<{
    position: number;
    icon?: React.ReactNode;
    isActive?: boolean;
  }>;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  size = 300,
  strokeWidth = 20,
  circleColor = "#333333",
  progressColor = "#FF5722",
  children,
  markers = [],
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Calculate coordinates for markers
  const getCoordinatesForPercent = (percent: number) => {
    const x = size / 2 + radius * Math.cos(2 * Math.PI * percent - Math.PI / 2);
    const y = size / 2 + radius * Math.sin(2 * Math.PI * percent - Math.PI / 2);
    return { x, y };
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          className="transition-all duration-300"
          stroke={circleColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        
        {/* Progress arc with gradient */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF5722" />
            <stop offset="100%" stopColor="#E91E63" />
          </linearGradient>
        </defs>
        
        <circle
          className="progress-ring-circle transition-all duration-300"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        
        {/* Marker circles on the progress ring */}
        {markers.map((marker, index) => {
          const percent = marker.position / 100;
          const coords = getCoordinatesForPercent(percent);
          
          return (
            <g key={index}>
              <circle
                cx={coords.x}
                cy={coords.y}
                r={strokeWidth / 2}
                fill={marker.isActive ? "rgba(30,30,30,0.8)" : "rgba(60,60,60,0.5)"}
                stroke={marker.isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)"}
                strokeWidth={2}
              />
              <foreignObject
                x={coords.x - strokeWidth / 2}
                y={coords.y - strokeWidth / 2}
                width={strokeWidth}
                height={strokeWidth}
              >
                <div className="h-full w-full flex items-center justify-center">
                  {marker.icon}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default CircularProgressBar;
