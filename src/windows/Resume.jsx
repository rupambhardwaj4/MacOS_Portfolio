import React from "react";

const Resume = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/files/resume.pdf";
    link.download = "Rupam_Bhardwaj_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col bg-[#525659] w-full h-full select-none text-gray-800">
      {/* PDF Viewer toolbar */}
      <div className="h-10 bg-[#323639] flex items-center justify-between px-4 text-white text-xs flex-none shadow-md">
        <div className="flex items-center gap-2.5">
          <span className="font-semibold tracking-wide text-white/90">Rupam_Bhardwaj_Resume.pdf</span>
        </div>
        {/* Page / Zoom controls */}
        <div className="flex items-center gap-4 bg-[#202124] px-3 py-1 rounded-md text-[11px] text-white/80">
          <button className="hover:text-white" disabled>−</button>
          <span>100%</span>
          <button className="hover:text-white" disabled>+</button>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-[#4a4d50] hover:bg-[#5a5d60] text-white px-2.5 py-1 rounded-md font-medium text-[11px] transition-colors cursor-pointer"
            title="Print Resume"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 bg-[#007aff] hover:bg-[#007aff]/90 text-white px-3 py-1 rounded-md font-semibold text-[11px] transition-colors cursor-pointer shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      {/* PDF Page Container */}
      <div id="resume-print-area" className="flex-1 p-6 overflow-y-auto flex flex-col items-center bg-[#525659] space-y-6">
        {/* PAGE 1 */}
        <div className="resume-page w-full max-w-[720px] bg-white shadow-2xl p-8 sm:p-9 flex flex-col font-serif select-text text-[10px] sm:text-[10.5px] text-black leading-tight relative">
          {/* Header */}
          <div className="text-center pb-1 border-b border-gray-300">
            <h1 className="text-2xl font-bold tracking-widest uppercase text-black font-serif">RUPAM BHARDWAJ</h1>
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-0.5 text-[9.5px] text-gray-800 mt-1 font-sans">
              <span>📞 +91-8587937089</span>
              <span>•</span>
              <a href="mailto:rupambhardwaj4@gmail.com" className="hover:underline text-blue-800">rupambhardwaj4@gmail.com</a>
              <span>•</span>
              <a href="https://www.linkedin.com/in/rupam-bhardwaj-260b61319/" target="_blank" rel="noreferrer" className="hover:underline text-blue-800">LinkedIn</a>
              <span>•</span>
              <a href="https://github.com/rupambhardwaj4" target="_blank" rel="noreferrer" className="hover:underline text-blue-800">GitHub</a>
              <span>•</span>
              <a href="https://bhardwajportfolio.netlify.app/" target="_blank" rel="noreferrer" className="hover:underline text-blue-800">Portfolio</a>
            </div>
            <p className="text-[9.5px] text-gray-700 font-sans mt-0.5">Delhi, India</p>
          </div>

          {/* SUMMARY */}
          <div className="resume-section mt-2.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1 font-sans">
              Summary
            </h2>
            <p className="text-[10px] leading-snug text-justify font-serif">
              Detail-oriented Computer Science student with hands-on experience in frontend development, AI integration, and structured data workflows. Proficient in English (written and verbal), with a strong foundation in logical thinking, web technologies, and modern tooling. Eager to contribute to LLM training pipelines through accurate data annotation, evaluation, and feedback — bringing both technical awareness of AI systems and meticulous attention to quality.
            </p>
          </div>

          {/* EDUCATION */}
          <div className="resume-section mt-2.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1 font-sans">
              Education
            </h2>
            
            <div className="space-y-1.5 font-serif">
              <div>
                <div className="flex justify-between font-bold text-[10.5px]">
                  <span>Meerut Institute of Technology</span>
                  <span>Meerut, India</span>
                </div>
                <div className="flex justify-between italic text-[10px]">
                  <span>Bachelor of Technology in Computer Science Engineering</span>
                  <span>Sept 2023 – May 2027</span>
                </div>
                <ul className="list-disc pl-4 text-[9.5px] mt-0.5 space-y-0.5">
                  <li>Relevant Coursework: Data Structures, Algorithms, Web Development, Database Management, OOP</li>
                  <li>Current SGPA: 7.8</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[10.5px]">
                  <span>St. Columbus School</span>
                  <span>Delhi, India</span>
                </div>
                <div className="flex justify-between italic text-[10px]">
                  <span>Senior Secondary Education — CBSE</span>
                  <span>2021 – 2023</span>
                </div>
                <ul className="list-disc pl-4 text-[9.5px] mt-0.5 space-y-0.5">
                  <li>Grade: 9.4/10 (Secondary) — 7.8/10 (Senior Secondary) — Strong foundation in Mathematics & CS</li>
                </ul>
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="resume-section mt-2.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1 font-sans">
              Experience
            </h2>

            <div className="space-y-2 font-serif">
              <div>
                <div className="flex justify-between font-bold text-[10.5px]">
                  <span>Frontend Developer Intern</span>
                  <span>July 2025</span>
                </div>
                <div className="flex justify-between italic text-[10px]">
                  <span>Qualithar Consultancy (OPC) Pvt. Ltd.</span>
                  <span>Noida, Uttar Pradesh</span>
                </div>
                <ul className="list-disc pl-4 text-[9.5px] mt-0.5 space-y-0.5">
                  <li>Developed and maintained qtconsultancy.in, delivering production-ready frontend solutions</li>
                  <li>Collaborated with the development team on UI/UX design and implementation</li>
                  <li>Applied structured workflows for code review, documentation, and quality assurance</li>
                  <li>Received official NOC and full permission to showcase work in professional portfolio</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[10.5px]">
                  <span>Frontend Developer</span>
                  <span>Sept 2024 – Nov 2024</span>
                </div>
                <div className="flex justify-between italic text-[10px]">
                  <span>QT Consultants Limited</span>
                  <span>Remote</span>
                </div>
                <ul className="list-disc pl-4 text-[9.5px] mt-0.5 space-y-0.5">
                  <li>Developed responsive web interfaces using React, HTML5, and CSS3</li>
                  <li>Implemented user personas and conducted user research to enhance application usability</li>
                  <li>Collaborated with cross-functional teams ensuring code quality and adherence to web standards</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[10.5px]">
                  <span>Web Development Virtual Intern</span>
                  <span>July 2024 – Aug 2024</span>
                </div>
                <div className="flex justify-between italic text-[10px]">
                  <span>Future Skills Prime (NASSCOM) — 6-Week Program</span>
                  <span>Remote</span>
                </div>
                <ul className="list-disc pl-4 text-[9.5px] mt-0.5 space-y-0.5">
                  <li>Completed intensive 6-week full-stack web development program; built and deployed Zeost web app</li>
                  <li>Followed industry-standard development practices: Git/GitHub, CI/CD, Netlify deployment</li>
                  <li>Demonstrated ability to work independently, meet deadlines, and follow structured workflows</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[10.5px]">
                  <span>Android Developer Virtual Intern</span>
                  <span>Jan 2025 – Mar 2025</span>
                </div>
                <div className="flex justify-between italic text-[10px]">
                  <span>EduSkills & Google for Developers</span>
                  <span>Remote</span>
                </div>
                <ul className="list-disc pl-4 text-[9.5px] mt-0.5 space-y-0.5">
                  <li>Completed 10-week intensive Android Developer training under Skill India & Google for Developers</li>
                  <li>Developed Android applications following modern best practices and structured learning guidelines</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[10.5px]">
                  <span>Frontend Developer</span>
                  <span>2024</span>
                </div>
                <div className="flex justify-between italic text-[10px]">
                  <span>Hackspire 2024 — Hackathon</span>
                  <span>Delhi, India</span>
                </div>
                <ul className="list-disc pl-4 text-[9.5px] mt-0.5 space-y-0.5">
                  <li>Built responsive web applications under tight time constraints with high attention to detail</li>
                  <li>Improved user engagement by 40% through CSS3 animations and interactive JavaScript UI</li>
                </ul>
              </div>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="resume-section mt-2.5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1 font-sans">
              Projects
            </h2>

            <div className="space-y-1.5 font-serif">
              <div>
                <div className="font-bold text-[10.5px]">
                  <span>Campus Code</span>
                  <span className="font-normal italic text-[9.5px] text-gray-700"> | HTML5, CSS3, JavaScript, Node.js, Express.js, EJS, SQLite, PostgreSQL | </span>
                  <a href="https://github.com/rupambhardwaj4" target="_blank" rel="noreferrer" className="text-blue-800 hover:underline">GitHub</a>
                </div>
                <ul className="list-disc pl-4 text-[9.5px] mt-0.5">
                  <li>Campus-focused web platform with role-based dashboards, responsive UI, forum features, and scalable full-stack architecture</li>
                </ul>
              </div>

              <div>
                <div className="font-bold text-[10.5px]">
                  <span>Zeost</span>
                  <span className="font-normal italic text-[9.5px] text-gray-700"> | React, Framer Motion, Netlify | </span>
                  <a href="https://zeost.netlify.app/" target="_blank" rel="noreferrer" className="text-blue-800 hover:underline">Live</a>
                  <span> • </span>
                  <a href="https://github.com/rupambhardwaj4/Fooddelivery" target="_blank" rel="noreferrer" className="text-blue-800 hover:underline">GitHub</a>
                </div>
                <ul className="list-disc pl-4 text-[9.5px] mt-0.5">
                  <li>Modern landing page prototype with smooth animations and responsive layout; built during NASSCOM internship following professional CI/CD deployment workflows</li>
                </ul>
              </div>

              <div>
                <div className="font-bold text-[10.5px]">
                  <span>Yum Maker</span>
                  <span className="font-normal italic text-[9.5px] text-gray-700"> | HTML5, CSS3, Netlify | </span>
                  <a href="https://yum-maker.netlify.app/" target="_blank" rel="noreferrer" className="text-blue-800 hover:underline">Live</a>
                  <span> • </span>
                  <a href="https://github.com/rupambhardwaj4/Yum-Maker" target="_blank" rel="noreferrer" className="text-blue-800 hover:underline">GitHub</a>
                </div>
                <ul className="list-disc pl-4 text-[9.5px] mt-0.5">
                  <li>Recipe generator web app with clean UI/UX; achieved 95+ Google PageSpeed score through performance optimization techniques</li>
                </ul>
              </div>

              <div>
                <div className="font-bold text-[10.5px]">
                  <span>Velliton HR</span>
                  <span className="font-normal italic text-[9.5px] text-gray-700"> | HTML5, CSS3, Netlify | </span>
                  <a href="https://vellitonhrcare.netlify.app/" target="_blank" rel="noreferrer" className="text-blue-800 hover:underline">Live</a>
                  <span> • </span>
                  <a href="https://github.com/rupambhardwaj4/VellitonHr" target="_blank" rel="noreferrer" className="text-blue-800 hover:underline">GitHub</a>
                </div>
                <ul className="list-disc pl-4 text-[9.5px] mt-0.5">
                  <li>HR management platform streamlining recruitment, payroll, and compliance with a clean, process-driven interface</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 2 */}
        <div className="resume-page w-full max-w-[720px] bg-white shadow-2xl p-8 sm:p-9 flex flex-col font-serif select-text text-[10px] sm:text-[10.5px] text-black leading-tight relative print-page-break">
          {/* TECHNICAL SKILLS */}
          <div className="resume-section">
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 font-sans">
              Technical Skills
            </h2>
            <ul className="space-y-1 text-[10px]">
              <li><strong className="font-sans">Languages:</strong> JavaScript, Python, HTML5, CSS3, C, Java</li>
              <li><strong className="font-sans">Frontend:</strong> React.js, Flutter, Framer Motion, Responsive Web Design, CSS Animations, jQuery</li>
              <li><strong className="font-sans">Tools & Platforms:</strong> Git, GitHub, Netlify, Vercel, Figma, Adobe XD, Chrome DevTools</li>
              <li><strong className="font-sans">Core Competencies:</strong> UI/UX Design, RESTful APIs, Web Performance Optimization, Agile Development, Version Control, CI/CD Deployment, Cross-browser Testing, Mobile-First Design</li>
              <li><strong className="font-sans">AI/ML Awareness:</strong> OpenAI API integration, LLM concepts, prompt evaluation, AI-powered app development</li>
            </ul>
          </div>

          {/* CERTIFICATIONS & ACHIEVEMENTS */}
          <div className="resume-section mt-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 font-sans">
              Certifications & Achievements
            </h2>
            <ul className="space-y-1.5 text-[10px]">
              <li>
                <strong>Web Development Training</strong> — IBM (July 2025) {" "}
                <a href="https://courses.ibmmooc.skillsnetwork.site/certificates/c33e762fe34445e7b86a4664ac8e33e6" target="_blank" rel="noreferrer" className="text-blue-800 hover:underline font-sans text-[9.5px]">↗ View</a>
              </li>
              <li>
                <strong>Next Gen Employability Program</strong> — FullStack Web Development with AI Tools
              </li>
              <li>
                <strong>Python Zero to Hero</strong> — GUVI (Oct 2024) {" "}
                <a href="https://www.guvi.in/verify-certificate?id=n2713ci56Zw9519Gf9" target="_blank" rel="noreferrer" className="text-blue-800 hover:underline font-sans text-[9.5px]">↗ View</a>
              </li>
              <li>
                <strong>Cybersecurity Essentials</strong> — Cisco Networking Academy (Aug 2023) {" "}
                <a href="https://www.credly.com/badges/13e7d8a8-4ba3-4e3f-bb24-eae59c8f7bfc/linked_in_profile" target="_blank" rel="noreferrer" className="text-blue-800 hover:underline font-sans text-[9.5px]">↗ View</a>
              </li>
              <li>
                <strong>Android Developer Virtual Internship</strong> — Google for Developers (Jan–Mar 2025)
              </li>
              <li>
                <strong>PBEL Virtual Internship Certificate</strong> — Future Skills Prime (NASSCOM), 6-week program
              </li>
              <li>
                <strong>MongoDB Certifications</strong> — Credly Verified (Aug 2023)
              </li>
            </ul>
          </div>

          {/* RELEVANT SKILLS FOR DATA ANNOTATION & LLM TRAINING */}
          <div className="resume-section mt-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 font-sans">
              Relevant Skills for Data Annotation & LLM Training
            </h2>
            <ul className="space-y-1.5 text-[10px]">
              <li>
                <strong className="font-sans">English Proficiency:</strong> Excellent written and reading communication; ability to evaluate nuanced text quality
              </li>
              <li>
                <strong className="font-sans">Attention to Detail:</strong> Demonstrated through 95+ PageSpeed scores, code reviews, and production deployments
              </li>
              <li>
                <strong className="font-sans">Independent Work:</strong> Multiple remote internships and freelance projects completed with minimal supervision
              </li>
              <li>
                <strong className="font-sans">AI Familiarity:</strong> Hands-on experience integrating OpenAI APIs; understanding of LLM inputs and outputs
              </li>
              <li>
                <strong className="font-sans">Structured Thinking:</strong> Background in algorithms, data structures, and logic-driven problem solving
              </li>
              <li>
                <strong className="font-sans">Stable Remote Setup:</strong> Reliable internet, comfortable with async/remote collaboration tools
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
