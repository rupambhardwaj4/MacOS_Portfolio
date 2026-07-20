const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "Sep 2, 2025",
    title:
      "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
    image: "/images/blog1.png",
    link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
  },
  {
    id: 2,
    date: "Aug 28, 2025",
    title: "The Ultimate Guide to Mastering Three.js for 3D Development",
    image: "/images/blog2.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
  },
  {
    id: 3,
    date: "Aug 15, 2025",
    title: "The Ultimate Guide to Mastering GSAP Animations",
    image: "/images/blog3.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
  },
];

const techStack = [
  {
    category: "Proficient",
    items: [
      "Python",
      "C",
      "Java",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Git",
      "GitHub",
      "Figma",
      "Netlify",
      "VsCode",
    ],
  },
  {
    category: "Learning",
    items: [
      "React.js",
      "Flutter",
      "Docker",
      "Node.js",
      "AI/ML",
      "MongoDB",
      "Vercel",
    ],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/rupambhardwaj4",
  },
  {
    id: 2,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/rupam-bhardwaj-260b61319/",
  },
  {
    id: 3,
    text: "Email",
    icon: "/icons/user.svg",
    bg: "#4bcb63",
    link: "mailto:rupambhardwaj4@gmail.com",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.png",
  },
  {
    id: 2,
    img: "/images/gal2.png",
  },
  {
    id: 3,
    img: "/images/gal3.png",
  },
  {
    id: 4,
    img: "/images/gal4.png",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1: CampusCode
    {
      id: 5,
      name: "CampusCode",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      windowPosition: "top-[5vh] left-5",
      children: [
        {
          id: 1,
          name: "CampusCode.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          subtitle: "Prototype Management System",
          description: [
            "CampusCode is a prototype management system designed to streamline academic workflows for students, faculty, and administrators.",
            "It optimizes university communication, task tracking, schedule coordination, and workflow organization.",
            "Built with HTML5, Tailwind CSS, and a fully responsive design approach.",
          ],
        },
      ],
    },

    // ▶ Project 2: Yum Maker
    {
      id: 6,
      name: "Yum Maker",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "Yum Maker.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          subtitle: "Recipe Generator Web App",
          description: [
            "Yum Maker is a recipe generator web app that suggests meals with ingredients and instructions using a simple, intuitive UI.",
            "It helps food lovers explore new dishes based on available ingredients.",
            "Built with HTML5, CSS3, and Responsive UI design.",
          ],
        },
        {
          id: 2,
          name: "yum-maker.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://yum-maker.netlify.app/",
          position: "top-20 left-20",
        },
      ],
    },

    // ▶ Project 3: Zeost
    {
      id: 7,
      name: "Zeost",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "Zeost Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          subtitle: "Modern Landing Page Prototype",
          description: [
            "Zeost is a modern landing page prototype with smooth animations and responsive layout for product/service showcase.",
            "Built with React and Framer Motion, focusing on ultra-fast loading performance and crisp aesthetic transitions.",
          ],
        },
        {
          id: 2,
          name: "zeost.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://zeost.netlify.app/",
          position: "top-10 right-20",
        },
      ],
    },

    // ▶ Project 4: Velliton Hr
    {
      id: 8,
      name: "Velliton Hr",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-60 left-40",
      windowPosition: "top-[40vh] left-7",
      children: [
        {
          id: 1,
          name: "Velliton Hr Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          subtitle: "HR Management Platform",
          description: [
            "An HR management platform that streamlines recruitment, payroll, and compliance through a clean, process-driven interface.",
            "Helps organizations manage talent pipelines and internal HR operations seamlessly.",
          ],
        },
        {
          id: 2,
          name: "vellitonhr.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://vellitonhrcare.netlify.app/",
          position: "top-10 right-20",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "rupam-profile.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/adrian.jpg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Rupam Bhardwaj - Creative Developer",
      image: "/images/adrian.jpg",
      description: [
        "I'm an aspiring Creative Developer with a passion for web and mobile development, UI animations, and AI integration.",
        "I enjoy transforming ideas into interactive, user-friendly, and visually engaging applications.",
        "My focus is on building clean, efficient, and scalable solutions that deliver a great user experience while remaining functional and impactful.",
        "I thrive in creating interfaces that not only look beautiful but also solve real problems.",
        "",
        "🎓 Education Timeline:",
        "• B.Tech in Computer Science & Engineering (2023 – 2027 Ongoing) | SGPA: 7.8",
        "• Higher Secondary Education (2022 – 2023) | 78%",
        "• High School (2020 – 2021) | 93.6%",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };