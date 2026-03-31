// src/portfolioData.ts
// Static portfolio data — no backend/API needed
// This replaces the /api/portfolio fetch that breaks on Vercel

import { PortfolioData } from "./types";

export const PORTFOLIO_DATA: PortfolioData = {
  about: {
    text: "I am a passionate Full Stack Developer with hands-on experience building scalable web applications. I love turning complex problems into simple, beautiful, and intuitive designs.",
  },

  projects: [
    {
      id: "proj-kirana",
      title: "Kirana",
      description:
        "Full-Stack Next.js + TypeScript grocery delivery platform for local kirana stores with real-time maps, OTP delivery verification, Socket.IO chat, and Stripe payments.",
      tech: [
        "Next.js",
        "TypeScript",
        "Socket.IO",
        "Stripe",
        "Redux",
        "Leaflet",
      ],
      image: "https://picsum.photos/seed/kirana/400/250",
      link: "https://kirana-eta.vercel.app/",
      github: "https://github.com/Alok595",
      category: "Full Stack",
    },
    {
      id: "proj-wallpaperbot",
      title: "WallPaperBot",
      description:
        "Full-Stack MERN wallpaper platform with role-based access for Owners and Users, JWT + Firebase Auth, and Cloudinary image uploads.",
      tech: ["React", "Node.js", "MongoDB", "Cloudinary", "Redux", "Tailwind"],
      image: "https://picsum.photos/seed/wallpaperbot/400/250",
      link: "https://wallpaperbotproject-1.onrender.com/",
      github: "https://github.com/Alok595",
      category: "Full Stack",
    },
    {
      id: "proj-botwears",
      title: "BotWears",
      description:
        "Full-Stack MERN E-Commerce platform with Admin and User dashboards, Google OAuth, product filters, and an AI voice navigation system.",
      tech: ["React", "Node.js", "MongoDB", "Google OAuth", "JWT", "Tailwind"],
      image: "https://picsum.photos/seed/botwears/400/250",
      link: "https://botwearsfullstack-frontendone.onrender.com/",
      github: "https://github.com/Alok595",
      category: "Full Stack",
    },
  ],

  skillGroups: [
    {
      category: "Frontend",
      skills: [
        { name: "React / Next.js", level: 90 },
        { name: "TypeScript", level: 80 },
        { name: "React Native", level: 50 },
        { name: "HTML / CSS / JS", level: 90 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Redux Toolkit", level: 75 },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Express.js", level: 80 },
        { name: "REST APIs", level: 85 },
        { name: "Socket.IO", level: 65 },
      ],
    },
    {
      category: "Database",
      skills: [
        { name: "MongoDB", level: 80 },
        { name: "MySQL", level: 65 },
      ],
    },
    {
      category: "Data Science & ML",
      skills: [
        { name: "Python", level: 70 },
        { name: "Pandas / NumPy", level: 65 },
        { name: "Scikit-learn", level: 60 },
        { name: "TensorFlow", level: 55 },
        { name: "Power BI", level: 55 },
      ],
    },
    {
      category: "Tools",
      skills: [
        { name: "Git / GitHub", level: 85 },
        { name: "Postman", level: 80 },
        { name: "VS Code", level: 95 },
        { name: "Google Colab", level: 70 },
      ],
    },
  ],

  certificates: [
    {
      title: "React Native Mobile App Development",
      issuer: "GeeksforGeeks",
      date: "2024",
      link: "https://media.geeksforgeeks.org/courses/certificates/a23c5ec368195b543a25a4834ee069b6.pdf",
    },
    {
      title: "Data Science Certification",
      issuer: "GUVI (HCL Group)",
      date: "2025",
      link: "https://www.guvi.in/verify-certificate?id=2UyIs12573Q871nha2",
    },
  ],

  resume: {
    url: "/resume.pdf",
    lastUpdated: "2026-03-29",
  },

  desktopItems: [
    {
      id: "recycle-bin",
      name: "Recycle Bin",
      icon: "https://img.icons8.com/fluency/48/000000/recycle-bin.png",
      windowId: "recycle-bin",
      type: "app",
    },
    {
      id: "about",
      name: "About Me",
      icon: "https://img.icons8.com/fluency/48/000000/user-male-circle.png",
      windowId: "about",
      type: "app",
    },
    {
      id: "internships",
      name: "Internships",
      icon: "https://img.icons8.com/?size=100&id=sjU25OaHSsIN&format=png&color=000000",
      windowId: "explorer",
      type: "app",
    },
    {
      id: "projects",
      name: "Projects",
      icon: "https://img.icons8.com/fluency/48/000000/briefcase.png",
      windowId: "projects",
      type: "app",
    },
    {
      id: "camera",
      name: "Camera",
      icon: "https://img.icons8.com/fluency/48/000000/camera.png",
      windowId: "camera",
      type: "app",
    },
    {
      id: "skills",
      name: "Skills",
      icon: "https://img.icons8.com/fluency/48/000000/code.png",
      windowId: "skills",
      type: "app",
    },
    {
      id: "github",
      name: "GitHub",
      icon: "https://img.icons8.com/fluency/48/000000/github.png",
      url: "https://github.com/Alok595",
      type: "link",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "https://img.icons8.com/fluency/48/000000/linkedin.png",
      url: "https://linkedin.com/in/alok-ranjan-193a84298",
      type: "link",
    },
    {
      id: "certificates",
      name: "Certificates",
      icon: "https://img.icons8.com/fluency/48/000000/certificate.png",
      windowId: "certificates",
      type: "app",
    },
    {
      id: "terminal",
      name: "Terminal",
      icon: "https://img.icons8.com/fluency/48/000000/console.png",
      windowId: "terminal",
      type: "app",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: "https://img.icons8.com/fluency/48/000000/youtube-play.png",
      url: "https://youtube.com",
      type: "link",
    },
    {
      id: "contact",
      name: "Contact",
      icon: "https://img.icons8.com/fluency/48/000000/mail.png",
      windowId: "contact",
      type: "app",
    },
    {
      id: "explorer",
      name: "File Explorer",
      icon: "https://img.icons8.com/fluency/48/000000/folder-invoices.png",
      windowId: "explorer",
      type: "app",
    },
  ],

  fileSystem: [
    {
      id: "this-pc",
      name: "This PC",
      type: "folder",
      icon: "https://img.icons8.com/fluency/48/000000/monitor.png",
      content: [
        {
          id: "projects",
          name: "Projects",
          type: "folder",
          icon: "https://img.icons8.com/fluency/48/000000/briefcase.png",
          content: [
            {
              id: "proj-1",
              name: "Kirana",
              type: "folder",
              icon: "https://img.icons8.com/fluency/48/000000/folder-invoices.png",
              textContent:
                "Project: Kirana Grocery Delivery App\n\nFull-Stack Next.js + TypeScript grocery delivery platform designed for local kirana stores with multiple user roles.\n\nFeatures:\n- Three user roles: User, Admin, Delivery Agent\n- Real-time maps and live location tracking\n- OTP based order delivery verification\n- Real-time chat using Socket.IO\n- Secure payments with Stripe\n\nTech Stack:\n- Frontend: Next.js, TypeScript, TailwindCSS\n- Backend: Node.js, Express\n- State: Redux\n- Maps: Leaflet\n- Realtime: Socket.IO\n- Auth: Google OAuth, NextAuth, OTP login\n- Media: Cloudinary\n- Charts: Recharts\n\nLive Link:\nhttps://kirana-eta.vercel.app/",
              url: "https://kirana-eta.vercel.app/",
              content: [],
            },
            {
              id: "proj-2",
              name: "WallPaperBot",
              type: "folder",
              icon: "https://img.icons8.com/fluency/48/000000/folder-invoices.png",
              textContent:
                "Project: WallPaperBot\n\nFull-Stack MERN wallpaper platform with role based access for Owners and Users.\n\nFeatures:\n- Secure authentication with JWT and Firebase Auth\n- Image uploads using Cloudinary + Multer\n- Role based access system\n- Wallpaper browsing and uploading system\n\nTech Stack:\n- Frontend: ReactJS, Redux, TailwindCSS\n- Backend: Node.js, Express\n- Database: MongoDB\n- Media Storage: Cloudinary\n\nLive Link:\nhttps://wallpaperbotproject-1.onrender.com/",
              url: "https://wallpaperbotproject-1.onrender.com/",
              content: [],
            },
            {
              id: "proj-3",
              name: "BotWears",
              type: "folder",
              icon: "https://img.icons8.com/fluency/48/000000/folder-invoices.png",
              textContent:
                "Project: BotWears\n\nFull-Stack MERN E-Commerce platform with Admin and User dashboards.\n\nFeatures:\n- Product filters, search, and recommendations\n- Admin dashboard for product and inventory management\n- Google OAuth login\n- JWT based authentication\n- AI voice navigation system\n\nTech Stack:\n- Frontend: ReactJS, TailwindCSS\n- Backend: Node.js, Express\n- Database: MongoDB\n- Auth: Google OAuth + JWT\n\nLive Link:\nhttps://botwearsfullstack-frontendone.onrender.com/",
              url: "https://botwearsfullstack-frontendone.onrender.com/",
              content: [],
            },
          ],
        },
        {
          id: "internships",
          name: "Internships & Experience",
          type: "folder",
          icon: "https://img.icons8.com/?size=100&id=sjU25OaHSsIN&format=png&color=000000",
          content: [
            {
              id: "intern-uptoskills",
              name: "UpToSkills — MERN Intern",
              type: "folder",
              icon: "https://img.icons8.com/fluency/48/000000/company.png",
              textContent:
                "Internship: MERN Full-Stack Developer Intern\nCompany: UpToSkills\nDuration: Dec 2025 – Present\nType: Full-Stack Development\n\nResponsibilities:\n- Contributing to the company's AI Resume Builder product, focusing on the Admin Panel.\n- Enhanced frontend and backend features including UI design, dashboard creation, and data management.\n- Designed and integrated REST APIs for seamless data flow in the dashboard.\n- Enhanced the CV creation module ensuring smooth interaction between frontend and backend.\n\nTech Stack:\n- MongoDB, Express.js, React, Node.js (MERN)\n- Redux, Tailwind CSS, Axios, REST APIs\n\nStatus: Currently Active",
              content: [
                {
                  id: "uptoskills-role",
                  name: "Role & Responsibilities.txt",
                  type: "file",
                  fileType: "Text Document",
                  icon: "https://img.icons8.com/fluency/48/000000/document.png",
                  textContent:
                    "Role: MERN Full-Stack Developer Intern\nCompany: UpToSkills\nDuration: Dec 2025 – Present\n\nKey Contributions:\n1. AI Resume Builder — Admin Panel development\n2. UI design and dashboard creation\n3. REST API design and integration\n4. CV creation module enhancement\n5. Frontend + Backend data flow optimization",
                },
                {
                  id: "uptoskills-tech",
                  name: "Tech Stack.txt",
                  type: "file",
                  fileType: "Text Document",
                  icon: "https://img.icons8.com/fluency/48/000000/document.png",
                  textContent:
                    "Technologies Used at UpToSkills:\n\n- MongoDB — Database\n- Express.js — Backend framework\n- React — Frontend library\n- Node.js — Runtime environment\n- Redux — State management\n- Tailwind CSS — Styling\n- Axios — HTTP client\n- REST APIs — Data communication",
                },
              ],
            },
            {
              id: "intern-guvi",
              name: "GUVI (HCL Group) — ML Intern",
              type: "folder",
              icon: "https://img.icons8.com/fluency/48/000000/company.png",
              textContent:
                "Internship: Hybrid Integrated Internship Program\nCompany: GUVI — HCL Group Company\nDuration: Jun 2025 – Sep 2025\nType: Data Science & Machine Learning\n\nResponsibilities:\n- Gained practical experience through projects reflecting real-world industry challenges.\n- Focused skill-building in Python, MySQL, Data Science, TensorFlow, scikit-learn, and Deep Learning.\n- Completed multiple practical assignments and projects.\n- Received internship completion certificate after successful project submission.\n\nTech Stack:\n- Python, MySQL\n- TensorFlow, scikit-learn\n- Data Science, Deep Learning\n\nStatus: Completed ✓\nCertificate: https://www.guvi.in/verify-certificate?id=2UyIs12573Q871nha2",
              content: [
                {
                  id: "guvi-role",
                  name: "Role & Responsibilities.txt",
                  type: "file",
                  fileType: "Text Document",
                  icon: "https://img.icons8.com/fluency/48/000000/document.png",
                  textContent:
                    "Role: Hybrid Integrated Intern\nCompany: GUVI (HCL Group)\nDuration: Jun 2025 – Sep 2025\n\nKey Contributions:\n1. Real-world industry challenge projects\n2. Python and MySQL skill development\n3. Machine learning model building\n4. Deep learning practical assignments\n5. Internship completion with certificate",
                },
                {
                  id: "guvi-cert",
                  name: "Completion Certificate.pdf",
                  type: "file",
                  fileType: "PDF Document",
                  icon: "https://img.icons8.com/fluency/48/000000/pdf.png",
                  url: "https://www.guvi.in/verify-certificate?id=2UyIs12573Q871nha2",
                },
              ],
            },
            {
              id: "experience-summary",
              name: "Experience Summary.txt",
              type: "file",
              fileType: "Text Document",
              icon: "https://img.icons8.com/fluency/48/000000/document.png",
              textContent:
                "=== ALOK RANJAN — EXPERIENCE SUMMARY ===\n\nTotal Internships: 2\nCurrent Status: Actively interning at UpToSkills\n\n──────────────────────────────────────\n1. UpToSkills — MERN Full-Stack Developer Intern\n   Duration : Dec 2025 – Present\n   Focus    : AI Resume Builder, Admin Panel\n   Stack    : MERN, Redux, Tailwind, REST APIs\n──────────────────────────────────────\n2. GUVI (HCL Group) — Hybrid Integrated Intern\n   Duration : Jun 2025 – Sep 2025\n   Focus    : Data Science, ML, Deep Learning\n   Stack    : Python, MySQL, TensorFlow, scikit-learn\n   Status   : Completed ✓\n──────────────────────────────────────\n\nKey Strengths Gained:\n• Full-stack product development experience\n• REST API design and integration\n• Machine learning and data science workflows\n• Real-world industry project delivery\n• Admin dashboard and UI/UX development",
            },
          ],
        },
        {
          id: "certificates",
          name: "Certificates",
          type: "folder",
          icon: "https://img.icons8.com/fluency/48/000000/certificate.png",
          content: [
            {
              id: "cert-1",
              name: "GeeksforGeeks React Native Mobile App Development.pdf",
              type: "file",
              fileType: "PDF Document",
              icon: "https://img.icons8.com/fluency/48/000000/pdf.png",
              url: "https://media.geeksforgeeks.org/courses/certificates/a23c5ec368195b543a25a4834ee069b6.pdf",
            },
            {
              id: "cert-2",
              name: "Data Science Certification - GUVI HCL.pdf",
              type: "file",
              fileType: "PDF Document",
              icon: "https://img.icons8.com/fluency/48/000000/pdf.png",
              url: "https://www.guvi.in/verify-certificate?id=2UyIs12573Q871nha2",
            },
          ],
        },
        {
          id: "pictures",
          name: "Pictures",
          type: "folder",
          icon: "https://img.icons8.com/fluency/48/000000/pictures-folder.png",
          content: [],
        },
        {
          id: "drive-c",
          name: "Local Disk (C:)",
          type: "folder",
          icon: "https://img.icons8.com/?size=100&id=9914&format=png&color=000000",
          content: [
            {
              id: "users",
              name: "Users",
              type: "folder",
              icon: "https://img.icons8.com/fluency/48/000000/folder-invoices.png",
              content: [
                {
                  id: "alok",
                  name: "Alok",
                  type: "folder",
                  icon: "https://img.icons8.com/fluency/48/000000/folder-invoices.png",
                  content: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
