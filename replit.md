# Windows 95 Developer Portfolio

## Overview

This is a Windows 95-themed developer portfolio application that recreates the nostalgic desktop environment of the 1990s. The application features a fully functional desktop interface with draggable windows, a taskbar, start menu, and various "applications" including a CV viewer (iframe), projects showcase, contact form, and Winamp music player. The project uses a modern full-stack architecture with React frontend and Express backend, styled to authentically replicate the Windows 95 aesthetic. Window positions are persisted in localStorage for seamless user experience across sessions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared code:

- **Frontend**: React with TypeScript, styled with Tailwind CSS and custom Windows 95 theming
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for data management
- **Styling**: Combination of Tailwind CSS and custom CSS to achieve authentic Windows 95 appearance
- **Build System**: Vite for frontend bundling and development

## Key Components

### Frontend Architecture
- **Desktop Environment**: Complete Windows 95 desktop simulation with draggable windows, taskbar, and start menu
- **Window Management**: Custom hook (`useWindowManager`) handles window state, positioning, and z-index management with localStorage persistence
- **Applications**: Modular app components (CV iframe, Projects shortcuts, Contacts, Winamp music player, My Computer) that render within windows
- **Iframe Windows**: Enhanced with URL toolbar and "Go" button functionality for opening links in new tabs
- **UI Components**: Extensive shadcn/ui component library with custom Windows 95 styling
- **State Management**: React hooks for local state management (removed React Query dependency for window positions)

### Backend Architecture
- **RESTful API**: Express.js server providing endpoints for projects, contacts, and window positions
- **Storage Layer**: Abstracted storage interface with in-memory implementation (easily replaceable with database)
- **Data Validation**: Zod schemas for request/response validation
- **Development Setup**: Vite integration for hot module replacement in development

### Local Storage Schema
- **Window Positions**: Persists user's window arrangements in browser localStorage (replaced database storage for better performance and user-specific data)

## Data Flow

1. **Client Initialization**: Desktop loads with default window positions and fetches projects from API
2. **Window Management**: User interactions trigger window state changes, which can be persisted via API
3. **Project Display**: Projects are fetched from backend and displayed in either component or iframe format
4. **Contact Handling**: Contact form submissions are validated and stored via backend API
5. **Position Persistence**: Window positions are automatically saved and restored between sessions

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18 with TypeScript, React Query for data fetching
- **UI Framework**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom Windows 95 theme variables
- **Form Handling**: React Hook Form with Zod validation
- **Utilities**: Class variance authority, clsx, date-fns for various utilities

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript support
- **Database**: Neon serverless PostgreSQL with Drizzle ORM
- **Validation**: Zod for schema validation
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### Development Dependencies
- **Build Tools**: Vite for frontend, esbuild for backend
- **Development**: Replit-specific plugins for enhanced development experience
- **Fonts**: Custom MS Sans Serif font loading for authentic Windows 95 appearance

## Deployment Strategy

The application is designed for deployment on platforms that support Node.js applications:

1. **Build Process**: 
   - Frontend builds to `dist/public` directory
   - Backend builds to `dist` directory with ES modules
   
2. **Environment Setup**:
   - Requires `DATABASE_URL` environment variable for PostgreSQL connection
   - Production build serves static files from Express server

3. **Database Migration**:
   - Uses Drizzle Kit for database schema management
   - Migrations stored in `./migrations` directory
   - Schema defined in `shared/schema.ts` for type safety

4. **Production Considerations**:
   - Static file serving handled by Express in production
   - Development mode includes Vite integration for hot reloading
   - Error handling with proper HTTP status codes

## Recent Changes (January 2025)

### Window Position Persistence Fix
- Migrated from database to localStorage for window position storage
- Fixed dragging behavior to prevent windows from snapping back to original positions
- Enhanced window state management for real-time position updates

### Enhanced Iframe Windows
- Added URL toolbar with address bar and "Go" button for iframe windows
- Implemented functionality to open URLs in new tabs via the Go button
- Adjusted window content height to accommodate the URL toolbar

### New Winamp Application
- Created authentic Winamp-style music player component
- Added support for YouTube playlist URL input
- Positioned as desktop icon with proper window management

### Desktop Icon Improvements
- Fixed desktop icon click detection with proper CSS classes
- Enhanced desktop click handling to preserve icon functionality
- Added proper event handling to prevent interference with start menu

The architecture prioritizes developer experience with hot reloading, type safety throughout the stack, modular design for easy application additions, and authentic Windows 95 user experience with persistent window management.