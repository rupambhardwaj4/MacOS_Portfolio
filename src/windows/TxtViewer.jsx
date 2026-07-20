import React from "react";
import { useOS } from "#store/OSContext.jsx";

const TxtViewer = () => {
  const { windows } = useOS();
  const fileData = windows.txtfile.data;

  if (!fileData) {
    return (
      <div className="flex-1 p-6 text-center text-xs text-gray-400 bg-white">
        No text file open
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white w-full h-full select-text">
      {/* Editor toolbar */}
      <div className="h-9 bg-[#f5f5f7] border-b border-[#e5e5e5] px-4 flex items-center gap-4 flex-none select-none">
        {/* Formatting controls (decorative macOS TextEdit bar) */}
        <div className="flex items-center gap-2 border-r border-gray-200 pr-3">
          <span className="text-[11px] font-bold text-gray-400">12</span>
          <svg className="w-2.5 h-2.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <button className="font-bold hover:text-gray-700 text-xs" disabled>B</button>
          <button className="italic hover:text-gray-700 text-xs" disabled>I</button>
          <button className="underline hover:text-gray-700 text-xs" disabled>U</button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 p-6 overflow-auto bg-white font-sans text-xs text-gray-800 leading-relaxed selection:bg-blue-100">
        {fileData.subtitle && (
          <h3 className="text-sm font-bold text-gray-900 mb-3 border-b pb-2">
            {fileData.subtitle}
          </h3>
        )}

        {Array.isArray(fileData.description) ? (
          fileData.description.map((para, i) => (
            <p key={i} className="mb-4">
              {para}
            </p>
          ))
        ) : (
          <p>{fileData.description || "No content available."}</p>
        )}
      </div>
    </div>
  );
};

export default TxtViewer;
