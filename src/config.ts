export const siteConfig = {
  name: "Anas Faiz",
  title: "Computer Science Student & Software Developer",
  description: "Portfolio website of Anas Faiz",
  accentColor: "#1d4ed8",
  social: {
    email: "anasfaizsahi6@gmail.com",
    linkedin: "https://linkedin.com/in/anas-faiz-4289aa270",
    twitter: "",
    github: "https://github.com/anassaahi",
  },
  aboutMe:
    "I am a Computer Science student at the University of Engineering and Technology Lahore. My expertise spans software development, database systems, cybersecurity, and artificial intelligence. I enjoy architecting autonomous multi-agent systems, engineering high-performance databases, and conducting forensic analysis on critical infrastructure.",
  skills: [
    "C++", "Python", "TypeScript", "JavaScript", "Dart", "SQL", "C", "Java", 
    "Next.js", "React", "Node.js", "Flutter", "Firebase", "YOLOv8", "PyTorch", "OpenCV", "CUDA", 
    "Git", "Linux", "MCP", "Wireshark", "Nmap", "LaTeX", "Android Studio", "Docker"
  ],
  projects: [
    {
      name: "Research Intro Generator (Refiner Agent)",
      description:
        "Architected an autonomous multi-agent pipeline in Next.js that converts drafts into IEEE-formatted research papers, utilizing a custom Model Context Protocol (MCP), self-healing JSON parsers, and exponential-backoff logic to ensure robust Gemini API usage.",
      link: "https://github.com/M-Ibraheem0/SPM-Project",
      skills: ["Next.js 14", "TypeScript", "Gemini API", "MCP"],
    },
    {
      name: "Bicycle Marketplace Application",
      description:
        "Delivered a cross-platform marketplace app in Flutter with a responsive UI and optimized mobile UX for listing and discovery. Integrated serverless backend using Firebase for secure auth, user profiles, and multi-image uploads.",
      link: "https://github.com/anassaahi/Bicycle-Marketplace",
      skills: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
    },
    {
      name: "Custom SQL Database Engine",
      description:
        "Engineered a high-performance relational DBMS in C++ with B+ Tree indexing, 4KB paged storage and mmap-based I/O optimizations. Implemented ACID guarantees and concurrency control via WAL, 2PL, and MVCC.",
      link: "https://github.com/anassaahi/SQL-Database-engine",
      skills: ["C++", "React", "Node.js", "B+ Tree"],
    },
    {
      name: "Real-Time PPE Compliance Detection System",
      description:
        "Designed and trained a real-time PPE detector using YOLOv8, achieving 77% mAP@50 on a multi-class safety dataset. Built an end-to-end training pipeline with CUDA-accelerated PyTorch training optimized for low-VRAM environments.",
      link: "https://github.com/anassaahi/Personal-ppe-data-training",
      skills: ["Python", "YOLOv8", "PyTorch", "CUDA", "OpenCV"],
    }
  ],
  experience: [
    {
      company: "Project Basis",
      title: "Cybersecurity Analyst",
      dateRange: "Recent",
      bullets: [
        "Conducted forensic analysis of a multi-vector APT attack on London's Traffic Light Management System, investigating phishing, SQL injection, and SSH exploitation chains.",
        "Also did digital forensic and Cybersecurity analysis on Image files to extract the information about a legal case based scenario.",
        "Authored a comprehensive technical report outlining mitigation strategies for operational and economic impacts, including defenses against deepfake-based disinformation.",
      ],
    },
  ],
  education: [
    {
      school: "University of Engineering and Technology Lahore",
      degree: "BS in Computer Science",
      dateRange: "2023 - 2027",
      achievements: [
        "GPA: 3.853",
        "Located in Lahore, Pakistan",
      ],
    },
  ],
  // ... your previous config code (education, etc) ...

  // Sports & Achievements
  sports: [
    {
      title: "University Cricket Team Representation",
      category: "Cricket",
      description: "Led the team to victory in Computer Science department cricket tournament.",
      image: "/public/sports/cricket.jpg", // We will set up this folder next
    },
    {
      title: "University cricket team",
      category: "Cricket",
      description: "Part of the university cricket team, contributing to team success.",
      image: "/public/sports/cricket2.jpg",
    },
    {
      title: "Competitive Badminton",
      category: "Badminton",
      description: "Active player in both indoor and outdoor badminton settings.",
      image: "/public/sports/badminton.jpg",
    }
  ],
};