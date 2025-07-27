import { type NextRequest, NextResponse } from "next/server"
import { readMessages, writeMessages } from "@/lib/data-store"

export async function GET() {
  const messages = readMessages()
  return NextResponse.json({ messages })
}

export async function POST(request: NextRequest) {
  try {
    const messageData = await request.json()
    const messages = readMessages()
    const newMessage = {
      id: Math.max(...messages.map((m: any) => m.id), 0) + 1,
      ...messageData,
      date: new Date().toISOString().split("T")[0],
      status: "unread",
    }
    messages.push(newMessage)
    writeMessages(messages)
    return NextResponse.json({ success: true, message: newMessage })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to save message" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json()
    const messages = readMessages()
    const messageIndex = messages.findIndex((m: any) => m.id === id)
    if (messageIndex === -1) {
      return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 })
    }
    messages[messageIndex].status = status
    writeMessages(messages)
    return NextResponse.json({ success: true, message: messages[messageIndex] })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update message" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const messages = readMessages()
    const filteredMessages = messages.filter((m: any) => m.id !== id)
    writeMessages(filteredMessages)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete message" }, { status: 500 })
  }
}
