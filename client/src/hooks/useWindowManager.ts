import { useState, useEffect } from 'react';
import { WindowState, AppType } from '@/lib/types';

// Import icons for windows
import cvIcon from '@/assets/icons/notepad.svg';
import projectsIcon from '@/assets/icons/directory.svg';
import contactsIcon from '@/assets/icons/msn.svg';
import computerIcon from '@/assets/icons/computer.svg';
import recycleIcon from '@/assets/icons/recycle.svg';

// Window initial properties map
const initialWindowProps = {
  cv: {
    title: 'Blog Page Browser',
    icon: cvIcon,
    position: { x: 150, y: 50 },
    size: { width: '800px', height: '600px' },
    renderType: 'iframe' as const,
    iframeUrl: 'https://example.com/blog'
  },
  projects: {
    title: 'Projects',
    icon: projectsIcon,
    position: { x: 200, y: 100 },
    size: { width: '550px', height: '450px' },
    renderType: 'component' as const
  },
  contacts: {
    title: 'Contact Me',
    icon: contactsIcon,
    position: { x: 250, y: 150 },
    size: { width: '450px', height: '400px' },
    renderType: 'component' as const
  },
  computer: {
    title: 'My Computer',
    icon: computerIcon,
    position: { x: 180, y: 120 },
    size: { width: '500px', height: '350px' },
    renderType: 'component' as const
  },
  recycle: {
    title: 'Recycle Bin',
    icon: recycleIcon,
    position: { x: 220, y: 140 },
    size: { width: '400px', height: '300px' },
    renderType: 'component' as const
  },
  // Project-specific windows
  'project-lesstube': {
    title: 'LessTube',
    icon: cvIcon,
    position: { x: 300, y: 100 },
    size: { width: '800px', height: '600px' },
    renderType: 'iframe' as const,
    iframeUrl: 'https://chrome.google.com/webstore/detail/lesstube'
  },
  'project-mentalquest': {
    title: 'MentalQuest',
    icon: cvIcon,
    position: { x: 350, y: 150 },
    size: { width: '800px', height: '600px' },
    renderType: 'iframe' as const,
    iframeUrl: 'https://mentalquest.app'
  },
  'project-legacyspace': {
    title: 'LegacySPACE.mobile',
    icon: cvIcon,
    position: { x: 400, y: 200 },
    size: { width: '800px', height: '600px' },
    renderType: 'iframe' as const,
    iframeUrl: 'https://legacyspace.mobile'
  },
  winamp: {
    title: 'Winamp',
    icon: computerIcon,
    position: { x: 300, y: 200 },
    size: { width: '400px', height: '300px' },
    renderType: 'component' as const
  }
};

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [zIndex, setZIndex] = useState(10);
  
  // Load window positions from localStorage
  const [savedPositions, setSavedPositions] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('windowPositions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  // Save window position to localStorage
  const saveWindowPosition = (positionData: { appType: string; x: number; y: number; width: string; height: string; isMaximized: boolean }) => {
    try {
      const existing = savedPositions.find(pos => pos.appType === positionData.appType);
      let updated;
      
      if (existing) {
        updated = savedPositions.map(pos => 
          pos.appType === positionData.appType ? { ...pos, ...positionData } : pos
        );
      } else {
        updated = [...savedPositions, { ...positionData, id: Date.now() }];
      }
      
      setSavedPositions(updated);
      localStorage.setItem('windowPositions', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save window position:', error);
    }
  };

  // Function to get saved position or use default
  const getWindowPosition = (appType: AppType) => {
    const savedPosition = savedPositions.find(pos => pos.appType === appType);
    const defaultProps = initialWindowProps[appType];
    
    if (savedPosition) {
      return {
        position: { x: savedPosition.x, y: savedPosition.y },
        size: { width: savedPosition.width, height: savedPosition.height },
        isMaximized: savedPosition.isMaximized
      };
    }
    
    if (defaultProps) {
      return {
        position: defaultProps.position,
        size: defaultProps.size,
        isMaximized: false
      };
    }
    
    // Fallback for dynamic windows
    return {
      position: { x: 300 + Math.random() * 100, y: 100 + Math.random() * 100 },
      size: { width: '800px', height: '600px' },
      isMaximized: false
    };
  };

  // Function to save window position
  const handlePositionChange = (appType: AppType, position: any, size: any, isMaximized: boolean) => {
    saveWindowPosition({
      appType,
      x: position.x,
      y: position.y,
      width: size.width,
      height: size.height,
      isMaximized
    });
  };

  // Open a window
  const openWindow = (appType: AppType, iframeUrl?: string) => {
    const existingWindow = windows.find(window => window.type === appType);
    
    if (existingWindow) {
      // If window exists but is minimized, un-minimize it
      if (existingWindow.isMinimized) {
        setWindows(windows.map(window => 
          window.id === existingWindow.id 
            ? { ...window, isMinimized: false } 
            : window
        ));
      }
      
      // Bring window to front
      bringToFront(existingWindow.id);
      return;
    }
    
    // Get initial properties for the window type
    let props = initialWindowProps[appType];
    
    // Handle dynamic project windows
    if (!props && appType.startsWith('project-')) {
      props = {
        title: appType.split('-').slice(1).map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        icon: computerIcon,
        position: { x: 300 + Math.random() * 100, y: 100 + Math.random() * 100 },
        size: { width: '800px', height: '600px' },
        renderType: 'iframe' as const,
        iframeUrl: iframeUrl || 'about:blank'
      };
    }
    
    if (!props) {
      console.error(`No props found for app type: ${appType}`);
      return;
    }

    const { position, size, isMaximized } = getWindowPosition(appType);
    
    // Create a new window
    const newWindow: WindowState = {
      id: `${appType}-${Date.now()}`,
      type: appType,
      title: props.title,
      icon: props.icon,
      position: position,
      size: size,
      isMinimized: false,
      isMaximized: isMaximized,
      zIndex: zIndex
    };
    
    // Increment zIndex for next window
    setZIndex(prev => prev + 1);
    
    // Add window to state
    setWindows([...windows, newWindow]);
    
    // Set as active window
    setActiveWindowId(newWindow.id);
  };

  // Close a window
  const closeWindow = (id: string) => {
    setWindows(windows.filter(window => window.id !== id));
    
    // If the closed window was active, set active window to null
    if (activeWindowId === id) {
      const remainingWindows = windows.filter(window => window.id !== id);
      if (remainingWindows.length > 0) {
        // Find the window with the highest zIndex
        const highestZWindow = remainingWindows.reduce((highest, current) => 
          current.zIndex > highest.zIndex ? current : highest
        );
        setActiveWindowId(highestZWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  // Minimize/unminimize a window
  const minimizeWindow = (id: string) => {
    setWindows(windows.map(window => 
      window.id === id 
        ? { ...window, isMinimized: !window.isMinimized } 
        : window
    ));
    
    // If minimizing active window, find next active window
    if (activeWindowId === id) {
      const visibleWindows = windows.filter(w => !w.isMinimized && w.id !== id);
      if (visibleWindows.length > 0) {
        const highestZWindow = visibleWindows.reduce((highest, current) => 
          current.zIndex > highest.zIndex ? current : highest
        );
        setActiveWindowId(highestZWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  // Maximize/restore a window
  const maximizeWindow = (id: string) => {
    setWindows(windows.map(window => 
      window.id === id 
        ? { ...window, isMaximized: !window.isMaximized } 
        : window
    ));
    
    // Set as active window
    setActiveWindowId(id);
  };

  // Bring a window to front
  const bringToFront = (id: string) => {
    // Only if not already the active window
    if (activeWindowId !== id) {
      const newZIndex = zIndex + 1;
      setZIndex(newZIndex);
      
      // Update window zIndex
      setWindows(windows.map(window => 
        window.id === id 
          ? { ...window, zIndex: newZIndex } 
          : window
      ));
      
      // Set as active window
      setActiveWindowId(id);
    }
  };

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
    handlePositionChange
  };
}
