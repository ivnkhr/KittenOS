import React from "react";
import { AppType } from '../lib/types';

// Import SVG icons
import computerIcon from '../assets/os.png';
import cvIcon from '../assets/icons/cv.svg';
import projectsIcon from '../assets/icons/directory.svg';
import contactsIcon from '../assets/icons/msn.svg';
import helpIcon from '../assets/icons/help.svg';
import runIcon from '../assets/icons/run.svg';
import shutdownIcon from '../assets/icons/shutdown.svg';

interface StartMenuProps {
  onClose: () => void;
  onOpenApp: (appType: AppType) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose, onOpenApp }) => {
  return (
    <div 
      id="start-menu" 
      className="start-menu absolute left-0 bottom-7 w-[180px] border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] bg-[#C0C0C0] z-10"
    >
      <div className="flex bg-[#000080] text-white p-1 items-center">
        <img src={computerIcon} alt="Windows 96" className="mr-2 h-6 w-6" />
        <div className="font-bold text-sm">KittenOS</div>
      </div>
      
      <div className="border-t border-[#808080]">
        <div 
          className="flex items-center p-1 hover:bg-[#000080] hover:text-white cursor-pointer" 
          onClick={() => { onOpenApp('cv'); onClose(); }}
        >
          <img src={cvIcon} alt="CV" className="mr-2 h-6 w-6" />
          <span className="text-sm">My CV</span>
        </div>
        
        <div 
          className="flex items-center p-1 hover:bg-[#000080] hover:text-white cursor-pointer" 
          onClick={() => { onOpenApp('projects'); onClose(); }}
        >
          <img src={projectsIcon} alt="Projects" className="mr-2 h-6 w-6" />
          <span className="text-sm">My Projects</span>
        </div>
        
        
        <div className="border-t border-[#808080] my-1"></div>
        
        <div 
          className="flex items-center p-1 hover:bg-[#000080] hover:text-white cursor-pointer" 
          onClick={() => { onOpenApp('computer'); onClose(); }}
        >
          <img src={helpIcon} alt="Help" className="mr-2 h-6 w-6" />
          <span className="text-sm">About</span>
        </div>
        
        <div className="border-t border-[#808080] my-1"></div>
        
        <div className="flex items-center p-1 hover:bg-[#000080] hover:text-white cursor-pointer" onClick={() => {onClose();}}>
          <img src={shutdownIcon} alt="Shut Down" className="mr-2 h-6 w-6" />
          <span className="text-sm">Shut Down...</span>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
