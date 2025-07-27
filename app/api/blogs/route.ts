import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (in production, use a database)
let blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with Next.js 14",
    excerpt:
      "Learn how to create performant and scalable React applications using the latest features in Next.js 14, including App Router and Server Components.",
    content: `Building scalable React applications is crucial for modern web development. With Next.js 14, we have powerful tools at our disposal to create performant and maintainable applications.

## Key Features of Next.js 14

Next.js 14 introduces several groundbreaking features that revolutionize how we build React applications:

### 1. App Router
The new App Router provides a more intuitive way to handle routing in Next.js applications. It supports:
- Nested layouts
- Server Components by default
- Streaming and Suspense
- Built-in SEO optimization

### 2. Server Components
Server Components allow us to render components on the server, reducing the JavaScript bundle size and improving performance.

## Best Practices for Scalability

When building scalable applications, consider these best practices:

### 1. Component Architecture
Organize your components in a logical hierarchy. Use composition over inheritance and keep components focused on a single responsibility.

### 2. State Management
Choose the right state management solution for your needs. For simple applications, React's built-in state might be sufficient.

### 3. Performance Optimization
Implement performance optimizations such as:
- Code splitting with dynamic imports
- Image optimization with Next.js Image component
- Caching strategies
- Bundle analysis and optimization

## Conclusion
Next.js 14 provides excellent tools for building scalable React applications. By following best practices and leveraging the framework's features, you can create applications that perform well and are easy to maintain.`,
    image: "/placeholder.svg?height=400&width=800&text=Next.js+14",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Web Development",
    tags: ["React", "Next.js", "JavaScript"],
    author: "Gunj Patel",
    status: "Published",
    slug: "building-scalable-react-applications",
  },
  {
    id: 2,
    title: "Getting Started with Machine Learning in Python",
    excerpt:
      "A comprehensive guide to machine learning fundamentals using Python and popular libraries like scikit-learn.",
    content: `Machine Learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every scenario.

## Setting Up Your Environment

Before diving into machine learning, let's set up our Python environment with the necessary libraries:

\`\`\`bash
pip install numpy pandas scikit-learn matplotlib seaborn jupyter
\`\`\`

## Essential Libraries

### 1. NumPy
NumPy provides support for large, multi-dimensional arrays and matrices, along with mathematical functions to operate on these arrays.

### 2. Pandas
Pandas is essential for data manipulation and analysis. It provides data structures like DataFrames that make working with structured data intuitive.

### 3. Scikit-learn
Scikit-learn is the go-to library for machine learning in Python. It provides simple and efficient tools for data mining and data analysis.

## Your First ML Model

Let's create a simple linear regression model:

\`\`\`python
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Generate sample data
X = np.random.randn(100, 1)
y = 2 * X.squeeze() + 1 + np.random.randn(100) * 0.1

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Create and train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)
\`\`\`

## Common ML Algorithms

### 1. Linear Regression
Used for predicting continuous values. Great for understanding relationships between variables.

### 2. Decision Trees
Easy to understand and interpret. Good for both classification and regression tasks.

### 3. Random Forest
An ensemble method that combines multiple decision trees for better performance.

## Next Steps

Continue your machine learning journey by exploring:
- Deep learning with TensorFlow or PyTorch
- Natural Language Processing
- Computer Vision
- Reinforcement Learning`,
    image: "/placeholder.svg?height=400&width=800&text=Machine+Learning",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "AI/ML",
    tags: ["Python", "Machine Learning", "AI"],
    author: "Gunj Patel",
    status: "Published",
    slug: "machine-learning-python",
  },
  {
    id: 3,
    title: "IoT Development with Arduino and ESP32",
    excerpt: "Building connected devices and smart home solutions using Arduino and ESP32 microcontrollers.",
    content: `The Internet of Things (IoT) connects everyday objects to the internet, enabling them to send and receive data. Arduino and ESP32 are popular platforms for IoT development.

## Getting Started with ESP32

The ESP32 is a powerful microcontroller with built-in Wi-Fi and Bluetooth capabilities, making it perfect for IoT projects.

### Setting Up the Development Environment
To get started with ESP32 development:
1. Install the Arduino IDE
2. Add ESP32 board support
3. Install necessary libraries

## Your First IoT Project: Temperature Monitor

Let's create a simple temperature monitoring system:

\`\`\`cpp
#include <WiFi.h>
#include <DHT.h>

#define DHT_PIN 2
#define DHT_TYPE DHT22

DHT dht(DHT_PIN, DHT_TYPE);

const char* ssid = "your_wifi_ssid";
const char* password = "your_wifi_password";

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  
  Serial.printf("Temperature: %.2f°C, Humidity: %.2f%%\\n", temperature, humidity);
  
  delay(5000);
}
\`\`\`

## Advanced IoT Concepts

### 1. MQTT Protocol
MQTT is a lightweight messaging protocol perfect for IoT applications. It enables efficient communication between devices.

### 2. Cloud Integration
Connect your IoT devices to cloud platforms like AWS IoT, Google Cloud IoT, or Azure IoT for data storage and analysis.

### 3. Security Considerations
IoT security is crucial. Always implement:
- Secure communication protocols
- Device authentication
- Regular firmware updates
- Data encryption

## Building a Smart Home System
Combine multiple sensors and actuators to create a comprehensive smart home system that can monitor and control various aspects of your home environment.

## Conclusion
IoT development with Arduino and ESP32 opens up endless possibilities for creating connected devices that can improve our daily lives.`,
    image: "/placeholder.svg?height=400&width=800&text=IoT+Arduino",
    date: "2024-01-05",
    readTime: "10 min read",
    category: "IoT",
    tags: ["Arduino", "ESP32", "IoT"],
    author: "Gunj Patel",
    status: "Published",
    slug: "iot-arduino-esp32",
  },
]

export async function GET() {
  return NextResponse.json({ blogPosts })
}

export async function POST(request: NextRequest) {
  try {
    const blogData = await request.json()

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
      id: Math.max(...blogPosts.map((b) => b.id), 0) + 1,
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
    return NextResponse.json({ success: true, blog: newBlog })
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ success: false, message: "Failed to create blog post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()
    const blogIndex = blogPosts.findIndex((b) => b.id === id)
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
    return NextResponse.json({ success: true, blog: blogPosts[blogIndex] })
  } catch (error) {
    console.error("Error updating blog:", error)
    return NextResponse.json({ success: false, message: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    blogPosts = blogPosts.filter((b) => b.id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ success: false, message: "Failed to delete blog post" }, { status: 500 })
  }
}
