import React from "react";
import { motion } from "framer-motion";

/**
 * Animated Blood Donation Illustration
 * Replaces static GIF with fully animated, customizable component
 * Features: 3D blood bag, flowing animation, orbital particles, glassmorphism
 */
const AnimatedBloodDonation = ({ size = "large" }) => {
  const sizes = {
    small: { width: 200, height: 250 },
    medium: { width: 300, height: 375 },
    large: { width: 400, height: 500 },
  };

  const dimensions = sizes[size] || sizes.large;

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-400 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Orbiting Blood Cells */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`cell-${i}`}
          className="absolute w-3 h-3 bg-red-400 rounded-full"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, Math.cos(i * 45 * Math.PI / 180) * 120],
            y: [0, Math.sin(i * 45 * Math.PI / 180) * 120],
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating Heart Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-2xl"
          style={{
            left: `${20 + i * 15}%`,
            top: `${80}%`,
          }}
          animate={{
            y: [0, -200],
            opacity: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut"
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Main SVG Illustration */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="bagGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#fef2f2', stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: '#fee2e2', stopOpacity: 0.95 }} />
          </linearGradient>

          <linearGradient id="bloodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#991b1b', stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="tubeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#e5e7eb', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#f3f4f6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#e5e7eb', stopOpacity: 1 }} />
          </linearGradient>

          {/* Shadow Filter */}
          <filter id="bagShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8"/>
            <feOffset dx="0" dy="10" result="offsetblur"/>
            <feFlood floodColor="#991b1b" floodOpacity="0.3"/>
            <feComposite in2="offsetblur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Blood Bag Container */}
        <g filter="url(#bagShadow)">
          {/* Bag Body */}
          <rect
            x="120"
            y="150"
            width="160"
            height="240"
            rx="15"
            fill="url(#bagGrad)"
            stroke="#dc2626"
            strokeWidth="3"
          >
            <animate
              attributeName="opacity"
              from="0"
              to="1"
              dur="0.8s"
              fill="freeze"
            />
          </rect>

          {/* Blood Level (Animated Fill) */}
          <rect
            x="125"
            y="160"
            width="150"
            height="230"
            rx="10"
            fill="url(#bloodGrad)"
          >
            <animate
              attributeName="height"
              values="0;230;0"
              dur="6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              values="350;160;350"
              dur="6s"
              repeatCount="indefinite"
            />
          </rect>

          {/* Blood Surface Wave */}
          <path
            fill="#dc2626"
            opacity="0.5"
          >
            <animate
              attributeName="d"
              values="M125,160 Q150,155 175,160 T225,160 L225,165 L125,165 Z;M125,160 Q150,165 175,160 T225,160 L225,165 L125,165 Z;M125,160 Q150,155 175,160 T225,160 L225,165 L125,165 Z"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>

          {/* Measurement Lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={`line-${i}`}>
              <line
                x1="115"
                y1={200 + i * 40}
                x2="130"
                y2={200 + i * 40}
                stroke="#dc2626"
                strokeWidth="2"
              />
              <text
                x="105"
                y={205 + i * 40}
                fontSize="12"
                fill="#991b1b"
                fontWeight="bold"
                textAnchor="end"
              >
                {500 - i * 100}ml
              </text>
            </g>
          ))}

          {/* Medical Cross Symbol */}
          <g transform="translate(200, 250)">
            <rect
              x="-4"
              y="-20"
              width="8"
              height="40"
              rx="2"
              fill="white"
            />
            <rect
              x="-20"
              y="-4"
              width="40"
              height="8"
              rx="2"
              fill="white"
            />
          </g>

          {/* Tube/Pipe */}
          <path
            d="M200,150 Q200,100 220,80 L230,80"
            stroke="url(#tubeGrad)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="1000"
              to="0"
              dur="1.5s"
              begin="0.5s"
              fill="freeze"
            />
          </path>

          {/* Flowing Blood in Tube */}
          <circle
            r="4"
            fill="#dc2626"
          >
            <animateMotion dur="2s" repeatCount="indefinite">
              <mpath href="#tubePath"/>
            </animateMotion>
          </circle>

          <path
            id="tubePath"
            d="M200,150 Q200,100 220,80 L230,80"
            fill="none"
          />

          {/* Connector/Needle */}
          <g opacity="1">
            <animate
              attributeName="opacity"
              from="0"
              to="1"
              dur="1s"
              begin="1s"
              fill="freeze"
            />
            <rect
              x="230"
              y="75"
              width="40"
              height="10"
              rx="3"
              fill="#9ca3af"
              stroke="#6b7280"
              strokeWidth="1"
            />
            <polygon
              points="270,75 285,80 270,85"
              fill="#6b7280"
            />
          </g>
        </g>

        {/* Sparkles/Stars */}
        {[...Array(8)].map((_, i) => (
          <g key={`sparkle-${i}`}>
            <circle
              cx={100 + (i * 40)}
              cy={100 + (i % 3) * 100}
              r="2"
              fill="#fbbf24"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="0;3;0"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Glassmorphism Info Card */}
        <g opacity="1">
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="0.5s"
            begin="2s"
            fill="freeze"
          />
          <rect
            x="50"
            y="420"
            width="300"
            height="60"
            rx="12"
            fill="white"
            fillOpacity="0.2"
            stroke="white"
            strokeOpacity="0.3"
            strokeWidth="2"
          />
          <text
            x="200"
            y="445"
            fontSize="18"
            fontWeight="bold"
            fill="#991b1b"
            textAnchor="middle"
          >
            💉 Blood Donation
          </text>
          <text
            x="200"
            y="465"
            fontSize="14"
            fill="#dc2626"
            textAnchor="middle"
          >
            Every Drop Saves Lives ❤️
          </text>
        </g>

        {/* Pulsing Glow Ring - Perfectly centered around blood bag */}
        <circle
          cx="200"
          cy="270"
          r="155"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          opacity="0.3"
        >
          <animate
            attributeName="r"
            values="155;185;155"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Orbiting Plus Signs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`plus-${i}`}
          className="absolute text-3xl font-bold text-red-400 opacity-30"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, Math.cos(i * 90 * Math.PI / 180) * 140],
            y: [0, Math.sin(i * 90 * Math.PI / 180) * 140],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
        >
          +
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedBloodDonation;