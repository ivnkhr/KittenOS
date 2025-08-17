import React from 'react';

const MyComputer: React.FC = () => {
  const githubLink = "https://github.com/ivnkhr/KittenOS"; // Replace with your GitHub repo link

  return (
    <div className="p-4 bg-white border-[2px] border-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF] overflow-y-auto font-['MS_Sans_Serif',sans-serif] text-xs">
      <div className="grid grid-cols-1 gap-4">
        {/* User Information */}
        <div className="border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] p-3 bg-[#D4D0C8]">
          <div className="font-bold mb-2">User Information</div>
          <div>
            <p><span className="font-semibold">Name:</span> Guest</p>
            <p><span className="font-semibold">Status:</span> Online</p>
            <p><span className="font-semibold">Last Login:</span> Just now</p>
          </div>
        </div>
        
        {/* Project Information */}
        <div className="border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] p-3 bg-[#D4D0C8]">
          <div className="font-bold mb-2">Project Information</div>
          <div>
            <p><span className="font-semibold">Name:</span> KittenOS - Windows 96 Simulation</p>
            <p><span className="font-semibold">Description:</span> A fully vibe coded web-based simulation of the Windows 96 operating system interface.</p>
            <p><span className="font-semibold">Technologies Used:</span> Firebase Studio, Gemini, React, Tailwind CSS</p>
            <p>
              <span className="font-semibold">Source Code:</span>
              {' '}
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0000FF] underline hover:no-underline"
              >
                {githubLink}
              </a>
            </p>
          </div>
        </div>

        {/* General Info Placeholder */}
        <div className="border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] p-3 bg-[#D4D0C8]">
          <div className="font-bold mb-2">General Status</div>
          <div>
            <p>System Status: Operational</p>
            <p>Network Connectivity: Stable</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyComputer;
