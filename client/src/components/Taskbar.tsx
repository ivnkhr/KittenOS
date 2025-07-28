import React, { useState, useEffect } from 'react';
import TaskbarButton from './TaskbarButton';
import { WindowState } from '../lib/types';

// Import SVG icons
import startIcon from '../assets/os.png';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  isStartMenuOpen: boolean;
}

const Taskbar: React.FC<TaskbarProps> = ({ 
  windows, 
  activeWindowId,
  onWindowClick,
  onStartClick,
  isStartMenuOpen
}) => {
  const [time, setTime] = useState<string>(getCurrentTime());

  function getCurrentTime(): string {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    return `${hours}:${minutes} ${ampm}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-7 bg-[#C0C0C0] flex items-center border-t-2 border-[#FFFFFF] z-10">
      {/* Start Button */}
      <button 
        id="start-button"
        className={`h-5 px-2 mx-1 border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] flex items-center ${isStartMenuOpen ? 'border-t-black border-l-black border-b-white border-r-white' : ''}`}
        onClick={onStartClick}
      >
        <img src={startIcon} alt="Start" className="mr-1 h-4 w-4" />
        <span className="font-bold text-xs">Start</span>
      </button>
      
      <div className="border-l border-[#808080] mx-1 h-5"></div>
      
      {/* Taskbar buttons */}
      <div className="flex-1 flex items-center overflow-x-auto">
        {windows.map(window => (
          <TaskbarButton
            key={window.id}
            title={window.title}
            icon={window.icon}
            isActive={activeWindowId === window.id && !window.isMinimized}
            onClick={() => onWindowClick(window.id)}
          />
        ))}
      </div>
      
      {/* System tray / Clock */}
      <div className="flex items-center border-[2px] border-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF] bg-[#C0C0C0] px-1 h-5 mr-1">
        <span id="clock" className="text-xs">{time}</span>
      </div>
    </div>
  );
};

export default Taskbar;
