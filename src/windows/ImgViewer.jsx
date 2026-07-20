import React from "react";
import { useOS } from "#store/OSContext.jsx";

const ImgViewer = () => {
  const { windows } = useOS();
  const fileData = windows.imgfile.data;

  if (!fileData) {
    return (
      <div className="flex-1 p-6 text-center text-xs text-gray-400 bg-white">
        No image open
      </div>
    );
  }

  const imageUrl = fileData.imageUrl;

  return (
    <div className="flex-1 flex flex-col bg-white w-full h-full">
      {/* macOS Preview Toolbar */}
      <div className="h-9 bg-[#f5f5f7] border-b border-[#e5e5e5] px-4 flex items-center justify-between flex-none select-none">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
            {fileData.fileType || "PNG"} Image
          </span>
        </div>
        {/* Rotate / Edit Tools (decorative) */}
        <div className="flex items-center gap-3 text-gray-600">
          <button className="p-1 hover:bg-gray-200 rounded cursor-pointer" title="Rotate Left">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89" />
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-200 rounded cursor-pointer" title="Share">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image Preview Container */}
      <div className="preview flex-1 p-2 bg-[#ececec] flex items-center justify-center overflow-auto">
        <img
          src={imageUrl}
          alt={fileData.name}
          className="max-w-full max-h-[380px] object-contain rounded-sm shadow-sm select-none"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default ImgViewer;
