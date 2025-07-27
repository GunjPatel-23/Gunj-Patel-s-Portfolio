import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Share2, Heart, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// This would normally come from a database or CMS
const getBlogPost = (slug: string) => {
  const posts = {
    "building-scalable-react-applications": {
      id: 1,
      title: "Building Scalable React Applications with Next.js 14",
      content: `
        <h2>Introduction</h2>
        <p>Building scalable React applications is crucial for modern web development. With Next.js 14, we have powerful tools at our disposal to create performant and maintainable applications.</p>
        
        <h2>Key Features of Next.js 14</h2>
        <p>Next.js 14 introduces several groundbreaking features that revolutionize how we build React applications:</p>
        
        <h3>1. App Router</h3>
        <p>The new App Router provides a more intuitive way to handle routing in Next.js applications. It supports:</p>
        <ul>
          <li>Nested layouts</li>
          <li>Server Components by default</li>
          <li>Streaming and Suspense</li>
          <li>Built-in SEO optimization</li>
        </ul>
        
        <h3>2. Server Components</h3>
        <p>Server Components allow us to render components on the server, reducing the JavaScript bundle size and improving performance. Here's a simple example:</p>
        
        <pre><code>// app/posts/page.tsx
async function PostsPage() {
  const posts = await fetchPosts() // This runs on the server
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}</code></pre>
        
        <h2>Best Practices for Scalability</h2>
        <p>When building scalable applications, consider these best practices:</p>
        
        <h3>1. Component Architecture</h3>
        <p>Organize your components in a logical hierarchy. Use composition over inheritance and keep components focused on a single responsibility.</p>
        
        <h3>2. State Management</h3>
        <p>Choose the right state management solution for your needs. For simple applications, React's built-in state might be sufficient. For complex applications, consider Redux Toolkit or Zustand.</p>
        
        <h3>3. Performance Optimization</h3>
        <p>Implement performance optimizations such as:</p>
        <ul>
          <li>Code splitting with dynamic imports</li>
          <li>Image optimization with Next.js Image component</li>
          <li>Caching strategies</li>
          <li>Bundle analysis and optimization</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Next.js 14 provides excellent tools for building scalable React applications. By following best practices and leveraging the framework's features, you can create applications that perform well and are easy to maintain.</p>
      `,
      excerpt:
        "Learn how to create performant and scalable React applications using the latest features in Next.js 14, including App Router and Server Components.",
      image: "/placeholder.svg?height=400&width=800",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Web Development",
      tags: ["React", "Next.js", "JavaScript"],
      author: "Gunj Patel",
    },
    "machine-learning-python": {
      id: 2,
      title: "Getting Started with Machine Learning in Python",
      content: `
        <h2>Introduction to Machine Learning</h2>
        <p>Machine Learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every scenario.</p>
        
        <h2>Setting Up Your Environment</h2>
        <p>Before diving into machine learning, let's set up our Python environment with the necessary libraries:</p>
        
        <pre><code>pip install numpy pandas scikit-learn matplotlib seaborn jupyter</code></pre>
        
        <h2>Essential Libraries</h2>
        <h3>1. NumPy</h3>
        <p>NumPy provides support for large, multi-dimensional arrays and matrices, along with mathematical functions to operate on these arrays.</p>
        
        <h3>2. Pandas</h3>
        <p>Pandas is essential for data manipulation and analysis. It provides data structures like DataFrames that make working with structured data intuitive.</p>
        
        <h3>3. Scikit-learn</h3>
        <p>Scikit-learn is the go-to library for machine learning in Python. It provides simple and efficient tools for data mining and data analysis.</p>
        
        <h2>Your First ML Model</h2>
        <p>Let's create a simple linear regression model:</p>
        
        <pre><code>import numpy as np
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
predictions = model.predict(X_test)</code></pre>
        
        <h2>Common ML Algorithms</h2>
        <h3>1. Linear Regression</h3>
        <p>Used for predicting continuous values. Great for understanding relationships between variables.</p>
        
        <h3>2. Decision Trees</h3>
        <p>Easy to understand and interpret. Good for both classification and regression tasks.</p>
        
        <h3>3. Random Forest</h3>
        <p>An ensemble method that combines multiple decision trees for better performance.</p>
        
        <h2>Next Steps</h2>
        <p>Continue your machine learning journey by exploring:</p>
        <ul>
          <li>Deep learning with TensorFlow or PyTorch</li>
          <li>Natural Language Processing</li>
          <li>Computer Vision</li>
          <li>Reinforcement Learning</li>
        </ul>
      `,
      excerpt:
        "A comprehensive guide to machine learning fundamentals using Python and popular libraries like scikit-learn.",
      image: "/placeholder.svg?height=400&width=800",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "AI/ML",
      tags: ["Python", "Machine Learning", "AI"],
      author: "Gunj Patel",
    },
    "iot-arduino-esp32": {
      id: 3,
      title: "IoT Development with Arduino and ESP32",
      content: `
        <h2>Introduction to IoT Development</h2>
        <p>The Internet of Things (IoT) connects everyday objects to the internet, enabling them to send and receive data. Arduino and ESP32 are popular platforms for IoT development.</p>
        
        <h2>Getting Started with ESP32</h2>
        <p>The ESP32 is a powerful microcontroller with built-in Wi-Fi and Bluetooth capabilities, making it perfect for IoT projects.</p>
        
        <h3>Setting Up the Development Environment</h3>
        <p>To get started with ESP32 development:</p>
        <ol>
          <li>Install the Arduino IDE</li>
          <li>Add ESP32 board support</li>
          <li>Install necessary libraries</li>
        </ol>
        
        <h2>Your First IoT Project: Temperature Monitor</h2>
        <p>Let's create a simple temperature monitoring system:</p>
        
        <pre><code>#include <WiFi.h>
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
  
  Serial.printf("Temperature: %.2f°C, Humidity: %.2f%%\n", temperature, humidity);
  
  delay(5000);
}</code></pre>
        
        <h2>Advanced IoT Concepts</h2>
        <h3>1. MQTT Protocol</h3>
        <p>MQTT is a lightweight messaging protocol perfect for IoT applications. It enables efficient communication between devices.</p>
        
        <h3>2. Cloud Integration</h3>
        <p>Connect your IoT devices to cloud platforms like AWS IoT, Google Cloud IoT, or Azure IoT for data storage and analysis.</p>
        
        <h3>3. Security Considerations</h3>
        <p>IoT security is crucial. Always implement:</p>
        <ul>
          <li>Secure communication protocols</li>
          <li>Device authentication</li>
          <li>Regular firmware updates</li>
          <li>Data encryption</li>
        </ul>
        
        <h2>Building a Smart Home System</h2>
        <p>Combine multiple sensors and actuators to create a comprehensive smart home system that can monitor and control various aspects of your home environment.</p>
        
        <h2>Conclusion</h2>
        <p>IoT development with Arduino and ESP32 opens up endless possibilities for creating connected devices that can improve our daily lives.</p>
      `,
      excerpt: "Building connected devices and smart home solutions using Arduino and ESP32 microcontrollers.",
      image: "/placeholder.svg?height=400&width=800",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "IoT",
      tags: ["Arduino", "ESP32", "IoT"],
      author: "Gunj Patel",
    },
  }

  return posts[slug as keyof typeof posts] || null
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="prose prose-lg max-w-none">
          <div className="mb-8">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>

            <div className="flex items-center text-muted-foreground mb-6">
              <span className="mr-4">By {post.author}</span>
              <Calendar className="h-4 w-4 mr-2" />
              <span className="mr-4">{post.date}</span>
              <Clock className="h-4 w-4 mr-2" />
              <span>{post.readTime}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Comment
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <Badge className="mb-2">Web Development</Badge>
                <h3 className="font-bold mb-2">Modern CSS Techniques for Better UX</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Exploring advanced CSS features and techniques to create better user experiences.
                </p>
                <Link href="/blog/modern-css-techniques">
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Badge className="mb-2">Backend</Badge>
                <h3 className="font-bold mb-2">Database Optimization Strategies</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Best practices for optimizing database performance in modern web applications.
                </p>
                <Link href="/blog/database-optimization">
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
