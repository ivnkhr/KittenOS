import React from "react";
import { Project } from '../../lib/types';

interface ProjectsProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export default function Projects({ projects, onOpenProject }: ProjectsProps) {
  return (
    <div className="p-4 h-full">
      <h2 className="text-lg font-bold mb-4">My Projects</h2>
      <div className="grid gap-4 overflow-auto max-h-full">
        {projects.map((project) => (
          <div key={project.id} className="border border-gray-300 p-3 rounded bg-white">
            <h3 className="font-semibold text-md mb-2">{project.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{project.description}</p>
            <p className="text-xs text-gray-500 mb-3">
              <strong>Technologies:</strong> {project.technologies}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => onOpenProject(project)}
                className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                Open Demo
              </button>
              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                >
                  Source Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}