import React from "react";
import { useOS } from "#store/OSContext.jsx";
import { locations } from "#constants/index.js";

const Finder = () => {
  const {
    finderPath,
    finderHistoryIndex,
    finderHistory,
    navigateFinder,
    goFinderBack,
    goFinderForward,
    openWindow,
  } = useOS();

  const handleItemDoubleClick = (item) => {
    if (item.kind === "folder") {
      navigateFinder(item);
    } else if (item.kind === "file") {
      if (item.fileType === "txt") {
        openWindow("txtfile", item);
      } else if (item.fileType === "img") {
        openWindow("imgfile", item);
      } else if (item.fileType === "pdf") {
        openWindow("resume", item);
      } else if (item.fileType === "url" || item.fileType === "fig") {
        if (item.href) {
          window.open(item.href, "_blank");
        }
      }
    }
  };

  const isBackDisabled = finderHistoryIndex === 0;
  const isForwardDisabled = finderHistoryIndex === finderHistory.length - 1;

  // Helper to determine if a sidebar item is active
  const isActive = (type) => {
    // Traverse parent nodes or check type
    return finderPath.type === type || (finderPath.parent && finderPath.parent.type === type);
  };

  return (
    <div className="flex flex-1 h-full select-none text-gray-800">
      {/* Finder Sidebar */}
      <aside className="w-48 bg-[#f3f1f1] border-r border-[#e5e5e5] flex flex-col p-3 space-y-4">
        <div>
          <h3 className="text-[11px] font-bold text-gray-400/80 uppercase px-3 mb-1">Favorites</h3>
          <ul className="space-y-0.5">
            {Object.values(locations).map((loc) => {
              const active = isActive(loc.type);
              return (
                <li
                  key={loc.id}
                  onClick={() => navigateFinder(loc)}
                  className={`flex! flex-row! items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium cursor-default transition-colors ${
                    active
                      ? "bg-[#007aff]/15 text-[#007aff]"
                      : "text-[#4a4a4a] hover:bg-[#e4e2e2]"
                  }`}
                >
                  <img src={loc.icon} alt={loc.name} className="w-4 h-4 object-contain flex-none" />
                  <span>{loc.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Finder Content Area */}
      <main className="flex-1 flex flex-col bg-white">
        {/* Finder Toolbar */}
        <header className="h-11 border-b border-[#e5e5e5] bg-[#f6f6f6] px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Back / Forward */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={goFinderBack}
                disabled={isBackDisabled}
                className={`p-1 rounded hover:bg-gray-200/60 disabled:opacity-30 disabled:hover:bg-transparent`}
                aria-label="Back"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goFinderForward}
                disabled={isForwardDisabled}
                className={`p-1 rounded hover:bg-gray-200/60 disabled:opacity-30 disabled:hover:bg-transparent`}
                aria-label="Forward"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Path Title */}
            <span className="text-xs font-bold text-gray-700">{finderPath.name}</span>
          </div>

          <div className="text-[11px] text-gray-400 font-medium">
            {finderPath.children?.length || 0} items
          </div>
        </header>

        {/* Folder items grid */}
        <div className="flex-1 p-6 overflow-auto bg-white">
          {finderPath.children && finderPath.children.length > 0 ? (
            <ul className="grid grid-cols-3 sm:grid-cols-4 gap-6 p-2 w-full auto-rows-max items-start">
              {finderPath.children.map((item) => (
                <li
                  key={item.id}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100/90 cursor-default select-none border border-transparent hover:border-gray-200/60 w-28 group text-center transition-all duration-200 hover:scale-105"
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-14 h-14 object-contain group-hover:scale-105 transition-transform duration-200"
                    draggable="false"
                  />
                  <span className="text-[11px] font-semibold text-center text-gray-800 line-clamp-2 w-full leading-tight">
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <svg className="w-12 h-12 stroke-current opacity-40 mb-2" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9" />
              </svg>
              <p className="text-xs font-medium">This folder is empty</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Finder;
