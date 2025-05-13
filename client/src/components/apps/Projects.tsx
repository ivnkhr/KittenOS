import React, { useState, useEffect } from 'react';
import { Project } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';

// Import project-related icons
import htmlIcon from '@/assets/icons/html.svg';
import chatIcon from '@/assets/icons/chat.svg';
import chartIcon from '@/assets/icons/chart.svg';
import apiIcon from '@/assets/icons/api.svg';

const Projects: React.FC = () => {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // Function to get the right icon based on type
  const getIconByType = (iconType: string): string => {
    switch (iconType) {
      case 'html':
        return htmlIcon;
      case 'chat':
        return chatIcon;
      case 'chart':
        return chartIcon;
      case 'api':
        return apiIcon;
      default:
        return htmlIcon;
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading projects: {(error as any).message}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {projects?.map((project) => (
        <div key={project.id} className="bg-white p-3 border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080]">
          <div className="flex items-start mb-2">
            <img src={getIconByType(project.iconType)} alt={project.title} className="mr-3 h-10 w-10" />
            <div>
              <div className="font-bold text-lg">{project.title}</div>
              <div className="text-sm text-gray-700">{project.technologies}</div>
            </div>
          </div>
          <p className="mb-2">{project.description}</p>
          <div className="flex justify-between mt-2">
            <button className="px-2 py-1 border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] bg-[#C0C0C0] text-xs">
              View Demo
            </button>
            <button className="px-2 py-1 border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] bg-[#C0C0C0] text-xs">
              Source Code
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
