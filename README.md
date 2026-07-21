#  macOS Web Portfolio — Rupam Bhardwaj

<p align="center">
  <img src="public/images/spotify.png" width="90" alt="macOS Portfolio Icon" style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" />
</p>

<h3 align="center">An interactive, high-performance macOS Sequoia desktop experience built for the web.</h3>

<p align="center">
  <a href="https://www.rupambhardwaj.me/">
    <img src="https://img.shields.io/badge/🌐_Live_Preview-Click_Here-1DB954?style=for-the-badge&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://github.com/rupambhardwaj4/MacOS_Portfolio">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/GSAP-3.13-88CE02?style=flat-square&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
</p>

---

## 🔗 Live Preview

Experience the live portfolio interactive application directly in your browser:

👉 **[Launch macOS Web Portfolio Live Demo](https://www.rupambhardwaj.me/)** 👈

---

## 🌟 Overview

**macOS Web Portfolio** is a state-of-the-art personal portfolio designed to mimic the authentic look, feel, and desktop interaction of **macOS Sequoia**. 

Built with **React 19**, **Vite**, **Tailwind CSS v4**, and **GSAP animations**, it features draggable window management, custom desktop applications, real-time live music playback, responsive gallery previews, an interactive CLI terminal, and downloadable resume integration.

---

## ✨ Key Features & Desktop Applications

### 🎵 1. Spotify Music Player (`Spotify.jsx`)
- **Live Song Search API**: Instant search across millions of tracks using live music metadata & previews.
- **Dual Playback Modes**:
  - **Live Music Player**: Built-in audio player with play/pause, seek scrubber, volume control, mute toggle, and track shuffle/repeat.
  - **Spotify Web Embed**: Full-length official Spotify player embeds supporting curated playlists (*Hanuman Chalisa*, *Bollywood Butter*, *Today's Top Hits*, *Lofi Beats*, *Coding & Focus*) and custom track links.
- **Single-Audio Enforcement**: Automatically pauses background audio when switching tabs or selecting playlists to eliminate dual sound playback.

### 🖼️ 2. Photos App (`Photos.jsx`)
- Interactive image gallery featuring high-resolution showcase photos of Rupam Bhardwaj.
- Grid thumbnail layout with single-click lightbox preview and full-resolution view.

### 📇 3. Contact Me Modal (`Contact.jsx`)
- Modern glassmorphic contact card with profile avatar, email link (`rupambhardwaj4@gmail.com`), and 4 colored social cards:
  - **GitHub**: [@rupambhardwaj4](https://github.com/rupambhardwaj4)
  - **LinkedIn**: [Rupam Bhardwaj](https://linkedin.com)

### 📄 4. PDF Resume Viewer (`Resume.pdf`)
- Integrated PDF viewer displaying Rupam Bhardwaj's B.Tech Computer Science resume (Experience, Projects, Technical Skills, Certifications).
- One-click direct PDF download button.

### 📁 5. macOS Finder (`Finder.jsx`)
- Interactive folder directory navigation (`Work`, `About me`, `Trash`).
- Double-click file opening for text files (`about-me.txt`) and image assets.

### 🌐 6. Safari Browser (`Safari.jsx`)
- Web browser application with address bar navigation, back/forward history buttons, and curated bookmark tabs.

### 💻 7. macOS Terminal (`Terminal.jsx`)
- Interactive CLI command line interface.
- Supports commands: `help`, `about`, `skills`, `projects`, `contact`, `clear`, and `whoami`.

### 🖥️ 8. macOS Window Manager & Taskbar Dock
- **Centered Window Management**: Windows open smoothly centered on screen with z-index focus switching, minimize, maximize, and close controls.
- **Interactive macOS Dock**: Magnification scaling on hover, bouncy click launcher animation, and active app indicator dots.
- **Top Menu Bar**: Real-time live date/time display, control center, and active app title bar.

---

## 🛠️ Tech Stack & Technologies

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 7](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom Glassmorphism |
| **Animations** | [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform) |
| **Icons** | Custom SVG Design Icons & Heroicons |
| **State Management** | React Context API (`OSContext.jsx`) |
| **Date & Time** | [Day.js](https://day.js.org/) |

---

## 🚀 Getting Started Locally

Follow these simple steps to run the project locally on your machine:

### 1. Prerequisites
Ensure you have **Node.js (v18 or higher)** and **npm** installed:
```bash
node -v
npm -v
```

### 2. Clone the Repository
```bash
git clone https://github.com/rupambhardwaj4/MacOS_Portfolio.git
cd MacOS_Portfolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 5. Build for Production
```bash
npm run build
```
The optimized output bundle will be generated inside the `dist/` directory.

---

## 📂 Project Structure

```
macos_portfolio/
├── public/
│   ├── files/
│   │   └── resume.pdf           # Resume
│   └── images/
│       ├── rupam-1.jpg          # Profile & Gallery Photos
│       ├── rupam-2.jpg
│       ├── rupam-3.jpg
│       ├── spotify.png          # macOS App Dock Icons
│       ├── folder.png
│       ├── safari.png
│       └── pdf.png
├── src/
│   ├── components/
│   │   ├── Desktop.jsx          # Workspace & Window Launcher
│   │   ├── Dock.jsx             # macOS Taskbar Dock with Animations
│   │   ├── Navbar.jsx           # Top Menu Bar with Live Clock
│   │   └── WindowWrapper.jsx    # Dynamic Window Management System
│   ├── constants/
│   │   └── index.js             # Window configs, dock apps, & gallery metadata
│   ├── store/
│   │   └── OSContext.jsx        # Global Window & OS State Provider
│   ├── windows/
│   │   ├── Contact.jsx          # Contact Me Modal & Social Links
│   │   ├── Finder.jsx           # macOS File Explorer
│   │   ├── Photos.jsx           # Lightbox Photo Gallery
│   │   ├── Resume.jsx           # PDF Resume Viewer
│   │   ├── Safari.jsx           # Web Browser Window
│   │   ├── Spotify.jsx          # Dual-Mode Music Player & Live Search
│   │   ├── Terminal.jsx         # Interactive CLI Shell
│   │   ├── TxtViewer.jsx        # Text File Reader
│   │   └── ImgViewer.jsx        # Image Viewer Window
│   ├── App.jsx
│   ├── index.css                # Base Design System & Tailwind Directives
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

---

## 🧑‍💻 Author

**Rupam Bhardwaj**
- 📧 **Email**: [rupambhardwaj4@gmail.com](mailto:rupambhardwaj4@gmail.com)
- 🐙 **GitHub**: [@rupambhardwaj4](https://github.com/rupambhardwaj4)
- 🌐 **Portfolio**: [https://www.rupambhardwaj.me/]https://www.rupambhardwaj.me/)

---

<p align="center">
  Developed with ❤️ by Rupam Bhardwaj
</p>
