
import React from 'react';

const AIVisualizer: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="iso-ring w-64 h-64 flex items-center justify-center animate-pulse-glow">
          <div className="iso-ring w-48 h-48 flex items-center justify-center animate-pulse-glow">
            <div className="iso-ring w-32 h-32 flex items-center justify-center animate-rotate-slow">
              <div className="bg-iso-accent text-iso-dark rounded-full w-24 h-24 flex items-center justify-center font-mono text-xl font-bold animate-pulse-glow">
                27001
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 bg-iso-dark bg-opacity-70 px-3 py-1 rounded-full">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-xs text-iso-text">Ready</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AIVisualizer;
