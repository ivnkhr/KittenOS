
export type AppType = 
  | 'cv' 
  | 'projects' 
  | 'contacts' 
  | 'computer' 
  | 'recycle' 
  | 'winamp'
  | `project-${string}`;

export type RenderType = 'component' | 'iframe';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  type: AppType;
  title: string;
  icon: string;
  position: Position;
  size: Size;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  renderType?: RenderType;
  currentUrl?: string;
  content?: React.ReactNode; // Add content property
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  demoUrl: string;
  sourceUrl: string;

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
  width: number;
  height: number;
  isMaximized: boolean;
  isMinimized: boolean;
  isOpen: boolean;
}

export interface StoredContactMessage extends ContactMessage {
  id: string;
  createdAt: string;
}
