import React from "react";
import { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import { Project } from './lib/types';

// Static projects data (previously from backend)
const staticProjects: Project[] = [
  {
    id: 1,
    title: "Blog Page Browser",
    description: "Personal blog showcasing technical articles and thoughts on web development.",
    technologies: "Gatsby, React, GraphQL",
    demoUrl: "project-lesstube",
    sourceUrl: "https://github.com/example/blog",
  },
  {
    id: 2,
    title: "LessTube",
    description: "Chrome extension for ad-free YouTube viewing with enhanced privacy features.",
    technologies: "JavaScript, Chrome Extension API",
    demoUrl: "https://chrome.google.com/webstore/detail/lesstube",
    sourceUrl: "https://github.com/example/lesstube",
  },
  {
    id: 3,
    title: "MentalQuest",
    description: "Mental health tracking and wellness application with personalized insights.",
    technologies: "React Native, Node.js, PostgreSQL",
    demoUrl: "https://mentalquest.app",
    sourceUrl: "https://github.com/example/mentalquest",
  },
  {
    id: 4,
    title: "LegacySPACE.mobile",
    description: "Mobile app for exploring retro computing history and legacy systems.",
    technologies: "Flutter, Firebase, Cloud Functions",
    demoUrl: "https://legacyspace.mobile",
    sourceUrl: "https://github.com/example/legacyspace-mobile",
  }
];

function App() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    console.log("App component mounted");
    // Load static projects data
    setProjects(staticProjects);
    console.log("Projects loaded:", staticProjects);
  }, []);

  console.log("App component rendering...");
  return (
    <div className="h-screen w-screen overflow-hidden" style={{backgroundColor: '#008080'}}>
      <Desktop projects={projects} />
    </div>
  );
}

export default App;
