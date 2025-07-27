import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Circuit Animation */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto">
            <svg viewBox="0 0 128 128" className="w-full h-full">
              {/* Outer Circuit Ring */}
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="2"
                strokeDasharray="8 4"
                className="animate-spin"
                style={{ animationDuration: '3s' }}
              />
              
              {/* Inner Circuit Ring */}
              <circle
                cx="64"
                cy="64"
                r="40"
                fill="none"
                stroke="url(#gradient2)"
                strokeWidth="1.5"
                strokeDasharray="6 3"
                className="animate-spin"
                style={{ animationDuration: '2s', animationDirection: 'reverse' }}
              />
              
              {/* Center GP */}
              <text
                x="64"
                y="74"
                textAnchor="middle"
                className="text-2xl font-bold fill-blue-400"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                GP
              </text>
              
              {/* Circuit Nodes */}
              <circle cx="64" cy="8" r="3" fill="#60A5FA" className="animate-pulse" />
              <circle cx="120" cy="64" r="3" fill="#34D399" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
              <circle cx="64" cy="120" r="3" fill="#F472B6" className="animate-pulse" style={{ animationDelay: '1s' }} />
              <circle cx="8" cy="64" r="3" fill="#FBBF24" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
              
              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="50%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#F472B6" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#60A5FA" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Gunj Patel</h2>
          <p className="text-gray-400">Loading Portfolio...</p>
          
          {/* Progress Bar */}
          <div className="w-64 h-1 bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;