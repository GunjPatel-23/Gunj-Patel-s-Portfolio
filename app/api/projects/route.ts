import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (in production, use a database)
let projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and MongoDB",
    image: "/placeholder.svg?height=200&width=300&text=E-Commerce+Platform",
    tags: ["Web", "React", "Node.js", "MongoDB"],
    category: "Web",
    github: "https://github.com/GunjPatel-23/ecommerce-platform",
    demo: "https://ecommerce-demo.astrasoftinnovations.dev",
    status: "Published",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "AI Chatbot Assistant",
    description: "Intelligent chatbot using NLP and machine learning",
    image: "/placeholder.svg?height=200&width=300&text=AI+Chatbot",
    tags: ["AI", "Python", "TensorFlow", "NLP"],
    category: "AI",
    github: "https://github.com/GunjPatel-23/ai-chatbot",
    demo: "https://chatbot-demo.astrasoftinnovations.dev",
    status: "Published",
    date: "2024-01-10",
  },
  {
    id: 3,
    title: "IoT Smart Home System",
    description: "Connected home automation system with mobile app",
    image: "/placeholder.svg?height=200&width=300&text=Smart+Home+IoT",
    tags: ["IoT", "Arduino", "React Native", "Firebase"],
    category: "IoT",
    github: "https://github.com/GunjPatel-23/smart-home-iot",
    demo: "https://smarthome-demo.astrasoftinnovations.dev",
    status: "Published",
    date: "2024-01-05",
  },
]

export async function GET() {
  return NextResponse.json({ projects })
}

export async function POST(request: NextRequest) {
  try {
    const projectData = await request.json()
    const newProject = {
      id: Math.max(...projects.map((p) => p.id), 0) + 1,
      ...projectData,
      date: new Date().toISOString().split("T")[0],
    }
    projects.push(newProject)
    return NextResponse.json({ success: true, project: newProject })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create project" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()
    const projectIndex = projects.findIndex((p) => p.id === id)
    if (projectIndex === -1) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 })
    }
    projects[projectIndex] = { ...projects[projectIndex], ...updateData }
    return NextResponse.json({ success: true, project: projects[projectIndex] })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    projects = projects.filter((p) => p.id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete project" }, { status: 500 })
  }
}
