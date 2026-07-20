import React, { useState } from "react";
import { dockApps } from "#constants/index.js";
import { useOS } from "#store/OSContext.jsx";

const Dock = () => {
  const { windows, openWindow } = useOS();
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [bouncingId, setBouncingId] = useState(null);

  const getScale = (index) => {
    if (hoveredIndex === -1) return 1;
    const diff = Math.abs(hoveredIndex - index);
    if (diff === 0) return 1.35;
    if (diff === 1) return 1.16;
    if (diff === 2) return 1.05;
    return 1;
  };

  const getTranslateY = (index) => {
    if (hoveredIndex === -1) return 0;
    const diff = Math.abs(hoveredIndex - index);
    if (diff === 0) return -12;
    if (diff === 1) return -6;
    if (diff === 2) return -2;
    return 0;
  };

  const handleAppClick = (app) => {
    setBouncingId(app.id);
    setTimeout(() => setBouncingId(null), 400);

    if (app.canOpen) {
      openWindow(app.id);
    }
  };

  return (
    <div id="dock" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 select-none max-sm:hidden">
      <div 
        className="dock-container bg-black/35 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl p-2 flex items-end gap-2.5"
        onMouseLeave={() => setHoveredIndex(-1)}
      >
        {dockApps.map((app, index) => {
          const isOpen = windows[app.id]?.isOpen;
          const scale = getScale(index);
          const translateY = getTranslateY(index);
          const isBouncing = bouncingId === app.id;

          return (
            <div
              key={app.id}
              className="relative flex flex-col items-center group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => handleAppClick(app)}
              style={{
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transformOrigin: "bottom center",
              }}
            >
              {/* Tooltip with Triangle Pointer */}
              <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-[#1d1d1f]/90 backdrop-blur-xl text-white text-[11px] font-semibold px-3 py-1 rounded-lg shadow-xl pointer-events-none transition-all duration-200 whitespace-nowrap border border-white/15 -translate-y-1 group-hover:translate-y-0 flex flex-col items-center">
                <span>{app.name}</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1d1d1f]/90" />
              </div>

              {/* App Icon Container */}
              <div 
                className={`dock-icon w-12 h-12 3xl:w-16 3xl:h-16 flex items-center justify-center rounded-xl overflow-hidden transition-all duration-200 ${
                  isBouncing ? "animate-bounce" : ""
                }`}
              >
                <img
                  src={`/images/${app.icon}`}
                  alt={app.name}
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:brightness-105 transition-all duration-200"
                  draggable="false"
                />
              </div>

              {/* Active Dot Indicator */}
              {isOpen && (
                <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;
