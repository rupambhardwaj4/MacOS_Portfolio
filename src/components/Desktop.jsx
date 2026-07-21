import React from "react";
import { useOS } from "#store/OSContext.jsx";
import { locations } from "#constants/index.js";
import WindowWrapper from "./WindowWrapper.jsx";

// Import Windows Content
import Finder from "#windows/Finder.jsx";
import Safari from "#windows/Safari.jsx";
import Spotify from "#windows/Spotify.jsx";
import Photos from "#windows/Photos.jsx";
import Terminal from "#windows/Terminal.jsx";
import Contact from "#windows/Contact.jsx";
import Resume from "#windows/Resume.jsx";
import TxtViewer from "#windows/TxtViewer.jsx";
import ImgViewer from "#windows/ImgViewer.jsx";

const Desktop = () => {
  const { windows, openWindow, navigateFinder } = useOS();

  const handleOpenFolder = (loc) => {
    navigateFinder(loc);
    openWindow("finder");
  };

  const handleOpenResume = () => {
    openWindow("resume");
  };

  return (
    <div id="home" className="relative w-full h-[calc(100vh-36px)] overflow-hidden">
      {/* Desktop shortcuts / icons on the right edge */}
      <ul className="absolute top-6 right-6 space-y-6 flex flex-col items-end z-10">
        {/* Work Folder */}
        <li
          onDoubleClick={() => handleOpenFolder(locations.work)}
          className="group flex flex-col items-center gap-1.5 cursor-default select-none w-20"
        >
          <img
            src="/images/folder.png"
            alt="Work Folder"
            className="w-12 h-12 object-contain group-hover:brightness-90 transition-all p-1 rounded-lg group-hover:bg-black/10"
            draggable="false"
          />
          <p className="text-[11px] font-semibold text-white text-center drop-shadow-md px-1.5 py-0.5 rounded group-hover:bg-blue-600 transition-colors w-full truncate">
            Work
          </p>
        </li>

        {/* About Me Folder */}
        <li
          onDoubleClick={() => handleOpenFolder(locations.about)}
          className="group flex flex-col items-center gap-1.5 cursor-default select-none w-20"
        >
          <img
            src="/images/folder.png"
            alt="About Folder"
            className="w-12 h-12 object-contain group-hover:brightness-90 transition-all p-1 rounded-lg group-hover:bg-black/10"
            draggable="false"
          />
          <p className="text-[11px] font-semibold text-white text-center drop-shadow-md px-1.5 py-0.5 rounded group-hover:bg-blue-600 transition-colors w-full truncate">
            About me
          </p>
        </li>

        {/* Resume PDF */}
        <li
          onDoubleClick={handleOpenResume}
          className="group flex flex-col items-center gap-1.5 cursor-default select-none w-20"
        >
          <img
            src="/images/pdf.png"
            alt="Resume PDF"
            className="w-12 h-12 object-contain group-hover:brightness-90 transition-all p-1 rounded-lg group-hover:bg-black/10"
            draggable="false"
          />
          <p className="text-[11px] font-semibold text-white text-center drop-shadow-md px-1.5 py-0.5 rounded group-hover:bg-blue-600 transition-colors w-full truncate">
            Resume.pdf
          </p>
        </li>

        {/* Trash Folder */}
        <li
          onDoubleClick={() => handleOpenFolder(locations.trash)}
          className="group flex flex-col items-center gap-1.5 cursor-default select-none w-20"
        >
          <img
            src="/images/trash.png"
            alt="Trash"
            className="w-12 h-12 object-contain group-hover:brightness-90 transition-all p-1 rounded-lg group-hover:bg-black/10"
            draggable="false"
          />
          <p className="text-[11px] font-semibold text-white text-center drop-shadow-md px-1.5 py-0.5 rounded group-hover:bg-blue-600 transition-colors w-full truncate">
            Trash
          </p>
        </li>
      </ul>

      {/* RENDER ALL OS WINDOWS CONTAINER */}
      
      {/* Finder */}
      <WindowWrapper id="finder" title="Finder" widthClass="w-[780px]" heightClass="h-[460px]">
        <Finder />
      </WindowWrapper>

      {/* Safari */}
      <WindowWrapper id="safari" title="Safari" widthClass="w-[860px]" heightClass="h-[520px]">
        <Safari />
      </WindowWrapper>

      {/* Spotify */}
      <WindowWrapper id="spotify" title="Spotify" widthClass="w-[880px]" heightClass="h-[540px]">
        <Spotify />
      </WindowWrapper>

      {/* Photos */}
      <WindowWrapper id="photos" title="Photos" widthClass="w-[820px]" heightClass="h-[500px]">
        <Photos />
      </WindowWrapper>

      {/* Contact */}
      <WindowWrapper id="contact" title="Contact Me" widthClass="w-[740px]" heightClass="h-[480px]">
        <Contact />
      </WindowWrapper>

      {/* Terminal */}
      <WindowWrapper id="terminal" title="Terminal" widthClass="w-[600px]" heightClass="h-[400px]">
        <Terminal />
      </WindowWrapper>

      {/* Resume */}
      <WindowWrapper id="resume" title="Resume" widthClass="w-[740px]" heightClass="h-[680px]">
        <Resume />
      </WindowWrapper>

      {/* Text Viewer */}
      <WindowWrapper
        id="txtfile"
        title={windows.txtfile.data?.name || "Text Editor"}
        widthClass="w-[400px]"
        heightClass="h-[350px]"
      >
        <TxtViewer />
      </WindowWrapper>

      {/* Image Viewer */}
      <WindowWrapper
        id="imgfile"
        title={windows.imgfile.data?.name || "Preview"}
        widthClass="w-[500px]"
        heightClass="h-[450px]"
      >
        <ImgViewer />
      </WindowWrapper>
    </div>
  );
};

export default Desktop;
