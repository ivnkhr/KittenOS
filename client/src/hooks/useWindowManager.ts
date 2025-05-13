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
    title: 'CV - Notepad',
    icon: cvIcon,
    position: { x: 150, y: 50 },
    size: { width: '500px', height: '400px' }
  },
  projects: {
    title: 'Projects',
    icon: projectsIcon,
    position: { x: 200, y: 100 },
    size: { width: '550px', height: '450px' }
  },
  contacts: {
    title: 'Contact Me',
    icon: contactsIcon,
    position: { x: 250, y: 150 },
    size: { width: '450px', height: '400px' }
  },
  computer: {
    title: 'My Computer',
    icon: computerIcon,
    position: { x: 180, y: 120 },
    size: { width: '500px', height: '350px' }
  },
  recycle: {
    title: 'Recycle Bin',
    icon: recycleIcon,
    position: { x: 220, y: 140 },
    size: { width: '400px', height: '300px' }
  }
};

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [zIndex, setZIndex] = useState(10);

  // Open a window
  const openWindow = (appType: AppType) => {
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
    const props = initialWindowProps[appType];
    
    // Create a new window
    const newWindow: WindowState = {
      id: `${appType}-${Date.now()}`,
      type: appType,
      title: props.title,
      icon: props.icon,
      position: props.position,
      size: props.size,
      isMinimized: false,
      isMaximized: false,
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
    bringToFront
  };
}
