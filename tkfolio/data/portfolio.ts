/* ================================================================
   PORTFOLIO DATA — Thirunavukkarasu Veeramani · Robotics Engineer
   Updated: New skills + LogoLoop icons
================================================================ */

export interface Project {
  id: string;
  num: string;
  title: string;
  summary: string;
  category: 'robotics' | 'ds';
  featured?: boolean;
  image: string;
  tags: { label: string; color?: 'green' | 'red' | 'default' }[];
  date: string;
  status?: 'live';
  descBullets: string[];
  detailTags: { label: string; color?: 'green' | 'red' | 'default' }[];
  githubUrl: string;
}

export interface SkillBar {
  name: string;
  pct: number;
}

export interface SkillCard {
  id: string;
  title: string;
  icon: string;
  glowColor: 'cyan' | 'rose' | 'green' | 'blue';
  bars: SkillBar[];
  tags: string[];
}

export interface TimelineItem {
  id: string;
  date: string;
  role: string;
  org: string;
  desc: string;
  tags: { label: string; color?: 'green' | 'red' | 'default' }[];
  side: 'left' | 'right';
}

export interface Achievement {
  id: string;
  badge: string;
  year: string;
  icon: string;
  title: string;
  role: string;
  desc: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  coursework?: string;
  dates: string;
  cgpa?: string;
  percentage?: string;
}

export interface Certification {
  id: string;
  provider: string;
  title: string;
}

export interface NavLink {
  label: string;
  href: string;
}

// ── NAV LINKS ──────────────────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

// ── PROJECTS ───────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 'robix',
    num: 'Project 01',
    title: 'Autonomous Mobile Robot (ROBIX)',
    summary: 'AMR designed for autonomous navigation and obstacle avoidance in indoor environments utilizing ESP32 and ROS.',
    category: 'robotics',
    featured: true,
    image: '/images/robix_amr.png',
    tags: [
      { label: 'ESP32' },
      { label: 'ROS' },
      { label: 'Autonomous Nav', color: 'green' },
    ],
    date: 'Jun 2026 · Ongoing',
    status: 'live',
    descBullets: [
      'AMR designed for autonomous navigation & obstacle avoidance in indoor environments.',
      'Integrated ESP32, sensors & motor control for real-time movement & localization.',
      'Collaborated on robot design, testing & system optimization to improve navigation accuracy.',
    ],
    detailTags: [
      { label: 'ESP32' },
      { label: 'ROS' },
      { label: 'Autonomous Nav', color: 'green' },
      { label: 'Sensor Fusion', color: 'red' },
      { label: 'C++' },
    ],
    githubUrl: 'https://github.com/thirun30-dev',
  },
  {
    id: 'zeno',
    num: 'Project 02',
    title: 'Zeno — Self-Balancing Robot',
    summary: 'Two-wheel self-balancing robot utilizing PID control algorithms, ESP32, and an MPU6050 sensor.',
    category: 'robotics',
    image: '/images/zeno.png',
    tags: [
      { label: 'ESP32' },
      { label: 'PID Control', color: 'red' },
      { label: 'MPU6050' },
    ],
    date: 'May 2026 — Jun 2026',
    descBullets: [
      'Two-wheel self-balancing robot using ESP32, MPU6050, TB6612FNG motor driver & N20 motors.',
      'Implemented PID-based stabilization algorithms for real-time balancing performance.',
    ],
    detailTags: [
      { label: 'ESP32' },
      { label: 'PID Control', color: 'red' },
      { label: 'MPU6050' },
      { label: 'Embedded C', color: 'green' },
      { label: 'Real-Time' },
    ],
    githubUrl: 'https://github.com/thirun30-dev/Zeno',
  },
  {
    id: 'btrace',
    num: 'Project 03',
    title: 'Bluetooth Robo Race Bot',
    summary: 'High-speed racing robot controlled via Bluetooth using ESP32 with custom motor controls.',
    category: 'robotics',
    image: '/images/bluetooth_race_bot.png',
    tags: [
      { label: 'ESP32' },
      { label: 'Bluetooth', color: 'red' },
      { label: 'Motor Control', color: 'green' },
    ],
    date: 'Apr 2026',
    descBullets: [
      'Bluetooth-controlled racing robot designed and programmed on ESP32.',
      'Integrated motor control, wireless communication & mobile app control functionality.',
    ],
    detailTags: [
      { label: 'ESP32' },
      { label: 'Bluetooth', color: 'red' },
      { label: 'Motor Control', color: 'green' },
      { label: 'Arduino' },
    ],
    githubUrl: 'https://github.com/thirun30-dev',
  },
  {
    id: 'lane',
    num: 'Project 04',
    title: 'Autonomous Lane Detection',
    summary: 'Real-time lane detection pipeline for autonomous vehicles using depth camera data and OpenCV.',
    category: 'ds',
    image: '/images/lane_detection.png',
    tags: [
      { label: 'Python' },
      { label: 'OpenCV', color: 'red' },
      { label: 'Depth Camera', color: 'green' },
    ],
    date: 'Feb 2026 — May 2026',
    descBullets: [
      'Built a real-time lane detection pipeline using a depth (RGB-D) camera and OpenCV for autonomous vehicle navigation.',
      'Integrated depth data for 3D lane boundary estimation, enabling safe path planning on uneven and unmarked roads.',
      'Achieved robust detection under varying lighting conditions using adaptive thresholding and perspective-transform techniques.',
    ],
    detailTags: [
      { label: 'Python' },
      { label: 'OpenCV', color: 'red' },
      { label: 'Depth Camera', color: 'green' },
      { label: 'ROS' },
      { label: 'Computer Vision' },
      { label: 'Autonomous Nav' },
    ],
    githubUrl: 'https://github.com/thirun30-dev',
  },
];

// ── SKILLS ─────────────────────────────────────────────────────
export const skillCards: SkillCard[] = [
  {
    id: 'robotics',
    title: 'Robotics & Control Systems',
    icon: '🤖',
    glowColor: 'cyan',
    bars: [
      { name: 'ROS & ROS2 (Robot Operating System)', pct: 75 },
      { name: 'PID & Control Algorithms', pct: 88 },
      { name: 'Sensor Integration (LiDAR, IMU, Depth Cameras)', pct: 88 },
      { name: 'Autonomous Mobile Robots & Navigation', pct: 80 },
      { name: 'SolidWorks & CAD Prototyping', pct: 70 },
      { name: 'PLC Programming & Industrial Automation', pct: 72 },
    ],
    tags: ['Robotics System Design', 'Autonomous Navigation', 'PID Control', 'Motor Control', 'SolidWorks', 'PLC'],
  },
  {
    id: 'embedded',
    title: 'Embedded & Firmware Dev',
    icon: '🔌',
    glowColor: 'rose',
    bars: [
      { name: 'Arduino Programming & IDE', pct: 92 },
      { name: 'ESP32 & Microcontrollers', pct: 90 },
      { name: 'C / C++ (Embedded C)', pct: 85 },
      { name: 'Wireless Protocols (Bluetooth, Wi-Fi, MQTT)', pct: 80 },
    ],
    tags: ['Embedded Systems', 'ESP32', 'C / C++', 'Motor Control', 'Wireless Communication'],
  },
  {
    id: 'webdev',
    title: 'Programming & Web Development',
    icon: '💻',
    glowColor: 'blue',
    bars: [
      { name: 'Python & DSA in Python', pct: 90 },
      { name: 'HTML, CSS & JavaScript', pct: 85 },
      { name: 'React & Next.js', pct: 80 },
      { name: 'Tailwind CSS', pct: 82 },
      { name: 'Git & GitHub', pct: 85 },
    ],
    tags: ['Python', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Git / GitHub'],
  },
  {
    id: 'datascience',
    title: 'Data Science & Machine Learning',
    icon: '📊',
    glowColor: 'green',
    bars: [
      { name: 'Machine Learning (Supervised & Unsupervised)', pct: 78 },
      { name: 'DSA in Python', pct: 82 },
      { name: 'OpenCV & Computer Vision Pipelines', pct: 82 },
      { name: 'Statistical Modeling & Analysis', pct: 78 },
      { name: 'Database Management & SQL', pct: 85 },
    ],
    tags: ['Machine Learning', 'Data Analysis', 'OpenCV', 'DSA', 'SQL / Databases'],
  },
];

// ── LOGO LOOP TECH STACK ────────────────────────────────────────
export interface TechLogo {
  icon: string;   // react-icons component name key
  title: string;
  color: string;
}

export const techLogos: TechLogo[] = [
  { icon: 'SiPython',      title: 'Python',      color: '#3776AB' },
  { icon: 'SiCplusplus',   title: 'C++',         color: '#00599C' },
  { icon: 'SiGithub',      title: 'GitHub',      color: '#e2e8f0' },
  { icon: 'SiHtml5',       title: 'HTML5',       color: '#E34F26' },
  { icon: 'SiCss3',        title: 'CSS3',        color: '#1572B6' },
  { icon: 'SiJavascript',  title: 'JavaScript',  color: '#F7DF1E' },
  { icon: 'SiReact',       title: 'React',       color: '#61DAFB' },
  { icon: 'SiNextdotjs',   title: 'Next.js',     color: '#e2e8f0' },
  { icon: 'SiTailwindcss', title: 'Tailwind',    color: '#06B6D4' },
  { icon: 'SiArduino',     title: 'Arduino',     color: '#00979D' },
  { icon: 'SiRos',         title: 'ROS',         color: '#22314E' },
  { icon: 'SiOpencv',      title: 'OpenCV',      color: '#5C3EE8' },
  { icon: 'SiLinux',       title: 'Linux',       color: '#FCC624' },
  { icon: 'SiMysql',       title: 'SQL',         color: '#4479A1' },
];

// ── EXPERIENCE / TIMELINE ──────────────────────────────────────
export const timelineItems: TimelineItem[] = [
  {
    id: 'robix-lead',
    date: 'Jun 2026 · Ongoing',
    role: 'Robotics Project Lead',
    org: 'ROBIX · Rajalakshmi Engineering College',
    desc: 'Leading the design and development of an Autonomous Mobile Robot (AMR) for indoor navigation. Responsible for system architecture, sensor integration, and team coordination.',
    tags: [{ label: 'ESP32' }, { label: 'ROS' }, { label: 'Team Lead', color: 'green' }],
    side: 'left',
  },
  {
    id: 'robo-race',
    date: 'Apr 2026',
    role: 'Robo Race Participant',
    org: 'Technical Fest · Chennai',
    desc: 'Competed in a Robo Race event — designed, built and programmed a Bluetooth-controlled racing robot from scratch within the competition timeline.',
    tags: [{ label: 'Competition', color: 'red' }, { label: 'Bluetooth' }, { label: 'Arduino', color: 'green' }],
    side: 'right',
  },
  {
    id: 'rec-student',
    date: 'Sep 2023 · Ongoing',
    role: 'B.E. Robotics Student',
    org: 'Rajalakshmi Engineering College · Chennai',
    desc: 'Pursuing B.E. in Robotics & Automation with active involvement in robotics clubs and technical projects. Maintaining a strong CGPA of 8.2 while working on real-world robot builds.',
    tags: [{ label: 'Robotics' }, { label: 'CGPA 8.2', color: 'green' }, { label: 'Engineering' }],
    side: 'left',
  },
];

// ── ACHIEVEMENTS ───────────────────────────────────────────────
export const achievements: Achievement[] = [
  {
    id: 'design-thinking',
    badge: 'Competition',
    year: '2026',
    icon: '💡',
    title: 'Design Thinking and Innovation Contest',
    role: 'Winners',
    desc: 'Awarded first place at Rajalakshmi Engineering College for building innovative solutions using design thinking paradigms.',
  },
  {
    id: 'smaratathon',
    badge: 'Competition',
    year: '2026',
    icon: '🚚',
    title: 'Smaratathon 2.0',
    role: 'Transportation & Logistics Winners',
    desc: 'Won the transportation and logistics category at St. Joseph Engineering College for optimized logistics tracking systems.',
  },
  {
    id: 'sih-internal',
    badge: 'Hackathon',
    year: '2025',
    icon: '🏆',
    title: 'Smart India Hackathon (Internal)',
    role: 'Internal Hackathon Winners',
    desc: 'Won the internal hackathon rounds at Rajalakshmi Engineering College, qualifying for the national-level stages.',
  },
  {
    id: 'iitm-academic',
    badge: 'Academic',
    year: 'Ongoing',
    icon: '📊',
    title: 'IIT Madras Data Science',
    role: 'B.S. Degree Scholar',
    desc: 'Pursuing a Bachelor of Science (B.S.) in Data Science from the Indian Institute of Technology, Madras. Excelling in Python programming, SQL databases, and statistical data modeling.',
  },
  {
    id: 'rec-academic',
    badge: 'Academic',
    year: '2024',
    icon: '🎖️',
    title: 'REC Academic Honors',
    role: 'Elite + Gold Medalist',
    desc: 'Awarded Elite + Gold Medal in NPTEL Python for Data Science and Data Structures Foundations courses, maintaining an 8.2+ CGPA in Robotics & Automation Engineering at Rajalakshmi Engineering College.',
  },
];

// ── EDUCATION ──────────────────────────────────────────────────
export const educationItems: Education[] = [
  {
    id: 'rec',
    degree: 'B.E. — Robotics and Automation',
    institution: 'Rajalakshmi Engineering College',
    coursework: 'Robotics · Embedded Systems · Industrial Automation · Control Systems · Kinematics & Dynamics',
    dates: 'Sep 2023 — Apr 2027',
    cgpa: '8.2',
  },
  {
    id: 'iit',
    degree: 'Online B.S. — Data Science',
    institution: 'Indian Institute of Technology (IIT) Madras',
    coursework: 'Data Analysis, Statistical Modelling, Database Management, and Python programming.',
    dates: 'Ongoing',
  },
  {
    id: 'class12',
    degree: 'CLASS XII (CBSE)',
    institution: 'Velammal Bodhi Residential School, Ladanendal',
    dates: 'Apr 2023',
    percentage: '86.4%',
  },
  {
    id: 'class10',
    degree: 'CLASS X (CBSE)',
    institution: 'Sri Ramana Academy, Rajapalayam',
    dates: 'Apr 2021',
    percentage: '83.4%',
  },
];

// ── CERTIFICATIONS ─────────────────────────────────────────────
export const certifications: Certification[] = [
  {
    id: 'nptel-pd',
    provider: 'NPTEL',
    title: 'Product Design and Manufacturing',
  },
  {
    id: 'nptel-iot',
    provider: 'NPTEL',
    title: 'Internet of Things (Elite)',
  },
  {
    id: 'udemy-ros',
    provider: 'Udemy',
    title: 'ROS for Beginners',
  },
  {
    id: 'linkedin-plc',
    provider: 'LinkedIn Learning',
    title: 'PLC Basis',
  },
];


// ── TYPEWRITER ROLES ───────────────────────────────────────────
export const typewriterRoles = [
  'Robotics Engineer',
  'Embedded Systems Dev',
  'AI / ML Enthusiast',
  'Autonomous Nav Builder',
  'PID Control Expert',
  'Web Developer',
];

// ── TERMINAL LOGS ──────────────────────────────────────────────
export interface TerminalLog {
  text: string;
  type: 'system' | 'info' | 'success';
  delay: number;
}

export const terminalLogs: TerminalLog[] = [
  { text: 'System diagnostics initiating...', type: 'system', delay: 100 },
  { text: 'Establishing secure link to REC network node...', type: 'info', delay: 250 },
  { text: 'Loading kinematics solver: 2WD Differential Drive... [OK]', type: 'success', delay: 450 },
  { text: 'Connecting to ESP32 websocket interface... Host: 192.168.1.45', type: 'info', delay: 650 },
  { text: 'Calibrating MPU6050 6-Axis IMU sensor...', type: 'info', delay: 850 },
  { text: 'Sensor offset computed: [X:-12, Y:45, Z:8]. Calibration OK.', type: 'success', delay: 1050 },
  { text: 'Loading ROS2 navigation modules (AMCL, Nav2)...', type: 'info', delay: 1250 },
  { text: 'Compiling Embedded C firmware package...', type: 'info', delay: 1450 },
  { text: 'Robotics system state: ACTIVE. Battery charge: 92%.', type: 'success', delay: 1650 },
  { text: 'Retrieving B.S. Data Science models from IIT Madras servers...', type: 'info', delay: 1850 },
  { text: 'Connecting OpenCV lane detection neural pipeline... edge thresholds set.', type: 'success', delay: 2050 },
  { text: 'Initializing portfolio web interface shell...', type: 'info', delay: 2200 },
  { text: "SYSTEM ONLINE. Welcome to Thirunavukkarasu's space.", type: 'system', delay: 2400 },
];
