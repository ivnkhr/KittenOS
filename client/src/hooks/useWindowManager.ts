
import { useState, useEffect } from 'react';
import { WindowState, AppType, StoredWindowPosition } from '../lib/types';

// Import icons for windows
import cvIcon from '../assets/icons/notepad.svg';
import projectsIcon from '../assets/icons/directory.svg';
import contactsIcon from '../assets/icons/msn.svg';
import computerIcon from '../assets/icons/computer.svg';
import recycleIcon from '../assets/icons/recycle.svg';

// Window initial properties map
const initialWindowProps = {
  cv: {
    title: 'Blog Page Browser W',
    icon: cvIcon,
    position: { x: 10, y: 0 },
    size: { width: 600, height: 600 },
    rt: 'iframe' as any,
    iframeUrl: 'https://ivnkhr.com'
  },
  projects: {
    title: 'Projects',
    icon: projectsIcon,
    position: { x: 200, y: 100 },
    size: { width: 550, height: 450 },
  },
  contacts: {
    title: 'Contact Me',
    icon: contactsIcon,
    position: { x: 250, y: 150 },
    size: { width: 400, height: 300 },
  },
  computer: {
    title: 'My Computer',
    icon: computerIcon,
    position: { x: 180, y: 120 },
    size: { width: 400, height: 300 },
  },
  recycle: {
    title: 'Recycle Bin',
    icon: recycleIcon,
    position: { x: 220, y: 140 },
    size: { width: 400, height: 300 },
  },
  // Project-specific windows
  'project-lesstube': {
    title: 'LessTube',
    icon: cvIcon,
    position: { x: 300, y: 100 },
    size: { width: 400, height: 300 },
    rt: 'iframe' as any,
    url: 'https://ivnkhr.com'
  },
  'project-mentalquest': {
    title: 'MentalQuest',
    icon: cvIcon,
    position: { x: 350, y: 150 },
    size: { width: 400, height: 300 },
  },
  'project-legacyspace': {
    title: 'LegacySPACE.mobile',
    icon: cvIcon,
    position: { x: 400, y: 200 },
    size: { width: 400, height: 300 },
  },
  winamp: {
    title: 'Winamp',
    icon: computerIcon,
    position: { x: 150, y: 150 },
    size: { width: 400, height: 300 },
  }
};

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [zIndex, setZIndex] = useState(10);
  
  // Load all window states from localStorage on initialization
  useEffect(() => {
    try {
      const savedPositions = localStorage.getItem('windowPositions');
      if (savedPositions) {
        const positions: StoredWindowPosition[] = JSON.parse(savedPositions);
        
        // Restore open windows
        const restoredWindows: WindowState[] = [];
        let maxZIndex = 10;
        
        positions.forEach(pos => {
          if (pos.isOpen) {
            const props = initialWindowProps[pos.appType as keyof typeof initialWindowProps];
            console.log('props', props);
            if (props) {
              const windowState: WindowState = {
                id: pos.windowId,
                type: pos.appType as AppType,
                title: props.title,
                icon: props.icon,
                position: { x: pos.x, y: pos.y },
                size: { width: pos.width, height: pos.height },
                isMinimized: pos.isMinimized,
                isMaximized: pos.isMaximized,
                zIndex: maxZIndex++,
                renderType: props.rt,
                iframeUrl: props.iframeUrl
              };
              restoredWindows.push(windowState);
            }
          }
        });
        
        setWindows(restoredWindows);
        setZIndex(maxZIndex);
        
        // Set active window to the one with highest zIndex
        if (restoredWindows.length > 0 && !restoredWindows.some(w => w.isMinimized)) {
          const highestZWindow = restoredWindows.reduce((highest, current) => 
            current.zIndex > highest.zIndex ? current : highest
          );
          setActiveWindowId(highestZWindow.id);
        }
      }

    } catch (error) {
      console.error('Failed to restore window states:', error);
    }
  }, []);
  
  // Save window states to localStorage
  const saveWindowStates = (updatedWindows: WindowState[]) => {
    try {
      const existingPositions = JSON.parse(localStorage.getItem('windowPositions') || '[]');
      const updatedPositions: StoredWindowPosition[] = [...existingPositions];
      
      // Update or add current window states
      updatedWindows.forEach(window => {
        const existingIndex = updatedPositions.findIndex(pos => pos.windowId === window.id);
        const positionData: StoredWindowPosition = {
          windowId: window.id,
          appType: window.type,
          x: window.position.x,
          y: window.position.y,
          width: window.size.width,
          height: window.size.height,
          isMaximized: window.isMaximized,
          isMinimized: window.isMinimized,
          isOpen: true
        };
        
        if (existingIndex >= 0) {
          updatedPositions[existingIndex] = positionData;
        } else {
          updatedPositions.push(positionData);
        }
      });
      
      // Mark closed windows
      const openWindowIds = new Set(updatedWindows.map(w => w.id));
      updatedPositions.forEach(pos => {
        if (!openWindowIds.has(pos.windowId)) {
          pos.isOpen = false;
        }
      });
      
      localStorage.setItem('windowPositions', JSON.stringify(updatedPositions));
    } catch (error) {
      console.error('Failed to save window states:', error);
    }
  };

  // Function to get saved position or use default
  const getWindowPosition = (windowId: string, appType: AppType) => {
    try {
      const savedPositions = JSON.parse(localStorage.getItem('windowPositions') || '[]');
      const savedPosition = savedPositions.find((pos: StoredWindowPosition) => pos.windowId === windowId);
      const defaultProps = initialWindowProps[appType as keyof typeof initialWindowProps];
      
      if (savedPosition) {
        return {
          position: { x: savedPosition.x, y: savedPosition.y },
          size: { width: savedPosition.width, height: savedPosition.height },
          isMaximized: savedPosition.isMaximized,
          isMinimized: savedPosition.isMinimized
        };
      }
      
      if (defaultProps) {
        return {
          position: defaultProps.position,
          size: defaultProps.size,
          isMaximized: false,
          isMinimized: false
        };
      }
      
      // Fallback for dynamic windows
      return {
        position: { x: 300 + Math.random() * 100, y: 100 + Math.random() * 100 },
        size: { width: 800, height: 600 },
        isMaximized: false,
        isMinimized: false
      };
    } catch {
      return {
        position: { x: 300, y: 100 },
        size: { width: 800, height: 600 },
        isMaximized: false,
        isMinimized: false
      };
    }
  };

  // Function to handle position changes
  const handlePositionChange = (windowId: string, position: any, size: any, isMaximized: boolean) => {
    setWindows(prevWindows => {
      const updatedWindows = prevWindows.map(w => 
        w.id === windowId 
          ? { ...w, position, size, isMaximized }
          : w
      );
      saveWindowStates(updatedWindows);
      return updatedWindows;
    });
  };

  // Open a window
  const openWindow = (appType: AppType, iframeUrl?: string) => {
    const existingWindow = windows.find(window => window.type === appType);
    
    if (existingWindow) {
      // If window exists but is minimized, un-minimize it
      if (existingWindow.isMinimized) {
        const updatedWindows = windows.map(window => 
          window.id === existingWindow.id 
            ? { ...window, isMinimized: false } 
            : window
        );
        setWindows(updatedWindows);
        saveWindowStates(updatedWindows);
      }
      
      // Bring window to front
      bringToFront(existingWindow.id);
      return;
    }
    
    // Get initial properties for the window type
    let props = initialWindowProps[appType as keyof typeof initialWindowProps];
    
    // Handle dynamic project windows
    if (!props && appType.startsWith('project-')) {
      props = {
        title: appType.split('-').slice(1).map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join('-'),
        icon: computerIcon,
        position: { x: 300 + Math.random() * 100, y: 100 + Math.random() * 100 },
        size: { width: 800, height: 600 },
        rt: 'iframe' as const,
        url: iframeUrl || 'about:blank'
      };
    }
    
    if (!props) {
      console.error(`No props found for app type: ${appType}`);
      return;
    }

    // Create window ID first
    const windowId = `${appType}`;
    const { position, size, isMaximized, isMinimized } = getWindowPosition(windowId, appType);
    
    // Create a new window
    const newWindow: WindowState = {
      id: windowId,
      type: appType,
      title: props.title,
      icon: props.icon,
      position: position,
      size: size,
      isMinimized: isMinimized,
      isMaximized: isMaximized,
      zIndex: zIndex
    };
    
    // Increment zIndex for next window
    setZIndex(prev => prev + 1);
    
    // Add window to state
    const updatedWindows = [...windows, newWindow];
    setWindows(updatedWindows);
    saveWindowStates(updatedWindows);
    
    // Set as active window if not minimized
    if (!isMinimized) {
      setActiveWindowId(newWindow.id);
    }
  };

  // Close a window
  const closeWindow = (id: string) => {
    const updatedWindows = windows.filter(window => window.id !== id);
    setWindows(updatedWindows);
    saveWindowStates(updatedWindows);
    
    // If the closed window was active, set active window to null
    if (activeWindowId === id) {
      if (updatedWindows.length > 0) {
        // Find the window with the highest zIndex that's not minimized
        const visibleWindows = updatedWindows.filter(w => !w.isMinimized);
        if (visibleWindows.length > 0) {
          const highestZWindow = visibleWindows.reduce((highest, current) => 
            current.zIndex > highest.zIndex ? current : highest
          );
          setActiveWindowId(highestZWindow.id);
        } else {
          setActiveWindowId(null);
        }
      } else {
        setActiveWindowId(null);
      }
    }
  };

  // Minimize/unminimize a window
  const minimizeWindow = (id: string) => {
    const updatedWindows = windows.map(window => 
      window.id === id 
        ? { ...window, isMinimized: !window.isMinimized } 
        : window
    );
    setWindows(updatedWindows);
    saveWindowStates(updatedWindows);
    
    // If minimizing active window, find next active window
    if (activeWindowId === id) {
      const visibleWindows = updatedWindows.filter(w => !w.isMinimized && w.id !== id);
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
    const updatedWindows = windows.map(window => 
      window.id === id 
        ? { ...window, isMaximized: !window.isMaximized } 
        : window
    );
    setWindows(updatedWindows);
    saveWindowStates(updatedWindows);
    
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
      const updatedWindows = windows.map(window => 
        window.id === id 
          ? { ...window, zIndex: newZIndex } 
          : window
      );
      setWindows(updatedWindows);
      saveWindowStates(updatedWindows);
      
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
