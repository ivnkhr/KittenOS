import React, { useState, useEffect } from 'react';
import { Project } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';

// Import project-related icons - using Win95 style icons
import notepadIcon from '@/assets/icons/notepad.svg';
import globeIcon from '@/assets/icons/globe.svg';
import profileIcon from '@/assets/icons/profile.svg';
import computerIcon from '@/assets/icons/computer.svg';

interface ProjectsProps {
  onProjectOpen?: (projectId: string, projectUrl: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectOpen }) => {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // Function to get the right icon based on type
  const getIconByType = (iconType: string): string => {
    switch (iconType) {
      case 'notepad':
        return notepadIcon;
      case 'globe':
        return globeIcon;
      case 'profile':
        return profileIcon;
      case 'computer':
        return computerIcon;
      default:
        return computerIcon;
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading projects: {(error as any).message}</div>;
  }

  const handleProjectDoubleClick = (project: Project) => {
    if (project.demoUrl && onProjectOpen) {
      // Create a unique project window type
      const projectKey = `project-${project.title.toLowerCase().replace(/\s+/g, '-')}`;
      onProjectOpen(projectKey, project.demoUrl);
    }
  };

  return (
    <div className="p-2 bg-[#C0C0C0] h-full">
      <div className="text-xs font-bold mb-3 text-center border-b border-[#808080] pb-1">
        My Projects
      </div>
      <div className="grid grid-cols-2 gap-6 items-start">
        {projects?.map((project) => (
          <div 
            key={project.id} 
            className="flex flex-col items-center cursor-pointer hover:bg-[#0080C0] hover:text-white p-2 rounded select-none"
            onDoubleClick={() => handleProjectDoubleClick(project)}
          >
            <img 
              src={getIconByType(project.iconType)} 
              alt={project.title} 
              className="h-8 w-8 mb-1" 
            />
            <div className="text-xs text-center leading-tight max-w-16 break-words">
              {project.title}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-xs">
        <div className="border-[2px] border-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF] p-2 bg-white">
          <strong>Instructions:</strong><br />
          Double-click any project icon to open it in a new window.
        </div>
      </div>
    </div>
  );
};

export default Projects;
