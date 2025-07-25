import { useState, useEffect } from 'react';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import CV from './apps/CV';
import Projects from './apps/Projects';
import Contacts from './apps/Contacts';
import MyComputer from './apps/MyComputer';
import Winamp from './apps/Winamp';
import { useWindowManager } from '@/hooks/useWindowManager';
import { AppType } from '@/lib/types';

// Import SVG icons
import cvIcon from '@/assets/icons/cv.svg';
import projectsIcon from '@/assets/icons/directory.svg';
import contactsIcon from '@/assets/icons/msn.svg';
import computerIcon from '@/assets/icons/computer.svg';
import recycleIcon from '@/assets/icons/recycle.svg';

const Desktop = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, bringToFront, activeWindowId, handlePositionChange } = useWindowManager();

  // Close start menu when clicking on desktop
  const handleDesktopClick = (e: React.MouseEvent) => {
    // Get the targeted element
    const target = e.target as HTMLElement;

    // Don't close start menu if clicking on desktop icons
    if (target.closest('.desktop-icon')) {
      return;
    }

    // Check if the click is outside the start menu and start button
    if (isStartMenuOpen && !target.closest('#start-menu') && !target.closest('#start-button')) {
      setIsStartMenuOpen(false);
    }
  };

  // Toggle start menu
  const toggleStartMenu = () => {
    setIsStartMenuOpen(prev => !prev);
  };

  // Handle desktop icon double click
  const handleIconDoubleClick = (appType: AppType) => {
    openWindow(appType);
    setIsStartMenuOpen(false);
  };

  // Handle start menu item click
  const handleStartMenuItemClick = (appType: AppType) => {
    openWindow(appType);
    setIsStartMenuOpen(false);
  };

  // Display a welcome window when the application starts
  useEffect(() => {
    setTimeout(() => {
      openWindow('cv');
    }, 500);
  }, []);

  // Desktop icons configuration
  const desktopIcons = [
    { id: 'cv', title: 'My CV', icon: cvIcon, appType: 'cv' as AppType },
    { id: 'projects', title: 'Projects', icon: projectsIcon, appType: 'projects' as AppType },
    { id: 'contacts', title: 'Contacts', icon: contactsIcon, appType: 'contacts' as AppType },
    { id: 'winamp', title: 'Winamp', icon: computerIcon, appType: 'winamp' as AppType },
    { id: 'computer', title: 'My Computer', icon: computerIcon, appType: 'computer' as AppType },
    { id: 'recycle', title: 'Recycle Bin', icon: recycleIcon, appType: 'recycle' as AppType }
  ];

  // Handle project window opening
  const handleProjectOpen = (projectKey: string, projectUrl: string) => {
    openWindow(projectKey as AppType, projectUrl);
  };

  // Render app content based on type
  const renderAppContent = (type: AppType) => {
    switch (type) {
      case 'cv':
        return <CV />;
      case 'projects':
        return <Projects onProjectOpen={handleProjectOpen} />;
      case 'contacts':
        return <Contacts />;
      case 'winamp':
        return <Winamp />;
      case 'computer':
        return <MyComputer />;
      case 'recycle':
        return <div>Recycle Bin is empty</div>;
      default:
        return <div>App not found</div>;
    }
  };

  return (
    <div 
      className="bg-[#008080] h-screen w-screen overflow-hidden select-none relative"
      onClick={handleDesktopClick}
    >
      {/* Desktop Icons */}
      <div className="absolute top-2 left-2 flex flex-col gap-4 p-2">
        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.id}
            title={icon.title}
            icon={icon.icon}
            onDoubleClick={() => handleIconDoubleClick(icon.appType)}
          />
        ))}
      </div>

      {/* Windows */}
      <div className="absolute inset-0 pb-7">
        {windows.map(window => {
          // Determine render type and URL based on window type
          let renderType: 'component' | 'iframe' = 'component';
          let iframeUrl: string | undefined;

          if (window.type === 'cv') {
            renderType = 'iframe';
            iframeUrl = 'https://example.com/blog';
          } else if (window.type.startsWith('project-')) {
            renderType = 'iframe';
            // Use project-specific URLs based on the project type
            const projectUrls = {
              'project-lesstube': 'https://chrome.google.com/webstore/detail/lesstube',
              'project-mentalquest': 'https://mentalquest.app',
              'project-legacyspace': 'https://legacyspace.mobile'
            };
            iframeUrl = projectUrls[window.type as keyof typeof projectUrls] || 'https://github.com';
          }

          return (
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
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onMaximize={() => maximizeWindow(window.id)}
              onBringToFront={() => bringToFront(window.id)}
              onPositionChange={(position, size, isMaximized) => 
              handlePositionChange(window.id, position, size, isMaximized)
            }
              isActive={activeWindowId === window.id}
              renderType={renderType}
              iframeUrl={iframeUrl}
            >
              {renderType === 'component' ? renderAppContent(window.type) : null}
            </Window>
          );
        })}
      </div>

      {/* Start Menu */}
      {isStartMenuOpen && (
        <StartMenu 
          onItemClick={handleStartMenuItemClick}
        />
      )}

      {/* Taskbar */}
      <Taskbar 
        windows={windows}
        onStartClick={toggleStartMenu}
        onTaskbarButtonClick={(id) => {
          const window = windows.find(w => w.id === id);
          if (window) {
            if (window.isMinimized) {
              minimizeWindow(id); // This will toggle the minimized state
              bringToFront(id);
            } else if (activeWindowId === id) {
              minimizeWindow(id);
            } else {
              bringToFront(id);
            }
          }
        }}
        activeWindowId={activeWindowId}
      />
    </div>
  );
};

export default Desktop;