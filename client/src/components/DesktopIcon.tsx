import React from 'react';

interface DesktopIconProps {
  title: string;
  icon: string;
  onDoubleClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ title, icon, onDoubleClick }) => {
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDoubleClick();
  };

  return (
    <div 
      className="desktop-icon w-[75px] h-[80px] flex flex-col items-center text-center select-none cursor-pointer"
      onDoubleClick={handleDoubleClick}
    >
      <img src={icon} alt={title} className="w-8 h-8 mb-1" />
      <div className="text-white text-xs leading-tight shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">
        {title}
      </div>
    </div>
  );
};

export default DesktopIcon;
