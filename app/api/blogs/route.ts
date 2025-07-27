import { type NextRequest, NextResponse } from "next/server"
import { readBlogs, writeBlogs } from "@/lib/data-store"

export async function GET() {
  const blogPosts = readBlogs()
  return NextResponse.json({ blogPosts })
}

export async function POST(request: NextRequest) {
  try {
    const blogData = await request.json()
    const blogPosts = readBlogs()

    // Convert content to simple HTML paragraphs
    const formattedContent = blogData.content
      .split("\n\n")
      .map((paragraph: string) => {
        if (paragraph.trim().startsWith("##")) {
          return `<h2>${paragraph.replace("##", "").trim()}</h2>`
        } else if (paragraph.trim().startsWith("#")) {
          return `<h1>${paragraph.replace("#", "").trim()}</h1>`
        } else if (paragraph.trim().startsWith("###")) {
          return `<h3>${paragraph.replace("###", "").trim()}</h3>`
        } else if (paragraph.trim().startsWith("-")) {
          const items = paragraph.split("\n").filter((line) => line.trim().startsWith("-"))
          const listItems = items.map((item) => `<li>${item.replace("-", "").trim()}</li>`).join("")
          return `<ul>${listItems}</ul>`
        } else if (paragraph.trim()) {
          return `<p>${paragraph.trim()}</p>`
        }
        return ""
      })
      .filter((p) => p)
      .join("\n")

    const newBlog = {
      id: Math.max(...blogPosts.map((b: any) => b.id), 0) + 1,
      ...blogData,
      content: formattedContent,
      date: new Date().toISOString().split("T")[0],
      author: "Gunj Patel",
      slug: blogData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    }
    blogPosts.push(newBlog)
    writeBlogs(blogPosts)
    return NextResponse.json({ success: true, blog: newBlog })
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ success: false, message: "Failed to create blog post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()
    const blogPosts = readBlogs()
    const blogIndex = blogPosts.findIndex((b: any) => b.id === id)
    if (blogIndex === -1) {
      return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 })
    }

    // Format content if it's being updated
    if (updateData.content) {
      updateData.content = updateData.content
        .split("\n\n")
        .map((paragraph: string) => {
          if (paragraph.trim().startsWith("##")) {
            return `<h2>${paragraph.replace("##", "").trim()}</h2>`
          } else if (paragraph.trim().startsWith("#")) {
            return `<h1>${paragraph.replace("#", "").trim()}</h1>`
          } else if (paragraph.trim().startsWith("###")) {
            return `<h3>${paragraph.replace("###", "").trim()}</h3>`
          } else if (paragraph.trim().startsWith("-")) {
            const items = paragraph.split("\n").filter((line) => line.trim().startsWith("-"))
            const listItems = items.map((item) => `<li>${item.replace("-", "").trim()}</li>`).join("")
            return `<ul>${listItems}</ul>`
          } else if (paragraph.trim()) {
            return `<p>${paragraph.trim()}</p>`
          }
          return ""
        })
        .filter((p) => p)
        .join("\n")
    }

    blogPosts[blogIndex] = { ...blogPosts[blogIndex], ...updateData }
    writeBlogs(blogPosts)
    return NextResponse.json({ success: true, blog: blogPosts[blogIndex] })
  } catch (error) {
    console.error("Error updating blog:", error)
    return NextResponse.json({ success: false, message: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const blogPosts = readBlogs()
    const filteredBlogs = blogPosts.filter((b: any) => b.id !== id)
    writeBlogs(filteredBlogs)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ success: false, message: "Failed to delete blog post" }, { status: 500 })
  }
}
