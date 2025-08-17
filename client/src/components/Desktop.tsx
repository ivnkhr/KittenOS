import React, {useEffect, useState} from "react";
import MatrixCanvas from './MatrixCanvas';
import { useWindowManager } from '../hooks/useWindowManager';
import Window from './Window';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import StartMenu from './StartMenu';
import { Project } from '../lib/types';

// App components
import Projects from './apps/Projects';
import MyComputer from './apps/MyComputer';
import Winamp from './apps/Winamp';

// Import desktop icons
import computerIcon from '../assets/icons/win96/pc.png';
import directoryIcon from '../assets/icons/win96/projects.png';
import notepadIcon from '../assets/icons/win96/cv.png';
import msnIcon from '../assets/icons/win96/contacts.png';
import musicIcon from '../assets/icons/win96/music.png';

import wallpaper0 from '../assets/wallpaper-cat-0.jpg';
import wallpaper1 from '../assets/wallpaper-cat-1.jpg';
import wallpaper2 from '../assets/wallpaper-cat-2.jpg';

interface DesktopProps {
  projects: Project[];
  onShutdown: () => void;
  animationState: string;
}

export default function Desktop({ projects, onShutdown, animationState }: DesktopProps) {

  const wallpapers = [wallpaper0, wallpaper1, wallpaper2];
  const [activeWallpaperIndex, setActiveWallpaperIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWallpaperIndex((prevIndex) => (prevIndex + 1) % wallpapers.length);
    }, 7000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [wallpapers.length]);

  
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
 
  useEffect(() => {
    openWindow('winamp');

    // Preload images
    wallpapers.forEach(wallpaper => {
      const img = new Image();
      img.src = wallpaper;
    });
  }, []);

  useEffect(() => {
    if (animationState === 'shutting-down') {
      const winampWindow = windows.find(window => window.type === 'winamp');
      if (winampWindow) {
        closeWindow(winampWindow.id);
      }
    }
  }, [animationState, windows, closeWindow]);

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
      className="h-full w-full relative overflow-hidden main-desktop-background"
    >
      {/* Wallpaper Container */}
      <div className="absolute inset-0 z-0">
        {wallpapers.map((wallpaper, index) => (
          <img
            key={index}
            src={wallpaper}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === activeWallpaperIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <MatrixCanvas />
      {/* Desktop Icons */}
      <div className="absolute top-4 right-4 flex flex-col gap-4">
        KittenOS v.0.0.1
      </div>
      <div className="absolute top-4 left-4 flex flex-col gap-4">
        <DesktopIcon
          icon={computerIcon}
          label="My Computer"
          onDoubleClick={() => openWindow('computer')}
        />

        <DesktopIcon
          icon={notepadIcon}
          label="My CV"
          onDoubleClick={() => openWindow('cv')}
        />
        <DesktopIcon
          icon={directoryIcon}
          label="My Projects"
          onDoubleClick={() => openWindow('projects')}
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
          onShutdown={onShutdown}
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