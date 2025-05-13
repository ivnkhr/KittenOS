import React from 'react';

const CV: React.FC = () => {
  return (
    <div className="font-['MS_Sans_Serif',sans-serif] text-xs">
      <div className="font-bold mb-4 text-xl">John Doe - Full Stack Developer</div>
      
      <div className="mb-4">
        <div className="font-bold underline">SUMMARY</div>
        <p className="mb-2">Experienced Full Stack Developer with expertise in modern web technologies. Passionate about creating responsive and user-friendly applications.</p>
      </div>
      
      <div className="mb-4">
        <div className="font-bold underline">SKILLS</div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="font-bold">Frontend:</div>
            <ul className="list-disc pl-5">
              <li>HTML5, CSS3, JavaScript</li>
              <li>React, Vue.js</li>
              <li>Tailwind CSS, Bootstrap</li>
              <li>TypeScript</li>
            </ul>
          </div>
          <div>
            <div className="font-bold">Backend:</div>
            <ul className="list-disc pl-5">
              <li>Node.js, Express</li>
              <li>Python, Django</li>
              <li>MongoDB, PostgreSQL</li>
              <li>RESTful APIs</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="font-bold underline">EXPERIENCE</div>
        
        <div className="mb-2">
          <div className="font-bold">Senior Full Stack Developer</div>
          <div>TechCorp Inc. | 2020 - Present</div>
          <ul className="list-disc pl-5">
            <li>Developed and maintained client-facing web applications</li>
            <li>Implemented responsive designs and optimized performance</li>
            <li>Collaborated with design and product teams</li>
          </ul>
        </div>
        
        <div className="mb-2">
          <div className="font-bold">Full Stack Developer</div>
          <div>WebSolutions Ltd. | 2017 - 2020</div>
          <ul className="list-disc pl-5">
            <li>Built RESTful APIs and integrated with frontend applications</li>
            <li>Implemented authentication systems and database schemas</li>
            <li>Deployed applications to cloud platforms</li>
          </ul>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="font-bold underline">EDUCATION</div>
        <div className="font-bold">BS in Computer Science</div>
        <div>University of Technology | 2013 - 2017</div>
      </div>
    </div>
  );
};

export default CV;
