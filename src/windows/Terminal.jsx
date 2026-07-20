import React, { useState, useEffect, useRef } from "react";
import { techStack } from "#constants/index.js";

const Terminal = () => {
  const [history, setHistory] = useState(() => [
    {
      type: "neofetch",
      val: {
        ascii: [
          "       .88888.      ",
          "     .88888888.     ",
          "    .8888888888.    ",
          "    888888888888    ",
          "    888888888888'   ",
          "    `8888888888'    ",
          "     `88888888'     ",
          "       `8888'       ",
        ],
        sysInfo: [
          { label: "user", value: "rupambhardwaj@macbook-pro" },
          { label: "OS", value: "macOS Portfolio 14.5 (Sonoma)" },
          { label: "Host", value: "MacBookPro18,2" },
          { label: "Kernel", value: "React 19 / Vite 7" },
          { label: "Uptime", value: "2 hours, 14 mins" },
          { label: "Shell", value: "bash 5.2.15" },
          { label: "Resolution", value: "2560x1600" },
          { label: "DE", value: "Antigravity Workspace" },
          { label: "CPU", value: "Apple M3 Max (14-core)" },
          { label: "Memory", value: "16 GB (LPDDR5)" },
        ],
      },
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const terminalEndRef = useRef(null);

  const runCommand = (cmd, isInitial = false) => {
    const lowerCmd = cmd.toLowerCase();
    let response = [];

    switch (lowerCmd) {
      case "help":
        response = [
          { type: "text", val: "Available commands:" },
          { type: "text", val: "  skills      - View technical skills and tech stack" },
          { type: "text", val: "  about       - Get biographical information about Rupam" },
          { type: "text", val: "  contact     - Display contact information and links" },
          { type: "text", val: "  neofetch    - Show system configurations and info" },
          { type: "text", val: "  clear       - Clear the terminal screen" },
        ];
        break;
      case "skills":
        response = [
          { type: "text", val: "── Tech Stack Profile ──" },
          ...techStack.flatMap((stack) => [
            { type: "header", val: `\n[${stack.category}]` },
            ...stack.items.map((item) => ({ type: "text", val: `  ✔  ${item}` })),
          ]),
        ];
        break;
      case "about":
        response = [
          { type: "text", val: "Hello, I'm Rupam Bhardwaj!" },
          { type: "text", val: "I'm an aspiring Creative Developer with a passion for web and mobile development, UI animations, and AI integration." },
          { type: "text", val: "Education: B.Tech in Computer Science & Engineering (2023 - 2027 Ongoing | SGPA: 7.8)." },
          { type: "text", val: "Focus: Building clean, efficient, scalable frontend & mobile solutions." },
        ];
        break;
      case "contact":
        response = [
          { type: "text", val: "Feel free to connect with me:" },
          { type: "text", val: "  Email:    rupambhardwaj4@gmail.com" },
          { type: "text", val: "  GitHub:   https://github.com/rupambhardwaj4" },
          { type: "text", val: "  LinkedIn: https://www.linkedin.com/in/rupam-bhardwaj-260b61319/" },
        ];
        break;
      case "neofetch":
        response = [
          {
            type: "neofetch",
            val: {
              ascii: [
                "       .88888.      ",
                "     .88888888.     ",
                "    .8888888888.    ",
                "    888888888888    ",
                "    888888888888'   ",
                "    `8888888888'    ",
                "     `88888888'     ",
                "       `8888'       ",
              ],
              sysInfo: [
                { label: "user", value: "rupambhardwaj@macbook-pro" },
                { label: "OS", value: "macOS Portfolio 14.5 (Sonoma)" },
                { label: "Host", value: "MacBookPro18,2" },
                { label: "Kernel", value: "React 19 / Vite 7" },
                { label: "Uptime", value: "2 hours, 14 mins" },
                { label: "Shell", value: "bash 5.2.15" },
                { label: "Resolution", value: "2560x1600" },
                { label: "DE", value: "Antigravity Workspace" },
                { label: "CPU", value: "Apple M3 Max (14-core)" },
                { label: "Memory", value: "16 GB (LPDDR5)" },
              ],
            },
          },
        ];
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        response = [{ type: "error", val: `bash: command not found: ${cmd}` }];
    }

    if (isInitial) {
      setHistory(response);
    } else {
      setHistory((prev) => [
        ...prev,
        { type: "input", val: cmd },
        ...response,
      ]);
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const trimmed = inputVal.trim();
      if (trimmed) {
        runCommand(trimmed);
      }
      setInputVal("");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#1c1c1e] text-[#f8f8f2] font-mono text-xs p-4 h-96 overflow-auto select-text selection:bg-gray-700 selection:text-white">
      {/* Scrollable Output */}
      <div className="flex-1 space-y-2 overflow-y-auto mb-2 pr-1">
        {history.map((line, i) => {
          if (line.type === "input") {
            return (
              <div key={i} className="flex items-center text-white font-semibold">
                <span className="text-green-400 mr-2">rupambhardwaj@macbook-pro:~ $</span>
                <span>{line.val}</span>
              </div>
            );
          }
          if (line.type === "header") {
            return (
              <div key={i} className="text-[#a6e22e] font-bold mt-2">
                {line.val}
              </div>
            );
          }
          if (line.type === "error") {
            return (
              <div key={i} className="text-[#f92672]">
                {line.val}
              </div>
            );
          }
          if (line.type === "neofetch") {
            return (
              <div key={i} className="flex flex-col sm:flex-row gap-4 border-b border-gray-800 pb-3 mt-1">
                {/* ASCII Logo */}
                <pre className="text-[#a6e22e] font-bold leading-tight select-none flex-none">
                  {line.val.ascii.join("\n")}
                </pre>
                {/* System Specs */}
                <div className="flex flex-col justify-center space-y-1">
                  <div className="text-[#66d9ef] font-bold border-b border-gray-800 pb-1 mb-1">
                    {line.val.sysInfo[0].value}
                  </div>
                  {line.val.sysInfo.slice(1).map((info, idx) => (
                    <div key={idx} className="flex">
                      <span className="text-[#f92672] font-semibold w-24 flex-none">{info.label}:</span>
                      <span className="text-[#f8f8f2]">{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <div key={i} className="whitespace-pre-wrap leading-relaxed">
              {line.val}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Prompt */}
      <div className="flex items-center border-t border-gray-800 pt-2 flex-none">
        <span className="text-green-400 mr-2 font-semibold">rupambhardwaj@macbook-pro:~ $</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white"
          autoFocus
          placeholder="Type a command (e.g., 'help')..."
        />
      </div>
    </div>
  );
};

export default Terminal;
