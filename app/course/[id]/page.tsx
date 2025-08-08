'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Star, Users, Clock, PlayCircle, ChevronRight, Menu, X } from 'lucide-react'
import { WalletButton } from "@/components/wallet/WalletButton"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Dummy course data - replace with actual data fetching
  const course = {
    id: params.id,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    rating: 4.9,
    reviews: 2500,
    students: 12500,
    price: 89,
    originalPrice: 199,
    image: "/web-development-course.png",
    category: "Development",
    duration: "42 hours",
    level: "Beginner",
    description: "Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and launch your career as a web developer.",
    whatYouWillLearn: [
      "Build responsive websites with HTML5 and CSS3",
      "Develop interactive web applications with JavaScript and React",
      "Create backend APIs with Node.js and Express",
      "Manage databases with MongoDB",
      "Deploy web applications to the cloud",
    ],
    courseContent: [
      {
        title: "Introduction to Web Development",
        duration: "2 hours",
        lessons: [
          { title: "How the Web Works", duration: "15 min" },
          { title: "HTML Basics", duration: "30 min" },
          { title: "CSS Fundamentals", duration: "45 min" },
        ],
      },
      {
        title: "Advanced CSS & Responsive Design",
        duration: "5 hours",
        lessons: [
          { title: "Flexbox and Grid", duration: "1 hour" },
          { title: "Responsive Layouts", duration: "1.5 hours" },
          { title: "Animations and Transitions", duration: "1 hour" },
        ],
      },
      {
        title: "JavaScript Fundamentals",
        duration: "8 hours",
        lessons: [
          { title: "Variables and Data Types", duration: "1 hour" },
          { title: "Functions and Scope", duration: "1.5 hours" },
          { title: "DOM Manipulation", duration: "2 hours" },
        ],
      },
    ],
    requirements: [
      "No prior programming experience needed",
      "A computer with internet access",
    ],
    targetAudience: [
      "Beginners interested in web development",
      "Anyone looking to build a career in tech",
    ],
  }

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
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

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg font-semibold px-8 py-6 rounded-full">
                  <PlayCircle className="w-8 h-8 mr-3" />
                  Watch Preview
                </Button>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-slate-900">{course.title}</h1>
            <p className="text-xl text-slate-600">{course.description}</p>

            <div className="flex items-center space-x-6 text-slate-600">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span>{course.rating} ({course.reviews} ratings)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{course.duration}</span>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="content">Course Content</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="py-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What you'll learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                      {course.whatYouWillLearn.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2 text-slate-700">
                          <ChevronRight className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      {course.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Who is this course for?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      {course.targetAudience.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="content" className="py-6 space-y-6">
                {course.courseContent.map((section, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{section.title}</span>
                        <span className="text-sm font-normal text-slate-500">{section.duration}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="flex justify-between items-center text-slate-700">
                            <span>{lesson.title}</span>
                            <span className="text-sm text-slate-500">{lesson.duration}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="reviews" className="py-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Student Reviews</h3>
                <div className="space-y-6">
                  {/* Dummy Reviews */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                        </div>
                        <span className="ml-2 text-sm text-slate-600">5.0</span>
                      </div>
                      <p className="text-slate-700 mb-2">"This course is amazing! I learned so much and the instructor is fantastic."</p>
                      <p className="text-sm text-slate-500">- Jane Doe</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4" />
                        </div>
                        <span className="ml-2 text-sm text-slate-600">4.0</span>
                      </div>
                      <p className="text-slate-700 mb-2">"Good content, but some parts were a bit rushed. Overall, a solid course."</p>
                      <p className="text-sm text-slate-500">- John Smith</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Course Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-slate-900">${course.price}</span>
                      <span className="text-lg text-slate-500 line-through">${course.originalPrice}</span>
                    </div>
                    <p className="text-sm text-green-600 font-semibold">70% off</p>
                  </div>
                  <Badge className="bg-blue-600 text-white text-base px-3 py-1">
                    {course.category}
                  </Badge>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-lg py-3">
                  Enroll Now
                </Button>
                <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
                  Add to Cart
                </Button>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">This course includes:</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center space-x-2">
                      <PlayCircle className="w-5 h-5 text-blue-600" />
                      <span>42 hours on-demand video</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span>Downloadable resources</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span>Full lifetime access</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-700">
                        Certificate of completion
                      </Badge>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">Instructor</h3>
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/professional-female-headshot.png"
                      alt={course.instructor}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{course.instructor}</p>
                      <p className="text-sm text-slate-600">Lead Web Developer</p>
                    </div>
                  </div>
                </div>

                <Progress value={75} className="w-full" />
                <p className="text-sm text-slate-600">75% Course Completion</p>
              </div>
            </Card>
          </div>
        </div>
      </main>

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
