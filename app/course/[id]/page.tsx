'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Clock, Users, PlayCircle, CheckCircle, BookOpen, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { WalletButton } from '@/components/wallet/WalletButton'
import { useState } from 'react'

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Dummy course data - in a real app, you'd fetch this based on `id`
  const course = {
    id: parseInt(id),
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    rating: 4.9,
    students: 12500,
    price: 89,
    originalPrice: 199,
    image: "/web-development-course.png",
    category: "Development",
    duration: "42 hours",
    level: "Beginner",
    bestseller: true,
    description: "Master web development from scratch with HTML, CSS, JavaScript, React, Node.js, and more. This comprehensive bootcamp covers everything you need to become a full-stack web developer.",
    whatYouWillLearn: [
      "Build responsive websites with HTML5 and CSS3",
      "Develop interactive UIs with React and Redux",
      "Create robust backend APIs with Node.js and Express",
      "Manage databases with MongoDB and SQL",
      "Deploy web applications to the cloud",
      "Understand fundamental computer science concepts"
    ],
    modules: [
      { title: "Introduction to Web Development", duration: "2 hours" },
      { title: "HTML & CSS Fundamentals", duration: "6 hours" },
      { title: "JavaScript Basics", duration: "8 hours" },
      { title: "Advanced JavaScript & DOM Manipulation", duration: "7 hours" },
      { title: "React.js: The Basics", duration: "10 hours" },
      { title: "React.js: Advanced Concepts & Hooks", duration: "9 hours" },
      { title: "Node.js & Express.js", duration: "12 hours" },
      { title: "Databases: MongoDB & Mongoose", duration: "8 hours" },
      { title: "Authentication & Security", duration: "5 hours" },
      { title: "Deployment with Vercel & Netlify", duration: "3 hours" }
    ]
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-600">Course not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">EduMarket</span>
            </Link>

            {/* Centered Navigation Links */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex space-x-8">
                <Link href="/courses" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                  Courses
                </Link>
                <Link href="/courses?view=categories" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                  Categories
                </Link>
                <Link href="/about" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                  About
                </Link>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <WalletButton />
              <Link href="/auth/signin">
                <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
                  Get Started
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t bg-white/95 backdrop-blur-md">
              <div className="px-4 py-4 space-y-3">
                <Link href="/courses" className="block text-slate-600 hover:text-slate-900 font-medium">Courses</Link>
                <Link href="/courses?view=categories" className="block text-slate-600 hover:text-slate-900 font-medium">Categories</Link>
                <Link href="/about" className="block text-slate-600 hover:text-slate-900 font-medium">About</Link>
                <div className="pt-3 border-t">
                  <div className="mb-3">
                    <WalletButton />
                  </div>
                  <Link href="/auth/signin">
                    <Button variant="ghost" className="w-full justify-start mb-2">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Button size="icon" className="w-16 h-16 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm">
                  <PlayCircle className="w-8 h-8 text-white" />
                </Button>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-slate-900">{course.title}</h1>
            <p className="text-xl text-slate-600">{course.description}</p>

            <div className="flex items-center space-x-6 text-slate-600">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span>{course.rating} ({course.students.toLocaleString()} students)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-5 h-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-5 h-5" />
                <span>{course.level}</span>
              </div>
            </div>

            <Card className="p-6 shadow-md">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-2xl font-bold text-slate-900">What you'll learn</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700">
                  {course.whatYouWillLearn.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-md">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-2xl font-bold text-slate-900">Course Content</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3">
                  {course.modules.map((module, index) => (
                    <li key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0">
                      <span className="font-medium text-slate-800">{module.title}</span>
                      <span className="text-sm text-slate-500">{module.duration}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Course Sidebar / Purchase Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 shadow-lg">
              <div className="space-y-6">
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-4xl font-bold text-slate-900">${course.price}</span>
                      <span className="text-lg text-slate-500 line-through">${course.originalPrice}</span>
                    </div>
                    <Badge className="bg-green-500 text-white">
                      {((1 - course.price / course.originalPrice) * 100).toFixed(0)}% Off
                    </Badge>
                  </div>
                </div>
                <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-lg">
                  Enroll Now
                </Button>
                <Button size="lg" variant="outline" className="w-full text-lg">
                  Add to Cart
                </Button>
                <div className="text-center text-sm text-slate-500">
                  30-Day Money-Back Guarantee
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">EduMarket</span>
              </Link>
              <p className="text-slate-400">Empowering learners worldwide with quality education and expert instruction.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Platform</h3>
              <div className="space-y-2">
                <Link href="/courses" className="block hover:text-white transition-colors">Browse Courses</Link>
                <Link href="/courses?view=categories" className="block hover:text-white transition-colors">Categories</Link>
                <Link href="/about" className="block hover:text-white transition-colors">About</Link>
                <Link href="/pricing" className="block hover:text-white transition-colors">Pricing</Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Support</h3>
              <div className="space-y-2">
                <Link href="/help" className="block hover:text-white transition-colors">Help Center</Link>
                <Link href="/contact" className="block hover:text-white transition-colors">Contact Us</Link>
                <Link href="/community" className="block hover:text-white transition-colors">Community</Link>
                <Link href="/blog" className="block hover:text-white transition-colors">Blog</Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Company</h3>
              <div className="space-y-2">
                <Link href="/about" className="block hover:text-white transition-colors">About Us</Link>
                <Link href="/careers" className="block hover:text-white transition-colors">Careers</Link>
                <Link href="/privacy" className="block hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="block hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-400">© 2025 EduMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
