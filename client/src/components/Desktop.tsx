import React, {useEffect} from "react";
import { useWindowManager } from '../hooks/useWindowManager';
import Window from './Window';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import StartMenu from './StartMenu';
import { useState } from 'react';
import { Project } from '../lib/types';

// App components
import Projects from './apps/Projects';
import MyComputer from './apps/MyComputer';
import Winamp from './apps/Winamp';

// Import desktop icons
import computerIcon from '../assets/icons/computer.svg';
import directoryIcon from '../assets/icons/directory.svg';
import notepadIcon from '../assets/icons/notepad.svg';
import msnIcon from '../assets/icons/msn.svg';
import recycleIcon from '../assets/icons/recycle.svg';
import musicIcon from '../assets/icons/app-icon--music-player-.png';

interface DesktopProps {
  projects: Project[];
}

export default function Desktop({ projects }: DesktopProps) {

  const renderWindowContent = (window: any) => {
    console.log(window);
    switch (window.type) {
      case 'projects':
        return <Projects projects={projects} onOpenProject={handleOpenProject} />;
      case 'computer':
        return <MyComputer />;
      case 'winamp':
        return (<Winamp />);
      default:
        return <div className="p-4">Unknown application type: {window.type}</div>;
    }
  };

  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
    handlePositionChange
  } = useWindowManager();

  const [showStartMenu, setShowStartMenu] = useState(false);

  const playSound = () => {
    const audio = new Audio('/src/assets/sounds/close.mp3');
    audio.play();
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const startMenu = document.getElementById('start-menu');
      const startButton = document.getElementById('start-button');

      if (startMenu && !startMenu.contains(event.target as Node) &&
          startButton && !startButton.contains(event.target as Node)) {
        setShowStartMenu(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const handleOpenProject = (project: Project) => {
    const appType = `${project.demoUrl}` as any;
    openWindow(appType);
  };



  return (
    <div 
      className="h-full w-full relative overflow-hidden"
      style={{
        backgroundImage: `url('/src/assets/wallpaper-cat.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 right-4 flex flex-col gap-4">

      <DesktopIcon
          icon={computerIcon}
          label="X"
          onDoubleClick={() => {
            window.open('https://x.com', '_blank');
          }}
        />

        <DesktopIcon
          icon={computerIcon}
          label="YouTube"
          onDoubleClick={() => {
            window.open('https://YouTube.com', '_blank');
          }}
        />

        <DesktopIcon
          icon={computerIcon}
          label="Web Page"
          onDoubleClick={() => {
            window.open('https://ivnkhr.com', '_blank');
          }}
        />

      </div>
      <div className="absolute top-4 left-4 flex flex-col gap-4">
        <DesktopIcon
          icon={computerIcon}
          label="My Computer"
          onDoubleClick={() => openWindow('computer')}
        />
        <DesktopIcon
          icon={directoryIcon}
          label="My Projects"
          onDoubleClick={() => openWindow('projects')}
        />
        <DesktopIcon
          icon={notepadIcon}
          label="My CV"
          onDoubleClick={() => openWindow('cv')}
        />
        <DesktopIcon
          icon={msnIcon}
          label="Contact"
          onDoubleClick={() => openWindow('contacts')}
        />
        <DesktopIcon
          icon={musicIcon}
          label="Audio Player"
          onDoubleClick={() => openWindow('winamp')}
        />
      </div>

      {/* Windows */}
      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          icon={window.icon}
          position={window.position}
          size={window.size}
          isMinimized={window.isMinimized}
          isMaximized={window.isMaximized}
          zIndex={window.zIndex}
          renderType={window.renderType}
          iframeUrl={window.iframeUrl}
          isActive={activeWindowId === window.id}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onBringToFront={() => bringToFront(window.id)}
          onPositionChange={(position, size, isMaximized) => 
            handlePositionChange(window.id, position, size, isMaximized)
          }
        >
          {renderWindowContent(window)}
        </Window>
      ))}

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu
          onClose={() => setShowStartMenu(false)}
          onOpenApp={(appType) => {
            openWindow(appType);
            setShowStartMenu(false);
          }}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowClick={(id) => {
          const window = windows.find(w => w.id === id);
          if (window?.isMinimized) {
            minimizeWindow(id);
          } else {
            bringToFront(id);
          }
        }}
        onStartClick={() => { setShowStartMenu(!showStartMenu); playSound(); }}
        isStartMenuOpen={showStartMenu}
      />
    </div>
  );
}