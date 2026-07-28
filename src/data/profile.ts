export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  details?: string[];
  logo?: string;
}

export interface Experience {
  role: string;
  organization: string;
  orgUrl?: string;
  period: string;
  duration: string;
  location: string;
  employmentType: 'Full-time' | 'Internship' | 'Part-time';
  type: 'internship' | 'teaching' | 'research' | 'fulltime';
  description: string[];
  tags: string[];
  logo?: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; icon?: string; level?: string }[];
}

export const PROFILE_DATA = {
  name: "Hanbo Guo",
  title: "Software Engineer @ ByteDance",
  avatar: "/assets/img/hanbo.png",
  location: "Bellevue, WA",
  bio: "Software engineer and CS researcher with experience in ML systems, systems software, distributed systems, and IoT sensing. Currently at ByteDance Seed; previously interned at ByteDance Seed, NVIDIA, and Tencent.",
  email: "ghbhanbo@gmail.com",
  socials: {
    github: "https://github.com/Haannbboo",
    linkedin: "https://www.linkedin.com/in/hanbo-guo/",
    googleScholar: "https://scholar.google.com/citations?user=3Fk--RoAAAAJ&hl=en&oi=ao",
    orcid: "https://orcid.org/0009-0007-1801-4979",
    email: "mailto:ghbhanbo@gmail.com",
  },

  education: [
    {
      degree: "M.S. in Computer Science",
      institution: "University of Illinois Urbana-Champaign",
      orgUrl: "https://cs.illinois.edu/",
      logo: "/assets/img/uiuc-logo.png",
      period: "Aug 2024 – May 2026",
      duration: "1 yr 10 mos",
      location: "Champaign, Illinois, United States",
      description: [
        "Research Assistant @ iSENS lab, working on Bistatic mmWave Radar Sensing System.",
        "Teaching Assistant @ CS425 Distributed Systems, CS438 Communication Networks, CS437 IoT, CS498 Cloud Computing.",
      ],
      tags: ["mmWave Radar", "IoT", "Distributed Systems", "Research", "Teaching"],
    },
    {
      degree: "B.S. in Computer Science",
      institution: "University of Illinois Urbana-Champaign",
      orgUrl: "https://cs.illinois.edu/",
      logo: "/assets/img/uiuc-logo.png",
      period: "Aug 2020 – May 2024",
      duration: "3 yrs 10 mos",
      location: "Champaign, Illinois, United States",
      description: [],
      tags: ["Computer Science"],
    },
  ] as Education[],

  experiences: [
    {
      role: "Software Engineer",
      organization: "ByteDance",
      orgUrl: "https://www.bytedance.com/",
      logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/bytedance-color.svg",
      period: "Jul 2026 – Present",
      duration: "1 mo",
      location: "Bellevue, Washington, United States",
      employmentType: "Full-time",
      type: "fulltime",
      description: [],
      tags: [],
    },
    {
      role: "Research Engineer Intern",
      organization: "ByteDance Seed",
      orgUrl: "https://www.bytedance.com/",
      logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/bytedance-color.svg",
      period: "May 2025 – Aug 2025",
      duration: "4 mos",
      location: "Bellevue, Washington, United States",
      employmentType: "Internship",
      type: "internship",
      description: [
        "Research Engineer Intern in ML Sys @ Seed Infra.",
        "Supported 100k parallel OpenHands rollouts and evaluation on a 200k core Kata cluster.",
      ],
      tags: ["ML Systems", "LLM", "OpenHands", "Kubernetes", "Python"],
    },
    {
      role: "System Software Intern",
      organization: "NVIDIA",
      orgUrl: "https://www.nvidia.com/",
      logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/nvidia.svg",
      period: "May 2024 – Aug 2024",
      duration: "4 mos",
      location: "Santa Clara, California, United States",
      employmentType: "Internship",
      type: "internship",
      description: [
        "System Software Intern in Display Drivers.",
        "Built an LLM agent for automated bug triaging service.",
      ],
      tags: ["C / C++", "Display Drivers", "LLM", "Systems Software", "CUDA"],
    },
    {
      role: "Data Engineer Intern",
      organization: "Tencent",
      orgUrl: "https://www.tencent.com/",
      logo: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/tencent-color.svg",
      period: "May 2023 – Aug 2023",
      duration: "4 mos",
      location: "Shenzhen, Guangdong, China",
      employmentType: "Internship",
      type: "internship",
      description: [
        "Developed an incremental 2D and 3D assets crawler framework using aiohttp and pyppeteer, achieving 10x speed up compared to synchronous programs.",
        "The framework stores raw assets in a distributed object store and supports resumable crawls at scale.",
      ],
      tags: ["Python", "aiohttp", "pyppeteer", "Web Scraping", "Data Pipelines"],
    },
  ] as Experience[],

  hobbies: [
    {
      title: "Denver Nuggets Fan",
      description: "Avid fan of NBA basketball and the Denver Nuggets.",
    },
    {
      title: "EVE-Online API & HFT Developer",
      description:
        "Active player and developer for EVE-Online. EVE's player-driven market (~30K active players) with real-time order books & buy/sell spread APIs provides a sandbox for high-frequency trading algorithms.",
    },
  ],

  skillCategories: [
    {
      category: "Languages",
      skills: [
        { name: "Python" },
        { name: "C / C++" },
        { name: "TypeScript" },
        { name: "JavaScript" },
        { name: "SQL" },
        { name: "Go" },
        { name: "HTML / CSS" },
      ],
    },
    {
      category: "Systems & Infrastructure",
      skills: [
        { name: "Distributed Systems" },
        { name: "Docker / Kubernetes" },
        { name: "AsyncIO / aiohttp" },
        { name: "Linux / Shell" },
        { name: "Git / GitHub Actions" },
        { name: "PostgreSQL / MySQL" },
      ],
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        { name: "React" },
        { name: "Chakra UI" },
        { name: "FastAPI / Django" },
        { name: "PyTorch / NumPy / SciPy" },
        { name: "CUDA" },
      ],
    },
  ] as SkillCategory[],
};
