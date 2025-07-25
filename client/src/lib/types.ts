export type AppType = 'cv' | 'projects' | 'contacts' | 'computer' | 'recycle' | 'winamp' | 'project-lesstube' | 'project-mentalquest' | 'project-legacyspace';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: string;
  height: string;
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
}
