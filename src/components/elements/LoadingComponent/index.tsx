"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LoadingComponentProps = {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  showText?: boolean;
  variant?: "bounce" | "pulse" | "float" | "wiggle";
  className?: string;
  speed?: "slow" | "normal" | "fast";
  withDots?: boolean;
  withSpinner?: boolean;
};

const sizePx = {
  sm: 64,
  md: 96,
  lg: 128,
  xl: 176,
};

const LoadingComponent = ({
                            size = "md",
                            text = "Loading...",
                            showText = true,
                            variant = "bounce",
                            className,
                            speed = "normal",
                            withDots = true,
                            withSpinner = false,
                          }: LoadingComponentProps) => {
  const [imageError, setImageError] = useState(false);

  // Size configurations
  const sizeConfig = {
    sm: {
      container: "w-20 h-20",
      image: "w-16 h-16",
      text: "text-sm",
      dots: "w-1 h-1",
      spinner: "w-4 h-4",
    },
    md: {
      container: "w-28 h-28",
      image: "w-24 h-24",
      text: "text-base",
      dots: "w-1.5 h-1.5",
      spinner: "w-5 h-5",
    },
    lg: {
      container: "w-36 h-36",
      image: "w-32 h-32",
      text: "text-lg",
      dots: "w-2 h-2",
      spinner: "w-6 h-6",
    },
    xl: {
      container: "w-48 h-48",
      image: "w-44 h-44",
      text: "text-xl",
      dots: "w-2.5 h-2.5",
      spinner: "w-8 h-8",
    },
  };

  // Speed configurations
  const speedConfig = {
    slow: "duration-1000",
    normal: "duration-700",
    fast: "duration-500",
  };

  // Animation variants
  const getAnimationClass = () => {
    const speedClass = speedConfig[speed];

    switch (variant) {
      case "bounce":
        return `animate-bounce ${speedClass}`;
      case "pulse":
        return `animate-pulse ${speedClass}`;
      case "float":
        return `animate-[float_2s_ease-in-out_infinite] ${speedClass}`;
      case "wiggle":
        return `animate-[wiggle_1s_ease-in-out_infinite] ${speedClass}`;
      default:
        return `animate-bounce ${speedClass}`;
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      {/* Mascot Container */}
      <div className={cn("relative flex items-center justify-center", sizeConfig[size].container)}>
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse" />

        {/* Mascot Image */}
        <div className={cn("relative z-10", getAnimationClass())}>
          {!imageError ? (
            <Image
              src="/VariantAbe.png"
              alt="Nusa Loading"
              width={sizePx[size]}
              height={sizePx[size]}
              className={cn(
                sizeConfig[size].image,
                "object-contain filter drop-shadow-lg transition-all duration-300"
              )}
              onError={() => setImageError(true)}
              priority
              unoptimized
            />
          ) : (
            // Fallback SVG
            <div className={cn("flex items-center justify-center", sizeConfig[size].image)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 120"
                className={cn(sizeConfig[size].image, "text-green-600")}
                fill="currentColor"
              >
                {/* Simple bear SVG */}
                <circle cx="50" cy="50" r="30" fill="#10b981" />
                <circle cx="35" cy="30" r="8" fill="#10b981" />
                <circle cx="65" cy="30" r="8" fill="#10b981" />
                <circle cx="35" cy="45" r="3" fill="#065f46" />
                <circle cx="65" cy="45" r="3" fill="#065f46" />
                <path
                  d="M 40 58 Q 50 66 60 58"
                  stroke="#065f46"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <ellipse cx="50" cy="90" rx="25" ry="20" fill="#10b981" />
                <rect x="48" y="85" width="4" height="12" fill="white" rx="1" />
                <rect x="44" y="89" width="12" height="4" fill="white" rx="1" />
              </svg>
            </div>
          )}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 right-4 w-2 h-2 bg-green-400/60 rounded-full animate-ping delay-300" />
          <div className="absolute bottom-4 left-2 w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-ping delay-700" />
          <div className="absolute top-1/2 left-1 w-1 h-1 bg-yellow-400/60 rounded-full animate-ping delay-1000" />
        </div>
      </div>

      {/* Loading Text */}
      {showText && (
        <div className="text-center space-y-2">
          <p
            className={cn(
              "font-medium bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent",
              sizeConfig[size].text
            )}
          >
            {text}
          </p>

          {/* Loading dots */}
          {withDots && (
            <div className="flex items-center justify-center space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse",
                    sizeConfig[size].dots
                  )}
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>
          )}

          {/* Spinner */}
          {withSpinner && (
            <div className="flex justify-center">
              <div
                className={cn(
                  "border-2 border-green-200 border-t-green-600 rounded-full animate-spin",
                  sizeConfig[size].spinner
                )}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoadingComponent;
