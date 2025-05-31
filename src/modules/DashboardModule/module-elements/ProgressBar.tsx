'use client';

import { useEffect, useState } from 'react';

interface ProgressBarProps {
  currentStep?: number;
  totalSteps?: number;
}

export default function ProgressBar({ 
  currentStep = 1, 
  totalSteps = 4
}: ProgressBarProps) {
  const [animatedStep, setAnimatedStep] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStep(currentStep);
    }, 150);
    
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="flex items-center gap-2 w-full">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= animatedStep;
        
        return (
          <div
            key={index}
            className={`
              h-2 flex-1 rounded-full transition-all duration-500 ease-out
              ${isActive 
                ? 'primary-gradient-bg shadow-sm' 
                : 'bg-gray-200'
              }
            `}
            style={{
              transitionDelay: isActive ? `${index * 100}ms` : '0ms'
            }}
          />
        );
      })}
    </div>
  );
}