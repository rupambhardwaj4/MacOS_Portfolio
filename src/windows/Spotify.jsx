import React, { useState, useRef, useEffect, useCallback } from "react";

const DEFAULT_COVER = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80";

const INITIAL_TRACKS = [
  {
    id: "h1",
    title: "Shree Hanuman Chalisa",
    artist: "Hariharan",
    album: "Hanuman Chalisa",
    duration: "0:30",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/83/fc/99/83fc99ab-adfb-62c8-f3e4-69975fea5f9f/mzi.xmtcysnw.jpg/300x300bb.jpg",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/83/fc/99/83fc99ab-adfb-62c8-f3e4-69975fea5f9f/mzaf_9500398262294306934.plus.aac.p.m4a",
  },
  {
    id: "a1",
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    album: "Aashiqui 2",
    duration: "0:30",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/21/df/b6/21dfb68e-0f04-8931-1e96-a83cb9935272/886443973650.jpg/300x300bb.jpg",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/4a/1b/3c/4a1b3c9d-8d4e-128a-67ef-2d852a3250ef/mzaf_16481977759881678149.plus.aac.p.m4a",
  },
  {
    id: "l1",
    title: "Lo-Fi Coding Beats",
    artist: "Chillhop Music",
    album: "Code & Chill",
    duration: "2:45",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
  },
  {
    id: "k1",
    title: "Kesariya",
    artist: "Arijit Singh & Pritam",
    album: "Brahmastra",
    duration: "0:30",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/05/85/3e/05853e34-5825-9c71-3375-3b10c5980a37/mzaf_8407421303867800722.plus.aac.p.m4a",
  },
  {
    id: "s1",
    title: "Synthwave Sunset",
    artist: "Retro Vibes",
    album: "Neon Dreams",
    duration: "3:12",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=synthwave-80s-110045.mp3",
  },
];

const SPOTIFY_PLAYLISTS = [
  {
    id: "hanuman",
    name: "🔱 Hanuman Chalisa (Hariharan)",
    embedUrl: "https://open.spotify.com/embed/artist/4YRxDV8wVIjgovm0WIBjR5",
  },
  {
    id: "bollywood",
    name: "🇮🇳 Hot Hits Hindi",
    embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYAVBhMBRz",
  },
  {
    id: "top-hits",
    name: "🌟 Today's Top Hits",
    embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M",
  },
  {
    id: "lofi",
    name: "🎧 Lofi Beats",
    embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwaw0UeB1",
  },
  {
    id: "coding",
    name: "💻 Coding & Focus",
    embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdLEN7aqioXM",
  },
];

const Spotify = () => {
  const [activeTab, setActiveTab] = useState("search"); // "search" | "spotify"
  const [selectedPlaylist, setSelectedPlaylist] = useState(SPOTIFY_PLAYLISTS[0]);
  const [customLinkInput, setCustomLinkInput] = useState("");
  const [embedUrl, setEmbedUrl] = useState(SPOTIFY_PLAYLISTS[0].embedUrl);

  const [tracksList, setTracksList] = useState(INITIAL_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [likedTracks, setLikedTracks] = useState({});

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchHeaderTitle, setSearchHeaderTitle] = useState("Featured Tracks");

  const audioRef = useRef(null);
  const currentTrack = tracksList[currentTrackIndex] || INITIAL_TRACKS[0];

  // Pause audio element on tab switch to Spotify Web Embed or component unmount
  const pauseBuiltInAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Tab switcher handler
  const handleTabChange = (tab) => {
    if (tab === "spotify") {
      pauseBuiltInAudio();
    }
    setActiveTab(tab);
  };

  // Live Search API handler for music
  const performSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setTracksList(INITIAL_TRACKS);
      setSearchHeaderTitle("Featured Tracks");
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setSearchHeaderTitle(`Search results for "${query}"`);

    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=25`
      );
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const formatted = data.results
          .filter((item) => item.previewUrl)
          .map((item) => ({
            id: String(item.trackId || Math.random()),
            title: item.trackName || "Unknown Title",
            artist: item.artistName || "Unknown Artist",
            album: item.collectionName || "Single",
            duration: item.trackTimeMillis
              ? `${Math.floor(item.trackTimeMillis / 60000)}:${Math.floor((item.trackTimeMillis % 60000) / 1000)
                  .toString()
                  .padStart(2, "0")}`
              : "0:30",
            cover: item.artworkUrl100
              ? item.artworkUrl100.replace("100x100bb", "300x300bb")
              : DEFAULT_COVER,
            url: item.previewUrl,
          }));

        setTracksList(formatted);
      } else {
        setTracksList([]);
      }
    } catch (err) {
      console.log("Search API error:", err);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      } else {
        setTracksList(INITIAL_TRACKS);
        setSearchHeaderTitle("Featured Tracks");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  // Handle play/pause toggle for built-in audio player
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (activeTab === "spotify") {
      setActiveTab("search");
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  // Play specific track
  const handleSelectTrack = (index) => {
    if (index < 0 || index >= tracksList.length) return;
    if (activeTab === "spotify") {
      setActiveTab("search");
    }
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => console.log(err));
      }
    }, 100);
  };

  // Next Track
  const handleNext = () => {
    if (tracksList.length === 0) return;
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * tracksList.length);
    } else {
      nextIndex = (currentTrackIndex + 1) % tracksList.length;
    }
    handleSelectTrack(nextIndex);
  };

  // Previous Track
  const handlePrev = () => {
    if (tracksList.length === 0) return;
    const prevIndex = (currentTrackIndex - 1 + tracksList.length) % tracksList.length;
    handleSelectTrack(prevIndex);
  };

  // Audio Time Update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  // Track Ended
  const handleEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      handleNext();
    }
  };

  // Seek Progress
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Toggle Like
  const toggleLike = (trackId) => {
    setLikedTracks((prev) => ({ ...prev, [trackId]: !prev[trackId] }));
  };

  // Format Seconds to MM:SS
  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Load playlist embed
  const handleSelectPlaylist = (pl) => {
    pauseBuiltInAudio();
    setSelectedPlaylist(pl);
    setEmbedUrl(pl.embedUrl);
    setActiveTab("spotify");
  };

  // Parse custom Spotify URL
  const handleLoadCustomLink = (e) => {
    e.preventDefault();
    if (!customLinkInput.trim()) return;

    pauseBuiltInAudio();
    let input = customLinkInput.trim();
    let url = input;

    if (input.includes("spotify.com/")) {
      url = input.replace("open.spotify.com/", "open.spotify.com/embed/");
    } else if (!input.startsWith("https://")) {
      url = `https://open.spotify.com/embed/playlist/${input}`;
    }

    if (url.includes("?")) {
      url = url.split("?")[0];
    }

    setEmbedUrl(url);
    setActiveTab("spotify");
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#121212] text-white font-sans select-none overflow-hidden">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack?.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* Main Body (Sidebar + Content) */}
      <div className="flex flex-1 min-h-0">
        {/* Spotify Sidebar - Using div instead of nav to avoid global CSS conflicts */}
        <aside className="w-60 bg-black p-4 flex flex-col justify-between flex-none border-r border-white/5">
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-2">
              <svg className="w-7 h-7 text-[#1db954]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.308-1.758-8.793-.962-.335.077-.67-.133-.746-.468-.077-.335.132-.67.467-.746 3.809-.87 7.076-.496 9.722 1.122.294.18.386.563.207.847zm1.225-2.722c-.226.367-.706.482-1.072.257-2.687-1.652-6.785-2.131-9.965-1.166-.413.126-.848-.106-.973-.519-.126-.413.106-.848.519-.973 3.632-1.102 8.147-.568 11.234 1.328.366.226.481.707.257 1.073zm.134-2.835C14.693 8.95 8.513 8.74 4.953 9.822c-.487.148-.999-.13-1.147-.617-.148-.487.13-.999.617-1.147 4.088-1.24 10.906-1.002 15.228 1.564.439.26.582.837.322 1.276-.26.439-.837.583-1.276.322z" />
              </svg>
              <span className="font-bold text-lg text-white tracking-tight">Spotify</span>
            </div>

            {/* Navigation Tabs - Explicit flex-col stack */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleTabChange("search")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "search"
                    ? "bg-[#1db954] text-black shadow-lg"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <svg className="w-4 h-4 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="truncate">Live Music Player</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("spotify")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "spotify"
                    ? "bg-[#1db954] text-black shadow-lg"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <svg className="w-4 h-4 flex-none" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.308-1.758-8.793-.962-.335.077-.67-.133-.746-.468-.077-.335.132-.67.467-.746 3.809-.87 7.076-.496 9.722 1.122.294.18.386.563.207.847z" />
                </svg>
                <span className="truncate">Spotify Web Embed</span>
              </button>
            </div>

            {/* Playlists list */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2">
                Featured Playlists
              </p>
              <ul className="space-y-1">
                {SPOTIFY_PLAYLISTS.map((pl) => (
                  <li
                    key={pl.id}
                    onClick={() => handleSelectPlaylist(pl)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors truncate ${
                      selectedPlaylist.id === pl.id && activeTab === "spotify"
                        ? "text-[#1db954] font-bold bg-white/10"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {pl.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Currently Playing Mini Badge in Sidebar */}
          {currentTrack && (
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center gap-2.5">
              <img
                src={currentTrack.cover || DEFAULT_COVER}
                alt={currentTrack.title}
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_COVER; }}
                className="w-10 h-10 rounded-md object-cover flex-none bg-gray-800"
              />
              <div className="overflow-hidden flex-1">
                <p className="text-xs font-semibold text-white truncate">{currentTrack.title}</p>
                <p className="text-[10px] text-gray-400 truncate">{currentTrack.artist}</p>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col bg-gradient-to-b from-[#1e1e1e] to-[#121212] overflow-auto">
          {activeTab === "spotify" ? (
            /* Spotify Official Web Player Embed View */
            <div className="flex-1 p-5 flex flex-col bg-[#121212] space-y-4">
              {/* Load custom Spotify link */}
              <form onSubmit={handleLoadCustomLink} className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                <input
                  type="text"
                  placeholder="Paste any Spotify track/playlist URL (e.g. https://open.spotify.com/playlist/...)..."
                  value={customLinkInput}
                  onChange={(e) => setCustomLinkInput(e.target.value)}
                  className="flex-1 bg-black/60 text-xs text-white placeholder-gray-400 px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#1db954]"
                />
                <button
                  type="submit"
                  className="bg-[#1db954] hover:bg-[#1ed760] text-black font-bold px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer flex-none"
                >
                  Load
                </button>
              </form>

              {/* Official Spotify Player Embed iframe */}
              <iframe
                title="Spotify Embed Player"
                src={embedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-2xl flex-1 shadow-2xl border border-white/10"
              />
            </div>
          ) : (
            /* Live Music Search & Player View */
            <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
              {/* Header / Search bar */}
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <svg
                    className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search ANY song, artist, album (e.g. Hanuman Chalisa, Arijit)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/10 text-xs text-white placeholder-gray-400 pl-10 pr-9 py-2.5 rounded-full outline-none focus:ring-2 focus:ring-[#1db954] transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-white text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Hero Banner for Current Track */}
              {currentTrack && (
                <div className="bg-gradient-to-r from-[#1db954]/20 to-emerald-900/30 p-6 rounded-2xl border border-[#1db954]/20 flex items-center gap-6 shadow-xl relative overflow-hidden">
                  <div className="relative group flex-none">
                    <img
                      src={currentTrack.cover || DEFAULT_COVER}
                      alt={currentTrack.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_COVER; }}
                      className="w-32 h-32 rounded-xl object-cover shadow-2xl bg-gray-800"
                    />
                    <button
                      onClick={togglePlay}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#1db954] text-black flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    >
                      {isPlaying ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="space-y-2 overflow-hidden">
                    <span className="text-[10px] uppercase font-bold text-[#1db954] tracking-widest">
                      Now Playing
                    </span>
                    <h2 className="text-2xl font-extrabold text-white tracking-tight truncate">
                      {currentTrack.title}
                    </h2>
                    <p className="text-xs text-gray-300 font-medium truncate">
                      {currentTrack.artist} • <span className="text-gray-400">{currentTrack.album}</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Tracklist Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{searchHeaderTitle}</span>
                    {isSearching && (
                      <span className="inline-block w-3 h-3 border-2 border-[#1db954] border-t-transparent rounded-full animate-spin" />
                    )}
                  </h3>
                  <span className="text-[11px] text-gray-400">
                    {tracksList.length} {tracksList.length === 1 ? "track" : "tracks"}
                  </span>
                </div>

                {tracksList.length === 0 && !isSearching ? (
                  <div className="py-12 text-center text-gray-400 text-xs">
                    No songs found for "{searchQuery}". Try searching for another artist or song name!
                  </div>
                ) : (
                  <div className="space-y-1 max-h-[220px] overflow-y-auto pr-1">
                    {tracksList.map((track, i) => {
                      const isSelected = track.id === currentTrack?.id;
                      return (
                        <div
                          key={track.id + "-" + i}
                          onClick={() => handleSelectTrack(i)}
                          className={`flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-white/15 border border-[#1db954]/40"
                              : "hover:bg-white/5 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-3.5 overflow-hidden pr-2">
                            <span className="text-xs font-semibold text-gray-400 w-5 text-center flex-none">
                              {isSelected && isPlaying ? (
                                <span className="text-[#1db954] animate-pulse">▶</span>
                              ) : (
                                i + 1
                              )}
                            </span>
                            <img
                              src={track.cover || DEFAULT_COVER}
                              alt={track.title}
                              referrerPolicy="no-referrer"
                              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_COVER; }}
                              className="w-10 h-10 rounded-lg object-cover flex-none bg-gray-800"
                            />
                            <div className="overflow-hidden">
                              <p className={`text-xs font-semibold truncate ${isSelected ? "text-[#1db954]" : "text-white"}`}>
                                {track.title}
                              </p>
                              <p className="text-[11px] text-gray-400 truncate">{track.artist}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 flex-none">
                            <span className="text-xs text-gray-400 hidden sm:inline max-w-[140px] truncate">
                              {track.album}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLike(track.id);
                              }}
                              className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                            >
                              <svg
                                className="w-4 h-4"
                                fill={likedTracks[track.id] ? "#ef4444" : "none"}
                                stroke={likedTracks[track.id] ? "#ef4444" : "currentColor"}
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            <span className="text-xs font-mono text-gray-400">{track.duration}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Bottom Persistent Playback Controls Bar */}
      <div className="h-20 bg-[#181818] border-t border-white/10 px-4 flex items-center justify-between flex-none select-none z-20">
        {/* Left: Track Info */}
        <div className="flex items-center gap-3 w-1/4">
          {currentTrack && (
            <>
              <img
                src={currentTrack.cover || DEFAULT_COVER}
                alt={currentTrack.title}
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_COVER; }}
                className="w-12 h-12 rounded-lg object-cover flex-none shadow-md bg-gray-800"
              />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{currentTrack.title}</p>
                <p className="text-[11px] text-gray-400 truncate">{currentTrack.artist}</p>
              </div>
              <button
                onClick={() => toggleLike(currentTrack.id)}
                className="ml-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill={likedTracks[currentTrack.id] ? "#ef4444" : "none"}
                  stroke={likedTracks[currentTrack.id] ? "#ef4444" : "currentColor"}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Center: Playback Controls + Scrub Bar */}
        <div className="flex flex-col items-center gap-1.5 flex-1 max-w-md">
          <div className="flex items-center gap-4 text-gray-300">
            {/* Shuffle */}
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`p-1.5 rounded hover:text-white cursor-pointer transition-colors ${
                isShuffle ? "text-[#1db954]" : "text-gray-400"
              }`}
              title="Shuffle"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h2m8 12h2a2 2 0 002-2v-4a2 2 0 00-2-2h-2m-4 10l4-4m-4 4l-4-4m4-12l4 4m-4-4l-4 4" />
              </svg>
            </button>

            {/* Prev */}
            <button
              onClick={handlePrev}
              className="p-1 hover:text-white cursor-pointer text-gray-300 transition-colors"
              title="Previous"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-md"
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next */}
            <button
              onClick={handleNext}
              className="p-1 hover:text-white cursor-pointer text-gray-300 transition-colors"
              title="Next"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>

            {/* Repeat */}
            <button
              onClick={() => setIsRepeat(!isRepeat)}
              className={`p-1.5 rounded hover:text-white cursor-pointer transition-colors ${
                isRepeat ? "text-[#1db954]" : "text-gray-400"
              }`}
              title="Repeat"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 0121.21 7.89M4 14v5h.582m15.356-2A8.001 8.001 0 0021.21 16.11" />
              </svg>
            </button>
          </div>

          {/* Time scrubber */}
          <div className="flex items-center gap-2.5 w-full">
            <span className="text-[10px] font-mono text-gray-400 w-8 text-right">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#1db954]"
            />
            <span className="text-[10px] font-mono text-gray-400 w-8">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right: Volume Controls */}
        <div className="flex items-center justify-end gap-2.5 w-1/4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-gray-400 hover:text-white cursor-pointer transition-colors"
          >
            {isMuted || volume === 0 ? (
              <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              setIsMuted(false);
            }}
            className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#1db954]"
          />
        </div>
      </div>
    </div>
  );
};

export default Spotify;
