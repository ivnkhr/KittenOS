
# Windows 95 Developer Portfolio

## Overview

This is a Windows 95-themed developer portfolio application that recreates the nostalgic desktop environment of the 1990s. The application features a fully functional desktop interface with draggable windows, a taskbar, start menu, and various "applications" including a CV viewer (iframe), projects showcase, contact form, and Winamp music player. The project uses a modern React frontend architecture, styled to authentically replicate the Windows 95 aesthetic. All window positions and states are persisted in localStorage for seamless user experience across sessions, with each user maintaining their own personalized desktop setup.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a client-only architecture with React frontend and localStorage for state persistence:

- **Frontend**: React with TypeScript, styled with Tailwind CSS and custom Windows 95 theming
- **State Management**: Local storage for window positions, states, and user preferences
- **Styling**: Combination of Tailwind CSS and custom CSS to achieve authentic Windows 95 appearance
- **Build System**: Vite for frontend bundling and development

## Key Components

### Frontend Architecture
- **Desktop Environment**: Complete Windows 95 desktop simulation with draggable windows, taskbar, and start menu
- **Window Management**: Custom hook (`useWindowManager`) handles window state, positioning, and z-index management with localStorage persistence
- **Applications**: Modular app components (CV iframe, Projects shortcuts, Contacts, Winamp music player, My Computer) that render within windows
- **Iframe Windows**: Enhanced with URL toolbar and "Go" button functionality for opening links in new tabs
- **UI Components**: Extensive shadcn/ui component library with custom Windows 95 styling
- **State Management**: React hooks with localStorage for persistent user-specific configurations

### Local Storage Schema
- **Window Positions**: Persists user's window arrangements, positions, and states in browser localStorage
- **User Preferences**: Each user maintains their own desktop configuration independently

## Data Flow

1. **Client Initialization**: Desktop loads with default window positions from localStorage or defaults
2. **Window Management**: User interactions trigger window state changes, automatically persisted to localStorage
3. **Application State**: All window open/closed states, positions, and sizes are stored per unique user session
4. **Position Persistence**: Window arrangements are automatically saved and restored between sessions

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18 with TypeScript
- **UI Framework**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom Windows 95 theme variables
- **Form Handling**: React Hook Form with Zod validation
- **Utilities**: Class variance authority, clsx, date-fns for various utilities

### Development Dependencies
- **Build Tools**: Vite for frontend bundling and development
- **Development**: Replit-specific plugins for enhanced development experience
- **Fonts**: Custom MS Sans Serif font loading for authentic Windows 95 appearance

## Deployment Strategy

The application is designed for deployment as a static single-page application:

1. **Build Process**: 
   - Frontend builds to `dist` directory for static hosting
   
2. **Environment Setup**:
   - No backend dependencies required
   - Pure client-side application with localStorage persistence

3. **Production Considerations**:
   - Static file serving for optimized performance
   - Client-side routing with React
   - Responsive design for various screen sizes

## Recent Changes (January 2025)

### Backend Removal
- Completely removed Express.js backend and database dependencies
- Migrated all state management to client-side localStorage
- Each user now maintains independent, persistent desktop configurations
- Eliminated need for API calls and server-side state management

### Enhanced Window Position Persistence
- Fixed dragging behavior to prevent windows from snapping back to original positions
- Enhanced window state management for real-time position updates
- Improved localStorage schema for better data organization

### Desktop Icon Improvements
- Fixed desktop icon click detection with proper CSS classes
- Enhanced desktop click handling to preserve icon functionality
- Added proper event handling to prevent interference with start menu

### Enhanced Iframe Windows
- Added URL toolbar with address bar and "Go" button for iframe windows
- Implemented functionality to open URLs in new tabs via the Go button
- Adjusted window content height to accommodate the URL toolbar

### New Winamp Application
- Created authentic Winamp-style music player component
- Added support for YouTube playlist URL input
- Positioned as desktop icon with proper window management

The architecture prioritizes simplicity with client-only operation, type safety throughout the frontend stack, modular design for easy application additions, and authentic Windows 95 user experience with persistent window management per user session.
