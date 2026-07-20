import { useState, useEffect, useRef } from "react";
import { navLinks, navIcons } from "#constants/index.js";
import { useOS } from "#store/OSContext.jsx";
import { locations } from "#constants/index.js";
import dayjs from "dayjs";

const Navbar = () => {
  const { openWindow, navigateFinder } = useOS();
  const [currentTime, setCurrentTime] = useState(dayjs().format("ddd MMM D h:mm:ss A"));
  
  // Controls state
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [showWifiDropdown, setShowWifiDropdown] = useState(false);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [airdropEnabled, setAirdropEnabled] = useState(true);
  const [focusEnabled, setFocusEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [brightness, setBrightness] = useState(85);
  const [volume, setVolume] = useState(75);

  const navbarRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(dayjs().format("ddd MMM D h:mm:ss A"));
    };
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setShowControlCenter(false);
        setShowWifiDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (type) => {
    if (type === "finder") {
      navigateFinder(locations.work);
      openWindow("finder");
    } else {
      openWindow(type);
    }
  };

  const handleIconClick = (id, img) => {
    if (img.includes("user.svg")) {
      setShowControlCenter(false);
      setShowWifiDropdown(false);
      navigateFinder(locations.about);
      openWindow("finder");
    } else if (img.includes("mode.svg")) {
      setShowWifiDropdown(false);
      setShowControlCenter((prev) => !prev);
    } else if (img.includes("wifi.svg")) {
      setShowControlCenter(false);
      setShowWifiDropdown((prev) => !prev);
    } else if (img.includes("search.svg")) {
      setShowControlCenter(false);
      setShowWifiDropdown(false);
      openWindow("terminal");
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <nav ref={navbarRef} className="h-8 border-b border-white/10 bg-black/20 backdrop-blur-2xl px-3 py-0 flex items-center justify-between text-xs select-none relative z-10000 text-white font-sans">
      <div className="flex items-center gap-3">
        {/* Apple Logo Icon */}
        <img
          src="/images/logo.svg"
          alt="Apple Logo"
          className="w-3.5 h-3.5 opacity-90 cursor-pointer hover:opacity-100 hover:scale-110 active:scale-90 transition-all duration-200"
          style={{ filter: "invert(1)" }}
          onClick={() => openWindow("terminal")}
        />
        <span 
          onClick={() => {
            navigateFinder(locations.about);
            openWindow("finder");
          }}
          className="font-extrabold text-white tracking-tight cursor-pointer hover:text-white/80 active:scale-95 transition-all duration-150"
        >
          Rupam Bhardwaj
        </span>
        <ul className="flex items-center gap-1">
          {navLinks.map(({ id, name, type }) => (
            <li
              key={id}
              onClick={() => handleMenuClick(type)}
              className="cursor-pointer hover:bg-white/15 active:scale-95 px-2.5 py-0.5 rounded-md transition-all duration-150 text-white/90 hover:text-white font-semibold text-[11px]"
            >
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <ul className="flex items-center gap-1">
          {navIcons.map(({ id, img }) => (
            <li 
              key={id} 
              onClick={() => handleIconClick(id, img)}
              className={`cursor-pointer hover:bg-white/20 active:scale-90 p-1.5 rounded-md transition-all duration-150 ${
                (img.includes("mode.svg") && showControlCenter) || (img.includes("wifi.svg") && showWifiDropdown)
                  ? "bg-white/25 scale-105"
                  : ""
              }`}
            >
              <img
                src={img}
                className="w-3.5 h-3.5 opacity-90 hover:opacity-100 transition-opacity"
                style={{ filter: "invert(1)" }}
                alt={`icon-${id}`}
              />
            </li>
          ))}
        </ul>

        {/* Formatted time */}
        <time className="text-[11px] font-semibold text-white/90 cursor-default whitespace-nowrap">
          {currentTime}
        </time>

        {/* Wi-Fi Status Dropdown */}
        {showWifiDropdown && (
          <div className="absolute top-10 right-24 w-64 bg-[#1c1c1e]/90 backdrop-blur-3xl border border-white/20 rounded-2xl shadow-2xl p-3 text-white z-50000 animate-scale-up space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${wifiEnabled ? "bg-green-400" : "bg-red-400"}`} />
                <span className="font-bold text-xs">Wi-Fi</span>
              </div>
              <button 
                onClick={() => setWifiEnabled(!wifiEnabled)} 
                className="text-[10px] text-blue-400 hover:underline font-semibold"
              >
                {wifiEnabled ? "Turn Off" : "Turn On"}
              </button>
            </div>
            {wifiEnabled ? (
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between bg-white/10 p-2 rounded-xl font-medium">
                  <span className="flex items-center gap-2 font-semibold">
                    <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0" />
                    </svg>
                    Portfolio-5G
                  </span>
                  <span className="text-[10px] text-green-400 font-bold">Connected</span>
                </div>
                <div className="text-[10px] text-white/60 px-1 pt-1 flex justify-between">
                  <span>IP: 192.168.1.104</span>
                  <span>Signal: Excellent ⚡</span>
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-white/50 text-center py-2">Wi-Fi is turned off</p>
            )}
          </div>
        )}

        {/* macOS Control Center Widget Dropdown (Matching Reference Screenshot) */}
        {showControlCenter && (
          <div className="absolute top-10 right-3 w-80 bg-[#1c1c1e]/90 backdrop-blur-3xl border border-white/20 rounded-2xl shadow-2xl p-3 text-white z-50000 font-sans select-none animate-scale-up space-y-2.5">
            {/* Top Grid: Left Connectivity Card & Right Options Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Left Tall Card: Wi-Fi, Bluetooth, AirDrop */}
              <div className="bg-[#2c2c2e]/80 border border-white/10 p-3 rounded-2xl flex flex-col justify-between gap-2.5">
                {/* Wi-Fi Item */}
                <div 
                  onClick={() => setWifiEnabled(!wifiEnabled)}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${wifiEnabled ? "bg-[#007aff] text-white" : "bg-white/20 text-white/50"}`}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[11px] leading-tight">Wi-Fi</span>
                    <span className="text-[9.5px] text-white/60 leading-tight">{wifiEnabled ? "Portfolio-5G" : "Off"}</span>
                  </div>
                </div>

                {/* Bluetooth Item */}
                <div 
                  onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${bluetoothEnabled ? "bg-[#007aff] text-white" : "bg-white/20 text-white/50"}`}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[11px] leading-tight">Bluetooth</span>
                    <span className="text-[9.5px] text-white/60 leading-tight">{bluetoothEnabled ? "On" : "Off"}</span>
                  </div>
                </div>

                {/* AirDrop Item */}
                <div 
                  onClick={() => setAirdropEnabled(!airdropEnabled)}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${airdropEnabled ? "bg-[#007aff] text-white" : "bg-white/20 text-white/50"}`}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[11px] leading-tight">AirDrop</span>
                    <span className="text-[9.5px] text-white/60 leading-tight">{airdropEnabled ? "Everyone" : "Off"}</span>
                  </div>
                </div>
              </div>

              {/* Right Side Options */}
              <div className="flex flex-col justify-between gap-2">
                {/* Focus Card */}
                <div 
                  onClick={() => setFocusEnabled(!focusEnabled)}
                  className="bg-[#2c2c2e]/80 border border-white/10 p-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer hover:bg-[#3a3a3c] transition-colors"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${focusEnabled ? "bg-[#5856d6] text-white" : "bg-white/20 text-white/70"}`}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[11px] leading-tight">Focus</span>
                    <span className="text-[9.5px] text-white/60 leading-tight">{focusEnabled ? "On" : "Off"}</span>
                  </div>
                </div>

                {/* Dark Mode Card */}
                <div 
                  onClick={() => setDarkModeEnabled(!darkModeEnabled)}
                  className="bg-[#2c2c2e]/80 border border-white/10 p-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer hover:bg-[#3a3a3c] transition-colors"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${darkModeEnabled ? "bg-[#007aff] text-white" : "bg-white/20 text-white/70"}`}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="font-bold text-[11px] leading-tight">Dark Mode</span>
                </div>

                {/* Keyboard Brightness & Fullscreen Row */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#2c2c2e]/80 border border-white/10 p-2 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#3a3a3c] transition-colors">
                    <span className="text-xs">🔅</span>
                    <span className="text-[9px] font-bold text-white/80 mt-0.5 leading-tight">Keyboard</span>
                  </div>
                  <div 
                    onClick={toggleFullscreen}
                    className="bg-[#2c2c2e]/80 border border-white/10 p-2 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#3a3a3c] transition-colors"
                  >
                    <span className="text-xs">⛶</span>
                    <span className="text-[9px] font-bold text-white/80 mt-0.5 leading-tight">Fullscreen</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Row: Stage Manager & Screen Mirroring */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#2c2c2e]/80 border border-white/10 p-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-[#3a3a3c] transition-colors">
                <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                <span className="font-bold text-[11px]">Stage Manager</span>
              </div>
              <div className="bg-[#2c2c2e]/80 border border-white/10 p-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-[#3a3a3c] transition-colors">
                <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-bold text-[11px]">Screen Mirroring</span>
              </div>
            </div>

            {/* Bottom Sliders: Display & Sound */}
            <div className="space-y-2">
              {/* Display Brightness Card */}
              <div className="bg-[#2c2c2e]/80 border border-white/10 p-3 rounded-2xl flex flex-col gap-1.5">
                <span className="font-bold text-[11px] text-white/90">Display</span>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs opacity-60">🔅</span>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                  <span className="text-xs opacity-90">🔆</span>
                </div>
              </div>

              {/* Sound Volume Card */}
              <div className="bg-[#2c2c2e]/80 border border-white/10 p-3 rounded-2xl flex flex-col gap-1.5">
                <span className="font-bold text-[11px] text-white/90">Sound</span>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs opacity-60">🔈</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                  <span className="text-xs opacity-90">🔊</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;