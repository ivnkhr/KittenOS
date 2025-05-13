import React, { useState, useRef, useEffect } from 'react';
import { Position, Size } from '@/lib/types';

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  position: Position;
  size: Size;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onBringToFront: () => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  position,
  size,
  isMinimized,
  isMaximized,
  zIndex,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onBringToFront,
  children
}) => {
  const [pos, setPos] = useState<Position>(position);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  
  const [windowSize, setWindowSize] = useState<Size>(size);
  const [originalSize, setOriginalSize] = useState<Size>(size);
  const [originalPos, setOriginalPos] = useState<Position>(position);

  // Update position when position prop changes (for window management)
  useEffect(() => {
    if (!dragging) {
      setPos(position);
    }
  }, [position, dragging]);

  // Update size when maximized state changes
  useEffect(() => {
    if (isMaximized) {
      // Save current size and position before maximizing
      setOriginalSize(windowSize);
      setOriginalPos(pos);
      
      // Maximize
      setWindowSize({ width: '100%', height: 'calc(100% - 28px)' });
      setPos({ x: 0, y: 0 });
    } else {
      // Restore original size and position
      setWindowSize(originalSize);
      setPos(originalPos);
    }
  }, [isMaximized]);

  // Handle mouse down on titlebar (start dragging)
  const handleTitlebarMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    
    onBringToFront();
    setDragging(true);
    
    // Calculate offset from mouse position to window top-left corner
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    
    // Prevent text selection during drag
    e.preventDefault();
  };
  
  // Handle mouse move (dragging)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        // Calculate new position based on mouse position and drag offset
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Get window dimensions
        const windowWidth = windowRef.current?.offsetWidth || 0;
        const windowHeight = windowRef.current?.offsetHeight || 0;
        
        // Keep window within viewport bounds
        const maxX = viewportWidth - windowWidth;
        const maxY = viewportHeight - windowHeight;
        
        setPos({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      }
    };
    
    const handleMouseUp = () => {
      setDragging(false);
    };
    
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, dragOffset]);
  
  // Bring window to front when clicked
  const handleWindowClick = () => {
    onBringToFront();
  };

  if (isMinimized) {
    return null;
  }

  return (
    <div 
      ref={windowRef}
      className="window absolute bg-[#C0C0C0] border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080]"
      style={{
        left: pos.x,
        top: pos.y,
        width: windowSize.width,
        height: windowSize.height,
        zIndex,
      }}
      onClick={handleWindowClick}
    >
      {/* Titlebar */}
      <div 
        className={`window-titlebar ${isActive ? 'bg-[#000080]' : 'bg-[#808080]'} text-white flex justify-between items-center px-1 py-1 select-none`}
        onMouseDown={handleTitlebarMouseDown}
      >
        <div className="flex items-center">
          <img src={icon} alt={title} className="mr-1 h-4 w-4" />
          <span className="text-xs">{title}</span>
        </div>
        <div className="flex">
          <button 
            className="window-button w-4 h-3.5 border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] mr-1 flex items-center justify-center"
            onClick={onMinimize}
          >
            <div className="w-2 h-0.5 bg-black -mt-1"></div>
          </button>
          <button 
            className="window-button w-4 h-3.5 border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] mr-1 flex items-center justify-center"
            onClick={onMaximize}
          >
            {isMaximized ? (
              <div className="w-2 h-2 border border-black bg-[#C0C0C0] -mt-0.5"></div>
            ) : (
              <div className="w-2 h-2 border border-black -mt-0.5"></div>
            )}
          </button>
          <button 
            className="window-button window-button-close w-4 h-3.5 border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] flex items-center justify-center text-xs"
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </div>
      
      {/* Menu */}
      <div className="window-menu flex bg-[#C0C0C0] text-black border-b border-[#808080]">
        <div className="px-2 py-1 text-xs hover:bg-[#000080] hover:text-white cursor-pointer">File</div>
        <div className="px-2 py-1 text-xs hover:bg-[#000080] hover:text-white cursor-pointer">Edit</div>
        <div className="px-2 py-1 text-xs hover:bg-[#000080] hover:text-white cursor-pointer">View</div>
        <div className="px-2 py-1 text-xs hover:bg-[#000080] hover:text-white cursor-pointer">Help</div>
      </div>
      
      {/* Content */}
      <div className="window-content h-[calc(100%-42px)] p-2 bg-white border-[2px] border-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Window;
