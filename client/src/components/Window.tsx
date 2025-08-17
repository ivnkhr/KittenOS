import React, { useState, useRef, useEffect } from 'react';
import { Position, Size } from '../lib/types';

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
  onPositionChange?: (position: Position, size: Size, isMaximized: boolean) => void;
  renderType?: 'component' | 'iframe';
  iframeUrl?: string;
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
  onPositionChange,
  renderType = 'component',
  iframeUrl,
  children
}) => {
  const [pos, setPos] = useState<Position>(position);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentUrl, setCurrentUrl] = useState(iframeUrl || '');
  const [urlInputValue, setUrlInputValue] = useState(iframeUrl || '');
  const windowRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playSound = () => {
    const audio = new Audio('/src/assets/sounds/close.mp3');
    audio.play();
  };

  useEffect(() => {
    // Play the sound on component mount
    const audio = new Audio('/src/assets/sounds/click.mp3');
    audio.play();
  }, []);
  
  const [windowSize, setWindowSize] = useState<Size>(size);
  const [originalSize, setOriginalSize] = useState<Size>(size);
  const [originalPos, setOriginalPos] = useState<Position>(position);
  
  // Save window position mutation (removed as it's handled by parent component)

  

  // Update URL states when iframeUrl prop changes
  useEffect(() => {
    if (iframeUrl) {
      setCurrentUrl(iframeUrl);
      setUrlInputValue(iframeUrl);
    }
  }, [iframeUrl]);

  // Update size when maximized state changes
  useEffect(() => {
    if (isMaximized) {
      // Save current size and position before maximizing
      setOriginalSize(windowSize);
      setOriginalPos(pos);
      
      // Maximize
      setWindowSize({ width: window.innerWidth, height: window.innerHeight - 28 });
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

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;

    onBringToFront();
    setResizing(true);

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
      if (dragging) {
        setDragging(false);
        if (onPositionChange) {
          onPositionChange(pos, windowSize, isMaximized);
        }
      }
    };
    
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, dragOffset, pos, windowSize, isMaximized, onPositionChange]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (resizing) {
        const newWidth = e.clientX - pos.x;
        const newHeight = e.clientY - pos.y;
        setWindowSize({
          width: Math.max(200, newWidth),
          height: Math.max(150, newHeight),
        });
      }
    };

    const handleMouseUp = () => {
      if (resizing) {
        setResizing(false);
        if (onPositionChange) {
          setTimeout(() => {
            onPositionChange(pos, windowSize, isMaximized);
          }, 0);
        }
      }
    };

    if (resizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing, pos, windowSize, onPositionChange, isMaximized]);
  
  // Bring window to front when clicked
  const handleWindowClick = () => {
    onBringToFront();
  };

  // Handle URL navigation
  const handleGoClick = () => {
    if (urlInputValue.trim()) {
      window.open(urlInputValue.trim(), '_blank');
    }
  };

  const handleUrlInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGoClick();
    }
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
        className={`window-titlebar ${isActive ? 'bg-green-900' : 'bg-[#808080]'} text-white flex justify-between items-center px-1 py-1 select-none`}
        onMouseDown={handleTitlebarMouseDown}
      >
        <div className="flex items-center">
          <img style={{ transform: 'scale(2)', imageRendering: 'pixelated' }} src={icon} alt={title} className="mr-1 h-4 w-4" />
          <span className="text-xs">{title}</span>
        </div>
        <div className="flex">
          <button 
            className="window-button window-button-close w-4 h-3.5 border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] flex items-center justify-center text-xs"
            onClick={() => { onMinimize(); playSound(); }}
          >
            _
          </button>
          <button 
            className="window-button window-button-close w-4 h-3.5 border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] flex items-center justify-center text-xs"
            onClick={() => { onMaximize(); playSound(); }}
          >
            o
          </button>
          <button 
            className="window-button window-button-close w-4 h-3.5 border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] flex items-center justify-center text-xs"
            onClick={() => { onClose(); playSound(); }}
          >
            x
          </button>
        </div>
      </div>
      
      
      {/* Menu */}
      { renderType !== 'iframe' && (
      <div className="window-menu flex bg-[#C0C0C0] text-black border-b border-[#808080]">
        <div className="px-2 py-1 text-xs hover:bg-[#000080] hover:text-white cursor-pointer">File</div>
        <div className="px-2 py-1 text-xs hover:bg-[#000080] hover:text-white cursor-pointer">Edit</div>
        <div className="px-2 py-1 text-xs hover:bg-[#000080] hover:text-white cursor-pointer">View</div>
        <div className="px-2 py-1 text-xs hover:bg-[#000080] hover:text-white cursor-pointer">Help</div>
      </div>
      ) }
      
      {/* URL Toolbar for iframe windows */}
      {renderType === 'iframe' && (
        <div className="window-toolbar flex items-center bg-[#C0C0C0] px-2 py-1 border-b border-[#808080] gap-2">
          <span className="text-xs text-black">Address:</span>
          <input
            type="text"
            value={urlInputValue}
            onChange={(e) => setUrlInputValue(e.target.value)}
            onKeyPress={handleUrlInputKeyPress}
            className="flex-1 px-1 py-0.5 text-xs border-[2px] border-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF] bg-white text-black"
            placeholder="Enter URL..."
            readOnly={true}
          />
          <button
            onClick={handleGoClick}
            className="px-2 py-0.5 text-xs bg-[#C0C0C0] border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] hover:bg-[#E0E0E0] active:border-[#808080] active:border-r-[#FFFFFF] active:border-b-[#FFFFFF]"
          >
            Go
          </button>
        </div>
      )}
      

      {/* Content */}
      <div className={`window-content ${renderType === 'iframe' ? 'h-[calc(100%-70px)]' : 'h-[calc(100%-42px)]'} bg-white border-[2px] border-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF] overflow-y-auto`}>
        {renderType === 'iframe' && currentUrl ? (
          <iframe
            src={currentUrl}
            className="w-full h-full border-0"
            title={title}
            allow="autoplay; encrypted-media; fullscreen"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        ) : (
          <div>
            {children}
          </div>
        )}
      </div>
      <div
        className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  );
};

export default Window;
