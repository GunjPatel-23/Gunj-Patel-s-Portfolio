import { type NextRequest, NextResponse } from "next/server"
import { readProjects, writeProjects } from "@/lib/data-store"

export async function GET() {
  const projects = readProjects()
  return NextResponse.json({ projects })
}

export async function POST(request: NextRequest) {
  try {
    const projectData = await request.json()
    const projects = readProjects()
    const newProject = {
      id: Math.max(...projects.map((p: any) => p.id), 0) + 1,
      ...projectData,
      date: new Date().toISOString().split("T")[0],
    }
    projects.push(newProject)
    writeProjects(projects)
    return NextResponse.json({ success: true, project: newProject })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create project" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()
    const projects = readProjects()
    const projectIndex = projects.findIndex((p: any) => p.id === id)
    if (projectIndex === -1) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 })
    }
    projects[projectIndex] = { ...projects[projectIndex], ...updateData }
    writeProjects(projects)
    return NextResponse.json({ success: true, project: projects[projectIndex] })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const projects = readProjects()
    const filteredProjects = projects.filter((p: any) => p.id !== id)
    writeProjects(filteredProjects)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete project" }, { status: 500 })
  }
}
