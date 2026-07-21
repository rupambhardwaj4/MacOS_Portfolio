import React, { useState } from "react";
import { photosLinks, gallery } from "#constants/index.js";

const Photos = () => {
  const [activeLinkId, setActiveLinkId] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="flex flex-1 h-full select-none text-gray-800 relative">
      {/* Photos Sidebar */}
      <aside className="sidebar w-3/12 flex-none bg-[#f6f6f6] border-r border-[#e5e5e5] flex flex-col p-4">
        <h2 className="text-[11px] font-bold text-gray-400/80 uppercase px-2 mb-2">Photos</h2>
        <ul className="space-y-0.5">
          {photosLinks.map((link) => {
            const isActive = activeLinkId === link.id;
            return (
              <li
                key={link.id}
                onClick={() => {
                  setActiveLinkId(link.id);
                  setSelectedPhoto(null); // clear preview when changing tab
                }}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-default transition-colors ${
                  isActive
                    ? "bg-[#007aff]/10 text-[#007aff]"
                    : "text-[#4a4a4a] hover:bg-[#e8e6e6]"
                }`}
              >
                <img src={link.icon} alt={link.title} className="w-4 h-4 object-contain" />
                <span>{link.title}</span>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Gallery Grid Area */}
      <div className="flex-1 bg-white overflow-auto relative">
        {selectedPhoto ? (
          /* Single Photo Preview Mode */
          <div className="absolute inset-0 bg-[#161617] flex flex-col z-10 animate-fade-in">
            {/* Toolbar */}
            <div className="h-11 border-b border-white/10 bg-black/40 px-4 flex items-center justify-between flex-none">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="text-xs font-semibold text-white/80 hover:text-white flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <span className="text-xs font-medium text-white/80">{selectedPhoto.title || "Photo Preview"}</span>
              <div className="w-16"></div>
            </div>

            {/* Large Image Container */}
            <div className="flex-1 flex items-center justify-center p-6 relative">
              <img
                src={selectedPhoto.img}
                alt={selectedPhoto.title || "Expanded Preview"}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        ) : (
          /* Photo Grid Mode */
          <div className="gallery p-5 overflow-y-auto h-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gallery.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="cursor-pointer group relative aspect-square overflow-hidden rounded-xl bg-gray-100 border border-gray-200/60 hover:shadow-lg hover:ring-2 hover:ring-[#007aff] transition-all duration-200"
                >
                  <img
                    src={photo.img}
                    alt={photo.title || `Gallery ${photo.id}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    draggable="false"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-white text-[11px] font-medium opacity-90 group-hover:opacity-100 transition-opacity duration-200 truncate">
                    {photo.title || `Photo ${photo.id}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Photos;
