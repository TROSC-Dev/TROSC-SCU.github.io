import cybersecurityImage from "../../Assests/cyber security.webp";

export const trackData = {
  id: "cyber-security",
  title: "Cyber Security Track",
  subtitle:
    "Cyber Security isn't about hacking systems — it's about protecting people!",
  image: cybersecurityImage,
  overview:
    "This track is designed for students who want to explore the world of ethical hacking, network protection, and digital forensics. Join our sessions, complete hands-on tasks, and build your cyber defense skills step by step.",
  scheduleSummary: {
    nextSession: "Tomorrow, 10:00 AM",
    projectDeadline: "Oct 25, 2025",
    finalExam: "Nov 28, 2025",
  },
  resourcesSummary: [
    "Deep Learning Book",
    "TensorFlow Documentation",
    "PyTorch Tutorials",
  ],
  sessionsSummary: [
    {
      id: 1,
      title: "Introduction to Cyber Security.",
      description:
        "Get an overview of cyber security concepts, threats, and roles in the field.",
    },
    {
      id: 2,
      title: "Networking Basics for Security",
      description:
        "Learn how networks work, and how hackers exploit weak points.",
    },
    {
      id: 3,
      title: "Common Cyber Attacks",
      description:
        "Explore phishing, ransomware, and social engineering in real cases.",
    },
  ],
  weeklyTasks: [
    {
      id: 1,
      week: "Week 1",
      description:
        "Analyze a simulated system and detect the type of attack used.",
      completed: true,
    },
    {
      id: 2,
      week: "Week 2",
      description:
        "Write a short guide for creating strong passwords for a company.",
      completed: false,
    },
    {
      id: 3,
      week: "Week 3",
      description: "Find and fix SQL vulnerabilities in a sample website.",
      completed: false,
    },
  ],
  sessions: [
    {
      id: 1,
      title: "Introduction to Cyber Security.",
      description:
        "Get an overview of cyber security concepts, threats, and roles in the field.",
      instructor: "Eng. Ahmed El-Sayed",
      date: "Sep 10, 2025",
    },
    {
      id: 2,
      title: "Networking Basics for Security",
      description:
        "Learn how networks work, and how hackers exploit weak points.",
      instructor: "Eng. Sara Hassan",
      date: "Sep 17, 2025",
    },
    {
      id: 3,
      title: "Common Cyber Attacks",
      description:
        "Explore phishing, ransomware, and social engineering in real cases.",
      instructor: "Eng. Omar Fathy",
      date: "Sep 24, 2025",
    },
    {
      id: 4,
      title: "Ethical Hacking 101",
      description:
        "Understand penetration testing and how ethical hackers protect systems.",
      instructor: "Eng. Mahmoud Nabil",
      date: "Oct 1, 2025",
    },
    {
      id: 5,
      title: "Web Application Security",
      description: "Dive into OWASP Top 10 and how to fix web vulnerabilities.",
      instructor: "Eng. Ahmed El-Sharkawy",
      date: "Oct 8, 2025",
    },
    {
      id: 6,
      title: "Digital Forensics & Incident Response",
      description:
        "Learn how to track, analyze, and respond to security breaches.",
      instructor: "Eng. Mariam Farid",
      date: "Oct 15, 2025",
    },
  ],
  assignments: [
    {
      id: 1,
      title: "Identify the Attack",
      description:
        "Analyze a simulated system and detect the type of attack used.",
      deadline: "Sep 20, 2025",
      status: "completed",
    },
    {
      id: 2,
      title: "Create a Secure Password Policy",
      description:
        "Write a short guide for creating strong passwords for a company.",
      deadline: "Sep 27, 2025",
      status: "completed",
    },
    {
      id: 3,
      title: "SQL Injection Challenge",
      description: "Find and fix SQL vulnerabilities in a sample website.",
      deadline: "Oct 4, 2025",
      status: "in-progress",
    },
    {
      id: 4,
      title: "Network Scan Project",
      description: "Use Nmap to scan a virtual network and report findings.",
      deadline: "Oct 11, 2025",
      status: "not-started",
    },
    {
      id: 5,
      title: "Mini Capture the Flag (CTF)",
      description: "Solve small hacking challenges to test your skills.",
      deadline: "Oct 18, 2025",
      status: "not-started",
    },
  ],
  learningPath: [
    {
      level: "Foundation Level",
      title: "Basics of Cyber Security & Networking",
      description:
        "You'll learn about common threats, systems, and how the web works behind the scenes",
    },
    {
      level: "Attack & Defense Stage",
      title: "Exploring common attacks and building protection techniques.",
      description:
        "Identify phishing, malware, and ransomware — then learn how to stop them",
    },
    {
      level: "Ethical Hacking",
      title: "Hands-on practice using Kali Linux and penetration tools.",
      description: "Learn to test security like professionals (ethically)",
    },
    {
      level: "Web & Application Security",
      title: "Understand OWASP Top 10 vulnerabilities and fix them",
      description: "",
    },
    {
      level: "Digital Forensics & CTF Challenges",
      title:
        "Analyze, trace, and respond to real-world breaches through fun challenges.",
      description: "",
    },
  ],
  resources: {
    pdfs: [
      "Cyber Security Fundamentals Handbook — Short notes covering the basics.",
      "Network Security Essentials — Visual explanations of IPs and firewalls.",
      "OWASP Top 10 Explained — Web vulnerabilities & prevention",
    ],
    recordings: [
      "Wireshark for Beginners (38 mins)",
      "SQL Injection Walkthrough (45 mins)",
      "Kali Linux Setup Guide (50 mins)",
    ],
  },
  upcomingSessions: [
    {
      date: "Nov 4, 2025",
      event: "Session: Web Application Security",
      type: "Session",
    },
    {
      date: "Nov 11, 2025",
      event: "Deadline: Network Scan Project",
      type: "Task",
    },
    {
      date: "Nov 18, 2025",
      event: "Team Discussion: CTF Preparation",
      type: "Meeting",
    },
    {
      date: "Nov 20, 2025",
      event: "Session: Digital Forensics & Incident Response",
      type: "Session",
    },
    {
      date: "Nov 27, 2025",
      event: "Deadline: Mini CTF Challenge",
      type: "Task",
    },
  ],
  certificate: {
    includes: [
      "Your Name",
      "Completion Date",
      "Skill Level Achieved",
      "Instructor Signature",
    ],
  },
};
