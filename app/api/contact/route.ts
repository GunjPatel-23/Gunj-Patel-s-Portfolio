import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, subject } = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    // For serverless environments, we'll use a simpler approach
    // Create the email content
    const emailSubject = `Portfolio Contact: ${subject || "New Message"} - ${name}`
    const emailBody = `
New Contact Form Submission

Contact Details:
- Name: ${name}
- Email: ${email}
- Subject: ${subject || "No subject provided"}
- Date: ${new Date().toLocaleString()}

Message:
${message}

Reply to: ${email}
    `

    // Since nodemailer doesn't work well in serverless, we'll use fetch to send via a service
    // For now, we'll create a mailto link and log the message
    console.log("Contact form submission:", {
      name,
      email,
      subject: subject || "No subject",
      message,
      timestamp: new Date().toISOString(),
    })

    // Create mailto link for fallback
    const mailtoLink = `mailto:gpatel04231@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

    // In a real deployment, you would use a service like:
    // - Resend (https://resend.com)
    // - SendGrid
    // - EmailJS
    // - Vercel's email service

    // For now, we'll simulate success and provide the mailto fallback
    return NextResponse.json({
      success: true,
      message: "Message received! I'll get back to you soon.",
      mailtoLink, // Frontend can use this as fallback
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please email me directly at gpatel04231@gmail.com",
      },
      { status: 500 },
    )
  }
}
