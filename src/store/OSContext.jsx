/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import { WINDOW_CONFIG, INITIAL_Z_INDEX, locations } from "#constants/index.js";

const OSContext = createContext();

export const OSProvider = ({ children }) => {
  const [windows, setWindows] = useState(() => {
    const initial = {};
    Object.keys(WINDOW_CONFIG).forEach((key) => {
      initial[key] = {
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: INITIAL_Z_INDEX,
        data: null,
      };
    });
    return initial;
  });

  const [maxZIndex, setMaxZIndex] = useState(INITIAL_Z_INDEX);
  const [focusedWindow, setFocusedWindow] = useState(null);
  const [isBooted, setIsBooted] = useState(false);

  // Finder state
  const [finderPath, setFinderPathState] = useState(locations.work);
  const [finderHistory, setFinderHistory] = useState([locations.work]);
  const [finderHistoryIndex, setFinderHistoryIndex] = useState(0);

  const focusWindow = (id) => {
    setFocusedWindow(id);
    setWindows((prev) => {
      if (prev[id].zIndex === maxZIndex && Object.keys(prev).filter(k => prev[k].isOpen && k !== id).length === 0) {
        return prev;
      }
      const nextZ = maxZIndex + 1;
      setMaxZIndex(nextZ);
      return {
        ...prev,
        [id]: {
          ...prev[id],
          zIndex: nextZ,
        },
      };
    });
  };

  const openWindow = (id, data = null) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setFocusedWindow(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
        data: data || prev[id].data,
      },
    }));
  };

  const closeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
      },
    }));
    if (focusedWindow === id) {
      setFocusedWindow(null);
    }
  };

  const minimizeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }));
    if (focusedWindow === id) {
      setFocusedWindow(null);
    }
  };

  const toggleMaximizeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
      },
    }));
  };

  const navigateFinder = (newPath) => {
    const newHistory = finderHistory.slice(0, finderHistoryIndex + 1);
    newHistory.push(newPath);
    setFinderHistory(newHistory);
    setFinderHistoryIndex(newHistory.length - 1);
    setFinderPathState(newPath);
  };

  const goFinderBack = () => {
    if (finderHistoryIndex > 0) {
      const newIndex = finderHistoryIndex - 1;
      setFinderHistoryIndex(newIndex);
      setFinderPathState(finderHistory[newIndex]);
    }
  };

  const goFinderForward = () => {
    if (finderHistoryIndex < finderHistory.length - 1) {
      const newIndex = finderHistoryIndex + 1;
      setFinderHistoryIndex(newIndex);
      setFinderPathState(finderHistory[newIndex]);
    }
  };

  const bootSystem = () => {
    setIsBooted(true);
  };

  return (
    <OSContext.Provider
      value={{
        windows,
        focusedWindow,
        isBooted,
        finderPath,
        finderHistory,
        finderHistoryIndex,
        openWindow,
        closeWindow,
        minimizeWindow,
        toggleMaximizeWindow,
        focusWindow,
        navigateFinder,
        goFinderBack,
        goFinderForward,
        bootSystem,
      }}
    >
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error("useOS must be used within an OSProvider");
  }
  return context;
};
