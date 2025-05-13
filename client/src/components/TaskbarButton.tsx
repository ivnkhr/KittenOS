import React from 'react';

interface TaskbarButtonProps {
  title: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

const TaskbarButton: React.FC<TaskbarButtonProps> = ({ title, icon, isActive, onClick }) => {
  const borderClasses = isActive 
    ? "border-[2px] border-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF] bg-[#D4D0C8]" 
    : "border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080]";

  return (
    <button 
      className={`h-5 px-2 mx-1 flex items-center truncate min-w-[80px] max-w-[150px] ${borderClasses}`}
      onClick={onClick}
    >
      <img src={icon} alt={title} className="mr-1 h-4 w-4" />
      <span className="truncate text-xs">{title}</span>
    </button>
  );
};

export default TaskbarButton;
