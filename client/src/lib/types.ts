
export type AppType = 
  | 'cv' 
  | 'projects' 
  | 'contacts' 
  | 'computer' 
  | 'recycle' 
  | 'winamp'
  | `project-${string}`;

export type RenderType = 'component' | 'iframe';

export interface WindowState {
  id: string;
  type: AppType;
  title: string;
  icon: string;
  position: { x: number; y: number };
  size: { width: string; height: string };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  demoUrl: string;
  sourceUrl: string;
  iconType: string;
  renderType: RenderType;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

// Local storage schemas
export interface StoredWindowPosition {
  windowId: string;
  appType: string;
  x: number;
  y: number;
  width: string;
  height: string;
  isMaximized: boolean;
  isMinimized: boolean;
  isOpen: boolean;
}

export interface StoredContactMessage extends ContactMessage {
  id: string;
  createdAt: string;
}
