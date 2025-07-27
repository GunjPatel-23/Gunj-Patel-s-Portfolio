"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { FileText, MessageSquare, TrendingUp, Plus, Edit, Trash2, Eye, Lock, CheckCircle } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  category: string
  github: string
  demo: string
  status: string
  date: string
}

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  readTime: string
  category: string
  tags: string[]
  author: string
  status: string
  slug: string
}

interface Message {
  id: number
  name: string
  email: string
  subject: string
  message: string
  date: string
  status: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [projects, setProjects] = useState<Project[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingBlog, setBlogEditingBlog] = useState<BlogPost | null>(null)

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    image: "",
    tags: "",
    category: "",
    github: "",
    demo: "",
    status: "Draft",
  })

  const [blogForm, setBlogForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    category: "",
    tags: "",
    readTime: "",
    status: "Draft",
  })

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects()
      fetchBlogs()
      fetchMessages()
    }
  }, [isAuthenticated])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      const data = await response.json()
      setProjects(data.projects)
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs")
      const data = await response.json()
      setBlogPosts(data.blogPosts)
    } catch (error) {
      console.error("Error fetching blogs:", error)
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages")
      const data = await response.json()
      setMessages(data.messages)
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (credentials.username === "gunjpatel.23" && credentials.password === "GDPatel$2310") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials. Please try again.")
    }
  }

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const projectData = {
        ...projectForm,
        tags: projectForm.tags.split(",").map((tag) => tag.trim()),
      }

      const url = editingProject ? "/api/projects" : "/api/projects"
      const method = editingProject ? "PUT" : "POST"
      const body = editingProject ? { id: editingProject.id, ...projectData } : projectData

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        fetchProjects()
        setIsProjectDialogOpen(false)
        setEditingProject(null)
        setProjectForm({
          title: "",
          description: "",
          image: "",
          tags: "",
          category: "",
          github: "",
          demo: "",
          status: "Draft",
        })
      }
    } catch (error) {
      console.error("Error saving project:", error)
    }
  }

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const blogData = {
        ...blogForm,
        tags: blogForm.tags.split(",").map((tag) => tag.trim()),
      }

      const url = "/api/blogs"
      const method = editingBlog ? "PUT" : "POST"
      const body = editingBlog ? { id: editingBlog.id, ...blogData } : blogData

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        fetchBlogs()
        setIsBlogDialogOpen(false)
        setBlogEditingBlog(null)
        setBlogForm({
          title: "",
          excerpt: "",
          content: "",
          image: "",
          category: "",
          tags: "",
          readTime: "",
          status: "Draft",
        })
      }
    } catch (error) {
      console.error("Error saving blog:", error)
    }
  }

  const deleteProject = async (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch("/api/projects", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        })
        if (response.ok) {
          fetchProjects()
        }
      } catch (error) {
        console.error("Error deleting project:", error)
      }
    }
  }

  const deleteBlog = async (id: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch("/api/blogs", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        })
        if (response.ok) {
          fetchBlogs()
        }
      } catch (error) {
        console.error("Error deleting blog:", error)
      }
    }
  }

  const markMessageAsRead = async (id: number) => {
    try {
      const response = await fetch("/api/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "read" }),
      })
      if (response.ok) {
        fetchMessages()
      }
    } catch (error) {
      console.error("Error updating message:", error)
    }
  }

  const deleteMessage = async (id: number) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        const response = await fetch("/api/messages", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        })
        if (response.ok) {
          fetchMessages()
        }
      } catch (error) {
        console.error("Error deleting message:", error)
      }
    }
  }

  const editProject = (project: Project) => {
    setEditingProject(project)
    setProjectForm({
      title: project.title,
      description: project.description,
      image: project.image,
      tags: project.tags.join(", "),
      category: project.category,
      github: project.github,
      demo: project.demo,
      status: project.status,
    })
    setIsProjectDialogOpen(true)
  }

  const editBlog = (blog: BlogPost) => {
    setBlogEditingBlog(blog)
    setBlogForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      category: blog.category,
      tags: blog.tags.join(", "),
      readTime: blog.readTime,
      status: blog.status,
    })
    setIsBlogDialogOpen(true)
  }

  const stats = [
    { title: "Total Projects", value: projects.length, icon: FileText, change: "+2 this month" },
    { title: "Blog Posts", value: blogPosts.length, icon: FileText, change: "+3 this week" },
    { title: "Messages", value: messages.length, icon: MessageSquare, change: "+12 today" },
    { title: "Page Views", value: 1234, icon: TrendingUp, change: "+15% this month" },
  ]

  const chartData = [
    { name: "Jan", projects: 2, blogs: 4 },
    { name: "Feb", projects: 3, blogs: 3 },
    { name: "Mar", projects: 1, blogs: 5 },
    { name: "Apr", projects: 4, blogs: 2 },
    { name: "May", projects: 2, blogs: 6 },
    { name: "Jun", projects: 3, blogs: 4 },
  ]

  const pieData = [
    { name: "Web", value: 40, color: "#8884d8" },
    { name: "AI/ML", value: 30, color: "#82ca9d" },
    { name: "IoT", value: 20, color: "#ffc658" },
    { name: "Mobile", value: 10, color: "#ff7300" },
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Lock className="h-12 w-12 mx-auto mb-4 text-primary" />
            <CardTitle className="text-xl sm:text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
                className="text-base"
              />
              <Input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="text-base"
              />
              <Button type="submit" className="w-full min-h-12">
                Login
              </Button>
            </form>
            <p className="text-sm text-muted-foreground mt-4 text-center">Demo: gunjpatel.23 / GDPatel$2310</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={() => setIsAuthenticated(false)} variant="outline" className="min-h-10">
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.change}</p>
                  </div>
                  <stat.icon className="h-6 sm:h-8 w-6 sm:w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Content Creation Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="projects" fill="#8884d8" name="Projects" />
                  <Bar dataKey="blogs" fill="#82ca9d" name="Blog Posts" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Project Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="projects" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="projects" className="text-xs sm:text-sm py-2">
              Projects
            </TabsTrigger>
            <TabsTrigger value="blogs" className="text-xs sm:text-sm py-2">
              Blog Posts
            </TabsTrigger>
            <TabsTrigger value="messages" className="text-xs sm:text-sm py-2">
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="text-lg sm:text-xl">Manage Projects</CardTitle>
                <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto min-h-10">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleProjectSubmit} className="space-y-4">
                      <Input
                        placeholder="Project Title"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        required
                      />
                      <Textarea
                        placeholder="Project Description"
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="Image URL"
                        value={projectForm.image}
                        onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      />
                      <Input
                        placeholder="Tags (comma separated)"
                        value={projectForm.tags}
                        onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                      />
                      <Select
                        value={projectForm.category}
                        onValueChange={(value) => setProjectForm({ ...projectForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Web">Web</SelectItem>
                          <SelectItem value="AI">AI</SelectItem>
                          <SelectItem value="IoT">IoT</SelectItem>
                          <SelectItem value="Mobile">Mobile</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="GitHub URL"
                        value={projectForm.github}
                        onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                      />
                      <Input
                        placeholder="Demo URL"
                        value={projectForm.demo}
                        onChange={(e) => setProjectForm({ ...projectForm, demo: e.target.value })}
                      />
                      <Select
                        value={projectForm.status}
                        onValueChange={(value) => setProjectForm({ ...projectForm, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1">
                          {editingProject ? "Update Project" : "Add Project"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsProjectDialogOpen(false)
                            setEditingProject(null)
                            setProjectForm({
                              title: "",
                              description: "",
                              image: "",
                              tags: "",
                              category: "",
                              github: "",
                              demo: "",
                              status: "Draft",
                            })
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm sm:text-base">{project.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">{project.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant={project.status === "Published" ? "default" : "secondary"} className="text-xs">
                            {project.status}
                          </Badge>
                          <span className="text-xs sm:text-sm text-muted-foreground">{project.date}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 w-full sm:w-auto">
                        <Button size="sm" variant="outline" className="flex-1 sm:flex-none bg-transparent">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 sm:flex-none bg-transparent"
                          onClick={() => editProject(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 sm:flex-none bg-transparent"
                          onClick={() => deleteProject(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blogs">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="text-lg sm:text-xl">Manage Blog Posts</CardTitle>
                <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto min-h-10">
                      <Plus className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleBlogSubmit} className="space-y-4">
                      <Input
                        placeholder="Blog Title"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        required
                      />
                      <Textarea
                        placeholder="Blog Excerpt"
                        value={blogForm.excerpt}
                        onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                        required
                      />
                      <Textarea
                        placeholder="Blog Content (Use ## for headings, - for bullet points)"
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        rows={15}
                        required
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Formatting tips: Use ## for headings, ### for subheadings, - for bullet points, leave blank
                        lines between paragraphs
                      </p>
                      <Input
                        placeholder="Featured Image URL"
                        value={blogForm.image}
                        onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Select
                          value={blogForm.category}
                          onValueChange={(value) => setBlogForm({ ...blogForm, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Web Development">Web Development</SelectItem>
                            <SelectItem value="AI/ML">AI/ML</SelectItem>
                            <SelectItem value="IoT">IoT</SelectItem>
                            <SelectItem value="Leadership">Leadership</SelectItem>
                            <SelectItem value="Backend">Backend</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Read Time (e.g., 5 min read)"
                          value={blogForm.readTime}
                          onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                        />
                      </div>
                      <Input
                        placeholder="Tags (comma separated)"
                        value={blogForm.tags}
                        onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                      />
                      <Select
                        value={blogForm.status}
                        onValueChange={(value) => setBlogForm({ ...blogForm, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1">
                          {editingBlog ? "Update Post" : "Create Post"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsBlogDialogOpen(false)
                            setBlogEditingBlog(null)
                            setBlogForm({
                              title: "",
                              excerpt: "",
                              content: "",
                              image: "",
                              category: "",
                              tags: "",
                              readTime: "",
                              status: "Draft",
                            })
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogPosts.map((blog) => (
                    <div
                      key={blog.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm sm:text-base">{blog.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">{blog.excerpt}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant={blog.status === "Published" ? "default" : "secondary"} className="text-xs">
                            {blog.status}
                          </Badge>
                          <span className="text-xs sm:text-sm text-muted-foreground">{blog.date}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 w-full sm:w-auto">
                        <Button size="sm" variant="outline" className="flex-1 sm:flex-none bg-transparent">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 sm:flex-none bg-transparent"
                          onClick={() => editBlog(blog)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 sm:flex-none bg-transparent"
                          onClick={() => deleteBlog(blog.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="p-4 border rounded-lg">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm sm:text-base">{message.name}</h3>
                            {message.status === "unread" && (
                              <Badge variant="destructive" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground break-all">{message.email}</p>
                          <p className="text-sm font-medium mt-1">{message.subject}</p>
                        </div>
                        <span className="text-xs sm:text-sm text-muted-foreground">{message.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 bg-muted/50 p-3 rounded">{message.message}</p>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full sm:w-auto bg-transparent"
                          onClick={() => {
                            const mailtoLink = `mailto:${message.email}?subject=Re: ${message.subject}&body=Hi ${message.name},%0A%0AThank you for your message. `
                            window.open(mailtoLink, "_blank")
                          }}
                        >
                          Reply
                        </Button>
                        {message.status === "unread" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full sm:w-auto bg-transparent"
                            onClick={() => markMessageAsRead(message.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mark Read
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full sm:w-auto bg-transparent"
                          onClick={() => deleteMessage(message.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
