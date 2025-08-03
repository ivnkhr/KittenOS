import React from "react";
import { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import { Project } from './lib/types';

import turnOnSound from './assets/sounds/turnon.mp3';
import closeSound from './assets/sounds/close.mp3';

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
  const [animationState, setAnimationState] = useState('off'); // off, on, shutting-down

  const turnOnAudio = new Audio(turnOnSound);
  const closeAudio = new Audio(closeSound);

  useEffect(() => {
    // Load static projects data
    setProjects(staticProjects);
    // Start the boot-up animation
    setAnimationState('on');
    console.log('App initialized, animationState set to: on');
    turnOnAudio.play();
  }, []);

  const handleShutdown = () => {
    setAnimationState('shutting-down');
    console.log('Shutdown initiated, animationState set to: shutting-down');
    closeAudio.play();
  };

  const handleAnimationEnd = () => {
    if (animationState === 'shutting-down') {
      setAnimationState('off');
      console.log('Animation ended, animationState set to: off');
    }
  };

  const handleScreenClick = () => {
    console.log('Screen clicked. Current animationState:', animationState);
    if (animationState === 'off' || animationState === 'shutting-down') {
      setAnimationState('on');
      console.log('Screen turned on, animationState set to: on');
      turnOnAudio.play();
    }
  };

  let desktopClassName = 'h-full w-full';
  if (animationState === 'on') {
    desktopClassName += ' crt-on';
  } else if (animationState === 'shutting-down') {
    desktopClassName += ' crt-off';
  } else {
    desktopClassName += ' hidden';
  }

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-black"
      onClick={handleScreenClick}
    >
      <div className={desktopClassName} onAnimationEnd={handleAnimationEnd}>
        <Desktop projects={projects} onShutdown={handleShutdown} />
      </div>
    </div>
  );
}

export default App;
