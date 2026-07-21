import React, { useState, useEffect, useRef } from "react";
import { useOS } from "#store/OSContext.jsx";

const WindowWrapper = ({ id, title, children, widthClass = "w-2xl", heightClass = "h-auto", containerId = "" }) => {
  const { windows, focusedWindow, closeWindow, minimizeWindow, toggleMaximizeWindow, focusWindow } = useOS();
  const windowState = windows[id];

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    // Only drag on left click
    if (e.button !== 0) return;
    // Don't drag if clicking buttons
    if (e.target.closest(".window-control-btn")) return;
    // Don't drag if maximized
    if (windowState && windowState.isMaximized) return;

    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    focusWindow(id);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleHeaderDoubleClick = () => {
    toggleMaximizeWindow(id);
  };

  if (!windowState || !windowState.isOpen) return null;

  const isFocused = focusedWindow === id;

  const maximizedStyles = "fixed! top-[36px]! left-0! right-0! bottom-0! w-full! h-[calc(100vh-36px)]! rounded-none! transform-none! max-w-full!";
  const normalStyles = `top-1/2 left-1/2 max-w-[92vw] max-h-[85vh] ${widthClass} ${heightClass}`;

  return (
    <div
      ref={windowRef}
      id={containerId || id}
      onMouseDown={() => focusWindow(id)}
      style={{
        transform: windowState.isMaximized
          ? "none"
          : `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
        zIndex: windowState.zIndex,
        display: windowState.isMinimized ? "none" : "flex",
      }}
      className={`absolute flex flex-col bg-white border border-gray-200/80 shadow-2xl rounded-xl overflow-hidden transition-shadow duration-300 ${
        windowState.isMaximized ? maximizedStyles : normalStyles
      } ${isFocused ? "shadow-black/25 ring-1 ring-black/5" : "shadow-black/10 opacity-95"}`}
    >
      {/* Window Title Bar */}
      <div
        id="window-header"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleHeaderDoubleClick}
        className="flex items-center justify-between px-4 py-2.5 bg-[#f6f6f6] border-b border-[#e5e5e5] select-none text-sm text-gray-700 font-medium cursor-default flex-none"
      >
        {/* Controls */}
        <div id="window-controls" className="flex items-center gap-2 w-1/4">
          <button
            onClick={() => closeWindow(id)}
            className="close window-control-btn flex items-center justify-center relative group"
            aria-label="Close"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] text-red-950 font-bold absolute pointer-events-none">×</span>
          </button>
          <button
            onClick={() => minimizeWindow(id)}
            className="minimize window-control-btn flex items-center justify-center relative group"
            aria-label="Minimize"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] text-amber-950 font-bold absolute pointer-events-none">−</span>
          </button>
          <button
            onClick={() => toggleMaximizeWindow(id)}
            className="maximize window-control-btn flex items-center justify-center relative group"
            aria-label="Maximize"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[7px] text-green-950 font-bold absolute pointer-events-none">↕</span>
          </button>
        </div>

        {/* Title */}
        <div className="flex-1 text-center text-xs font-semibold text-[#4a4a4a] select-none truncate">
          {title}
        </div>

        {/* Placeholder to balance layout */}
        <div className="w-1/4"></div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-white flex flex-col min-h-0">
        {children}
      </div>
    </div>
  );
};

export default WindowWrapper;
