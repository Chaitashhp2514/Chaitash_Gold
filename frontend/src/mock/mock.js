// Mock data for Patel Chaitash's portfolio.
// All content lives here so the rest of the UI stays clean.

export const profile = {
  name: "Patel Chaitash",
  firstName: "Chaitash",
  lastName: "Patel",
  title: "Computer Engineer",
  tagline: "Building thoughtful software, from circuits to interfaces.",
  summary:
    "Motivated and detail-oriented Computer Engineer with hands-on experience crafting hardware\u2011software solutions. Comfortable across programming languages, circuit design, web & mobile development, and database systems, with a strong sense of analytical thinking. Passionate about shipping impactful projects and constantly learning at the edge of emerging technologies.",
  location: "Anand, Gujarat, India",
  email: "chaitash.work@gmail.com",
  phone: "+91 70692 91955",
  address: "34, Rajhans Society, Opp. Rutu Ice-cream, Nr. APC, Anand",
  photo:
    "https://i.ibb.co/RGWQ7Z77/IMG-5132.png",
  resumeUrl:
    "https://drive.google.com/file/d/1qa3xFDgxEK9xmhXwblXN-f0U_Q8CUwQF/view?usp=sharing",
  social: {
    linkedin: "https://linkedin.com/in/chaitash-patel-3717501a0",
    github: "https://github.com/chaitashhp2514",
    email: "mailto:chaitash.work@gmail.com"
  },
  availability: "Open to work",
  yearsOfLearning: 6
};

export const stats = [
  { label: "Years coding", value: "4+" },
  { label: "Projects built", value: "4" },
  { label: "Technologies", value: "10+" },
  { label: "Languages Spoken", value: "3" }
];

export const skillGroups = [
  {
    category: "Languages",
    items: [
      { name: "C++", level: 92 },
      { name: "PHP", level: 88 },
      { name: "Python", level: 75 },
      { name: "Java", level: 72 },
      { name: "Dart", level: 78 }
    ]
  },
  {
    category: "Frontend",
    items: [
      { name: "React", level: 85 },
      { name: "Flutter", level: 82 },
      { name: "HTML / CSS", level: 90 },
      { name: "Tailwind CSS", level: 80 }
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 82 },
      { name: "Express", level: 78 },
      { name: "REST APIs", level: 84 },
      { name: "Firebase", level: 80 }
    ]
  },
  {
    category: "Databases",
    items: [
      { name: "MongoDB", level: 82 },
      { name: "MySQL", level: 85 },
      { name: "SQL", level: 80 }
    ]
  },
  {
    category: "Mobile",
    items: [
      { name: "Flutter", level: 82 },
      { name: "Android (Java/Kotlin)", level: 75 }
    ]
  },
  {
    category: "Engineering",
    items: [
      { name: "Algorithms", level: 82 },
      { name: "Circuit Design", level: 78 },
      { name: "Hardware\u2011Software Integration", level: 76 }
    ]
  }
];

export const softSkills = [
  "Teamwork & Collaboration",
  "Time Management",
  "Leadership & Decision\u2011Making",
  "Effective Communication",
  "Critical & Analytical Thinking"
];

export const toolbelt = [
  "React",
  "Node.js",
  "Express",
  "Flutter",
  "Firebase",
  "MongoDB",
  "MySQL",
  "SQL",
  "Java",
  "Kotlin",
  "Dart",
  "Stripe API",
  "C++",
  "PHP",
  "Python"
];

export const projects = [
  {
    id: "ar-furniture",
    title: "Furniture AR \u2014 Android App",
    year: "2022 \u2013 2023",
    summary:
      "An Augmented Reality Android app that lets shoppers place furniture in their own space in real time, turning indecision into confident purchases.",
    highlights: [
      "Real\u2011time AR placement & scale of 3D furniture models",
      "Product catalog backed by MongoDB & Node.js",
      "Smooth native experience built with Flutter & Java"
    ],
    stack: ["Dart", "Flutter", "Node.js", "Java", "MongoDB", "ARCore"],
    role: "Full\u2011Stack & Mobile Developer",
    type: "Mobile \u00b7 AR",
    accent: "amber"
  },
  {
    id: "ecommerce-platform",
    title: "E\u2011commerce Platform",
    year: "2021 \u2013 2022",
    summary:
      "A production\u2011grade online storefront for a retail client \u2014 from product browsing to secure checkout and order management.",
    highlights: [
      "Product catalog, cart & order management dashboard",
      "Secure payments via Stripe API with webhook handling",
      "Responsive UI built in React with Express + MongoDB backend"
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
    role: "Full\u2011Stack Developer",
    type: "Web \u00b7 Commerce",
    accent: "teal"
  },
  {
    id: "school-management",
    title: "School Management System",
    year: "2023",
    summary:
      "Android application that streamlines administrative tasks, communication, and academic/financial operations for educational institutions.",
    highlights: [
      "Role\u2011based dashboards for admin, teachers and students",
      "Firebase backed auth, messaging & realtime updates",
      "Built during Android internship at Tech Elecon Pvt. Ltd."
    ],
    stack: ["Dart", "Flutter", "Java", "Kotlin", "Firebase"],
    role: "Android Developer (Intern)",
    type: "Mobile \u00b7 EdTech",
    accent: "amber"
  }
];

export const experience = [
  {
    company: "Tech Elecon Pvt. Ltd.",
    role: "Android Developer \u2014 Intern",
    period: "1 Month",
    location: "Anand, Gujarat",
    bullets: [
      "Built an Android school\u2011management application that streamlined administrative workflows, communication, and academic/financial operations.",
      "Worked across Flutter, Java and Kotlin with a Firebase backend.",
      "Collaborated with senior engineers on code reviews and UI polish."
    ]
  }
];

export const education = [
  {
    degree: "Bachelor of Computer Engineering",
    org: "Madhuben & Bhanubhai Institute of Technology",
    sub: "Charutar Vidhya Mandal University",
    period: "2022 \u2013 2025",
    score: "CGPA 6.86 / 10",
    status: "Completed"
  },
  {
    degree: "Diploma in Computer Engineering",
    org: "B & B Institute of Technology",
    sub: "Gujarat Technological University",
    period: "2019 \u2013 2022",
    score: "CGPA 9.19 / 10",
    status: "Completed"
  }
];

export const achievements = [
  {
    title: "Basketball Championships \u2014 Leadership",
    detail:
      "Twice recognised for excellence in sportsmanship and leadership during inter\u2011university basketball championships."
  },
  {
    title: "Intercollegiate Hackathons",
    detail:
      "Represented the college at multiple intercollegiate hackathons, shipping innovative solutions to real\u2011world problems under tight deadlines."
  }
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" }
];
