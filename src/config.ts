// 1. Import the images at the top
// 1. Import the images at the top (corrected paths)
import cricketImg1 from "./assets/sports/cricket.jpg";
import cricketImg2 from "./assets/sports/cricket2.jpg";
import badmintonImg from "./assets/sports/badminton.jpg";

export const siteConfig = {
  name: "Anas Faiz",
  title: "Computer Science Student & Software Developer",
  description: "Portfolio website of Anas Faiz",
  accentColor: "#f0ede8",
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

  // Sports & Achievements
  sports: [
    {
      title: "University Cricket Team Representation",
      category: "Cricket",
      description: "Led the team to victory in Computer Science department cricket tournament.",
      image: cricketImg1, 
    },
    {
      title: "University cricket team",
      category: "Cricket",
      description: "Part of the university cricket team, contributing to team success.",
      image: cricketImg2,
    },
    {
      title: "Competitive Badminton",
      category: "Badminton",
      description: "Active player in both indoor and outdoor badminton settings.",
      image: badmintonImg,
    }
  ],

  // ─── Art Galleries ───────────────────────────────────────────────
  // To add MORE images later:
  //   1. Drop your files into public/art/photography/ or public/art/sketches/
  //   2. Add a new entry below with orientation: "portrait" or "landscape"
  // ─────────────────────────────────────────────────────────────────
  art: {
    photography: [
      { src: "/portfolio/art/photography/yellow.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/pink.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/hallway.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/hallway1.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/mosque.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/basketball.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/desert.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20251227_182403490.NIGHT~2.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20251228_152904513.NIGHT.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20251228_191132439.NIGHT.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20251229_071705875.MP.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260113_173319646.LONG_EXPOSURE-01.COVER~2.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260115_153519101.NIGHT.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260115_153730380.NIGHT.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260115_153840836.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260121_095900936~2.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260123_122440686.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260123_212158944.NIGHT.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260125_122621308~3.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260129_113124203.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260130_131840091.PANO.webp", orientation: "landscape" },
      { src: "/portfolio/art/photography/PXL_20260214_145018560.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260217_091720154~2.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260222_101846535~2.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260227_112806149~2.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260320_124906748.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260323_131919463.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260327_132212105.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260401_103002073.LONG_EXPOSURE-01.COVER~2.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260403_130548448.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260426_132307133.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260428_164357007.NIGHT.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260521_153902382.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260525_153910648~2.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260527_170447975.NIGHT.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260602_051336361.webp", orientation: "portrait" },
      { src: "/portfolio/art/photography/PXL_20260617_070127289.webp", orientation: "landscape" },
      { src: "/portfolio/art/photography/original_f34b489b-03c1-4a2e-918f-cd3922b615c8_PXL_20260129_085240839.webp", orientation: "portrait" },
    ] as Array<{ src: string; orientation: "portrait" | "landscape"; caption?: string }>,


    sketches: [
      { src: "/portfolio/art/sketches/disappointement.webp", orientation: "landscape" },
      { src: "/portfolio/art/sketches/monk.webp", orientation: "portrait" },
      { src: "/portfolio/art/sketches/us_and_them.webp", orientation: "landscape" },
      { src: "/portfolio/art/sketches/20260620_143928886.webp", orientation: "portrait" },
      { src: "/portfolio/art/sketches/20260620_144512629.webp", orientation: "portrait" },
      { src: "/portfolio/art/sketches/20260620_144611363.webp", orientation: "landscape" },
      { src: "/portfolio/art/sketches/20260620_144641140.webp", orientation: "portrait" },
      { src: "/portfolio/art/sketches/20260620_144655859.webp", orientation: "landscape" },
      { src: "/portfolio/art/sketches/20260620_144722608.webp", orientation: "landscape" },
      { src: "/portfolio/art/sketches/20260620_144743283.webp", orientation: "portrait" },
      { src: "/portfolio/art/sketches/20260620_144816131.webp", orientation: "portrait" },
      { src: "/portfolio/art/sketches/20260620_144840935.webp", orientation: "portrait" },
      { src: "/portfolio/art/sketches/20260620_145130006.webp", orientation: "portrait" },
      { src: "/portfolio/art/sketches/20260620_145150079.webp", orientation: "portrait" },
      { src: "/portfolio/art/sketches/20260620_145522273.webp", orientation: "portrait" },
      { src: "/portfolio/art/sketches/20260620_145602500.webp", orientation: "landscape" },
      { src: "/portfolio/art/sketches/20260620_145705524.webp", orientation: "portrait" },
    ] as Array<{ src: string; orientation: "portrait" | "landscape"; caption?: string }>,
  },
};