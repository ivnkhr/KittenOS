import { useWindowManager } from '../hooks/useWindowManager';
import Window from './Window';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import StartMenu from './StartMenu';
import { useState } from 'react';
import { Project } from '../lib/types';

// App components
import CV from './apps/CV';
import Projects from './apps/Projects';
import Contacts from './apps/Contacts';
import MyComputer from './apps/MyComputer';
import Winamp from './apps/Winamp';

// Import desktop icons
import computerIcon from '../assets/icons/computer.svg';
import directoryIcon from '../assets/icons/directory.svg';
import notepadIcon from '../assets/icons/notepad.svg';
import msnIcon from '../assets/icons/msn.svg';
import recycleIcon from '../assets/icons/recycle.svg';

interface DesktopProps {
  projects: Project[];
}

export default function Desktop({ projects }: DesktopProps) {
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

  const handleOpenProject = (project: Project) => {
    const appType = `project-${project.title.toLowerCase().replace(/\s+/g, '')}` as any;
    openWindow(appType, project.demoUrl);
  };

  const renderWindowContent = (window: any) => {
    switch (window.type) {
      case 'cv':
        return <CV />;
      case 'projects':
        return <Projects projects={projects} onOpenProject={handleOpenProject} />;
      case 'contacts':
        return <Contacts />;
      case 'computer':
        return <MyComputer />;
      case 'winamp':
        return <Winamp />;
      case 'recycle':
        return <div className="p-4"><h2>Recycle Bin</h2><p>No items in recycle bin.</p></div>;
      default:
        if (window.type.startsWith('project-')) {
          const project = projects.find(p => 
            `project-${p.title.toLowerCase().replace(/\s+/g, '')}` === window.type
          );
          return (
            <iframe
              src={project?.demoUrl || 'about:blank'}
              className="w-full h-full border-0"
              title={window.title}
            />
          );
        }
        return <div className="p-4">Unknown application type: {window.type}</div>;
    }
  };

  return (
    <div className="h-full w-full relative bg-[#008080] overflow-hidden">
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-4">
        <DesktopIcon
          icon={computerIcon}
          label="My Computer"
          onDoubleClick={() => openWindow('computer')}
        />
        <DesktopIcon
          icon={directoryIcon}
          label="Projects"
          onDoubleClick={() => openWindow('projects')}
        />
        <DesktopIcon
          icon={notepadIcon}
          label="Blog"
          onDoubleClick={() => openWindow('cv')}
        />
        <DesktopIcon
          icon={msnIcon}
          label="Contact"
          onDoubleClick={() => openWindow('contacts')}
        />
        <DesktopIcon
          icon={recycleIcon}
          label="Recycle Bin"
          onDoubleClick={() => openWindow('recycle')}
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
        onStartClick={() => setShowStartMenu(!showStartMenu)}
      />
    </div>
  );
}