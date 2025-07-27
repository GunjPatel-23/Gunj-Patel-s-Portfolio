import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for contact messages
let messages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Project Inquiry",
    message: "Hi Gunj, I'm interested in discussing a web development project with you.",
    date: "2024-01-15",
    status: "unread",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Collaboration",
    message: "Would love to collaborate on an AI project. Let's connect!",
    date: "2024-01-14",
    status: "read",
  },
]

export async function GET() {
  return NextResponse.json({ messages })
}

export async function POST(request: NextRequest) {
  try {
    const messageData = await request.json()
    const newMessage = {
      id: Math.max(...messages.map((m) => m.id), 0) + 1,
      ...messageData,
      date: new Date().toISOString().split("T")[0],
      status: "unread",
    }
    messages.push(newMessage)
    return NextResponse.json({ success: true, message: newMessage })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to save message" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json()
    const messageIndex = messages.findIndex((m) => m.id === id)
    if (messageIndex === -1) {
      return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 })
    }
    messages[messageIndex].status = status
    return NextResponse.json({ success: true, message: messages[messageIndex] })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update message" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    messages = messages.filter((m) => m.id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete message" }, { status: 500 })
  }
}
