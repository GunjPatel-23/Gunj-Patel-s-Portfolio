// Simple file-based data storage for persistence
import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json")
const BLOGS_FILE = path.join(DATA_DIR, "blogs.json")
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json")

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Default data
const defaultProjects = [
  {
    id: 1,
    title: "Gunshot Detection System",
    description:
      "A real-time system using microphone arrays and TDoA algorithms to detect and visualize the direction of gunshots. GUI displays the average DOA on a radar interface.",
    image: "https://tricorps.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-24-at-2.15.41-PM-1.png",
    tags: ["Python", "NumPy", "Matplotlib", "Tkinter", "Audio Signal Processing"],
    category: "AI",
    demo: "Desktop-based application",
    status: "Published",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "SurveilEye – RFID-Based Vehicle Security & Gate Pass System",
    description:
      "IoT-based system for college gates using RFID, auto gate control, gate pass approval, and visitor QR code verification.",
    image: "https://i.postimg.cc/SRgtPfGR/IMG-20250216-WA0002.jpg",
    tags: ["Python", "Raspberry Pi", "MongoDB", "Flask", "QR & RFID modules"],
    category: "IoT",
    demo: "https://surveil-eye-demo.astrasoftinnovations.dev",
    status: "Published",
    date: "2024-01-10",
  },
  {
    id: 3,
    title: "Barcode-Based Mall Billing System",
    description:
      "Offline desktop billing system with QR/barcode scanning, split payment (cash + online), and premium features.",
    image: "https://i.postimg.cc/wBz3WX4D/Screenshot-2025-06-17-213528.png",
    tags: ["Python", "Tkinter", "SQLite", "Barcode Scanner Hardware"],
    category: "Web",
    demo: "Desktop application",
    status: "Published",
    date: "2024-01-05",
  },
  {
    id: 4,
    title: "Personal Portfolio Website",
    description:
      "A modern, responsive portfolio to showcase my projects, skills, blogs, and leadership roles. Features dark/light mode, project filtering, and an admin panel for content management.",
    image: "https://i.postimg.cc/q7GqWNWS/Screenshot-2025-07-27-203742.png",
    tags: ["React.js", "Tailwind CSS", "JavaScript", "v0.dev"],
    category: "Web",
    demo: "https://gunjpatel.dev",
    status: "Published",
    date: "2023-12-28",
  },
  {
    id: 5,
    title: "Event & Attendance Manager",
    description:
      "A web app to manage events with online registration, QR-based attendance, and auto certificate generation.",
    image: "https://ubsapp.com/wp-content/uploads/2022/03/attendance_management-copy.png",
    tags: ["HTML", "PHP/Flask", "MySQL", "QR API"],
    category: "Web",
    demo: "https://event-manager-demo.astrasoftinnovations.dev",
    status: "Published",
    date: "2023-12-20",
  },
  {
    id: 6,
    title: "Eternal Moments – Wedding Event Management System",
    description:
      "A comprehensive platform to manage wedding events, guest lists, vendor coordination, schedules, and digital invitations — all in one place.",
    image: "https://i.postimg.cc/vBHTyQsB/Screenshot-2025-07-25-144219.png",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    category: "Web",
    demo: "https://eternal-moments-demo.astrasoftinnovations.dev",
    status: "Published",
    date: "2023-12-15",
  },
]

const defaultBlogs = [
  {
    id: 1,
    title: "Revolutionizing Hiring with AI-Based Interview Evaluators",
    excerpt:
      "Helping Global Startups Build MVPs, SaaS Platforms & UI/UX at Lightning Speed. Exploring how AI is transforming the recruitment process with advanced interview evaluation systems.",
    content: `In today's fast-paced, digital-first world, recruitment has become a challenging but critical process for organizations. Traditional hiring methods, while effective, often come with inefficiencies such as human bias, time-consuming evaluations, and a lack of actionable insights. Enter AI-based interview evaluators, a revolutionary approach to improving hiring accuracy, speed, and fairness.

## The Need for AI in Recruitment

Recruiters face numerous challenges in assessing candidates, especially when dealing with large volumes of applications. The traditional interview process is often subjective, prone to human bias, and time-consuming. At the same time, organizations are striving for a more streamlined, efficient, and consistent evaluation system that eliminates human errors and accelerates the hiring process. AI-based interview evaluators offer the perfect solution.

## How Does It Work?

AI-based interview evaluators use advanced technologies such as emotion detection, natural language processing (NLP), and speech analysis to provide in-depth insights into a candidate's performance during an interview. By analyzing both verbal and non-verbal communication cues, the system can evaluate:

- Communication clarity and confidence
- Emotional intelligence
- Tone and sentiment analysis
- Knowledge and relevance of answers

This system provides real-time feedback, allowing HR teams to make data-driven decisions that are both fair and objective.

## Key Benefits of AI-Based Interview Evaluators

### Enhanced Objectivity
By removing human bias, the AI system ensures a level playing field for every candidate.

### Efficiency
Automates the assessment process, cutting down on time spent reviewing interviews and allowing recruiters to focus on high-priority tasks.

### Data-Driven Insights
The system provides actionable insights into communication patterns, confidence levels, and other key metrics, which help shape better hiring decisions.

### Cost Reduction
AI helps save significant costs associated with manual screening, reducing hiring time and resources needed for initial candidate vetting.

### Improved Candidate Experience
By providing real-time feedback and reducing wait times, candidates can feel more engaged and informed throughout the hiring process.

## Real-World Applications

From large enterprises to small startups, the potential for AI in recruitment is immense. HR departments can use AI to automate screening, track candidate performance, and conduct unbiased assessments. Educational institutions can also leverage this technology for career services, allowing students to prepare for interviews with real-time feedback.

## A Glimpse into the Future of Hiring

As AI continues to evolve, we can expect even more sophisticated interview evaluators that can offer:

- Multilingual capabilities to conduct interviews in multiple languages
- Predictive analytics to gauge a candidate's potential for success within specific roles
- Mobile integration to facilitate seamless interactions between recruiters and candidates on-the-go

## Conclusion: The Future of Recruitment is AI-Driven

AI-based interview evaluators represent the future of recruitment, offering a faster, fairer, and more efficient way to evaluate candidates. With the power of artificial intelligence, we can eliminate bias, streamline the hiring process, and make smarter, data-driven decisions that benefit both recruiters and candidates alike.

As we move towards a more data-driven hiring landscape, it's crucial for organizations to adapt to these innovations and leverage them to create a more effective and equitable recruitment process.`,
    image:
      "https://media.licdn.com/dms/image/v2/D4D12AQFON-egkYw9wA/article-cover_image-shrink_720_1280/B4DZacJdANH0AM-/0/1746376451611?e=1759363200&v=beta&t=AD08j7FcOXiI2yLtmUhkLKvWk1R4uJAzbsDDGzuuQz4",
    date: "2025-05-04",
    readTime: "8 min read",
    category: "AI/ML",
    tags: ["AI", "Recruitment", "Machine Learning", "Innovation"],
    author: "Gunj Patel",
    status: "Published",
    slug: "revolutionizing-hiring-with-ai-based-interview-evaluators",
  },
  {
    id: 2,
    title: "SurveilEye: Revolutionizing RFID-Based Gate Pass Systems for Smart Security",
    excerpt:
      "SurveilEye is a next-generation RFID-based Gate Pass System that automates vehicle entry and exit with instant authentication, automated barrier control, and digital pass issuance.",
    content: `SurveilEye is a next-generation RFID-based Gate Pass System that automates vehicle entry and exit with instant authentication, automated barrier control, digital pass issuance, and flexible QR-code verification—delivering enhanced security, reduced wait times, and data-driven insights across campuses, industries, and gated communities.

## Introduction

As institutions and communities strive for smarter security, traditional gate management—relying on manual logs, ID card swipes, or CCTV monitoring—has become a bottleneck for both safety and efficiency. Manual checks are prone to human error and delays, especially during peak traffic hours, while CCTV systems demand constant oversight and significant investment in infrastructure and personnel.

## The Challenge: Outdated Gate Management

### Inefficiency
Manual verification and paper-based logs create congestion and frustration for drivers, staff, and visitors alike.

### Security Risks
ID cards can be cloned or shared, and verbal permissions can be abused, leading to unauthorized access.

### Lack of Visibility
Without real-time data, administrators cannot proactively monitor traffic patterns or audit access events.

## Our Solution: SurveilEye RFID-Based Gate Pass System

SurveilEye leverages RFID technology to deliver a fully automated, contactless access control solution:

- **RFID Authentication**: Each registered vehicle carries a unique RFID tag that is read instantly by the gate scanner upon approach
- **Automated Barrier Control**: Upon successful authentication, the barricade opens to a calibrated 45°, then closes securely—without human intervention
- **Digital Gate Pass for Exit**: During restricted hours, students and staff apply for a digital pass via a web portal
- **QR-Code Verification for Visitors**: Temporary users receive QR codes that are scanned at the gate
- **Real-Time Data Logging**: Every entry and exit event is recorded in a secure database

## System Architecture & Technology Stack

### Hardware
- RFID Reader and Tags
- QR Code Scanner
- Raspberry Pi 4
- CCTV Camera
- Servo Motor/Barrier Gate System
- Power Supply Unit

### Software
- Python
- MongoDB
- React
- React Native
- Raspbian OS
- OpenCV

## Key Benefits & Impact

### 1. Enhanced Security & Compliance
SurveilEye ensures only authorized vehicles enter or exit, mitigating risks of tailgating and unauthorized movement. Real-time logging fosters accountability and simplifies incident investigations.

### 2. Operational Efficiency
Contactless RFID reduces gate-congestion by 80%, slashing average wait times from minutes to seconds. Automated barrier control eliminates the need for manual gatekeepers, lowering labor costs by up to 50% in similar deployments.

### 3. Cost-Effectiveness & Scalability
Compared to CCTV and manual systems, RFID infrastructure has a lower total cost of ownership—passive tags start under INR 25 each and readers amortize quickly over high-throughput environments.

### 4. Data-Driven Insights
Administrators gain visibility into traffic peaks, pass utilization, and anomalous access attempts. These analytics inform security policies, resource allocation, and infrastructure planning.

## Meet the Team Behind SurveilEye

At the heart of SurveilEye is a dynamic team of innovators:

- **Gunj Patel** – Team Leader & Hardware Expert
- **Kavan Patel** – Software Lead
- **Ansh Patel** – Software Developer
- **Darshni Mistry** – Image Processing Expert
- **Dhara Patel** – Image Processing Expert
- **Sunit Parmar** – Project Mentor

## Future Roadmap

- Mobile App Integration: Approve gate passes from anywhere via a secure mobile interface
- Advanced Analytics Dashboard: Predictive insights and anomaly detection powered by machine learning
- Emergency Override Mode: Secure rapid exit protocols for first responders and staff in crisis scenarios

## Conclusion

SurveilEye sets a new standard for smart, secure, and efficient access control. By harnessing RFID technology and digital gate passes, institutions can modernize their security infrastructure, enhance user experience, and unlock valuable operational insights.`,
    image:
      "https://media.licdn.com/dms/image/v2/D4D12AQEGxbu0QVBC8A/article-cover_image-shrink_720_1280/B4DZaCeaxgGsAI-/0/1745945739958?e=1759363200&v=beta&t=r-PuVkWLqKRqW34sJWUKI4eESgR8VW5E1bcHt-y2KvQ",
    date: "2025-04-29",
    readTime: "12 min read",
    category: "IoT",
    tags: ["RFID", "IoT", "Security", "Automation"],
    author: "Gunj Patel",
    status: "Published",
    slug: "surveil-eye-revolutionizing-rfid-based-gate-pass-systems",
  },
]

const defaultMessages: any[] = []

// Helper functions
export function readProjects() {
  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      const data = fs.readFileSync(PROJECTS_FILE, "utf8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Error reading projects:", error)
  }
  return defaultProjects
}

export function writeProjects(projects: any[]) {
  try {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2))
  } catch (error) {
    console.error("Error writing projects:", error)
  }
}

export function readBlogs() {
  try {
    if (fs.existsSync(BLOGS_FILE)) {
      const data = fs.readFileSync(BLOGS_FILE, "utf8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Error reading blogs:", error)
  }
  return defaultBlogs
}

export function writeBlogs(blogs: any[]) {
  try {
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2))
  } catch (error) {
    console.error("Error writing blogs:", error)
  }
}

export function readMessages() {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, "utf8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Error reading messages:", error)
  }
  return defaultMessages
}

export function writeMessages(messages: any[]) {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2))
  } catch (error) {
    console.error("Error writing messages:", error)
  }
}
