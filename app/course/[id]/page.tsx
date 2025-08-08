import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Star, Users, Clock, Globe, CheckCircle, Play, Download, Share2, Heart, Menu, X } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { WalletButton } from "@/components/wallet/WalletButton"
import { useState } from "react"

export default function CoursePage({ params }: { params: { id: string } }) {
  const course = {
    id: params.id,
    title: "Complete Web Development Bootcamp",
    subtitle: "Learn HTML, CSS, JavaScript, React, Node.js, and more",
    instructor: {
      name: "Sarah Johnson",
      title: "Senior Full Stack Developer",
      avatar: "/professional-headshot-female.png",
      rating: 4.9,
      students: 25000,
      courses: 12
    },
    rating: 4.9,
    students: 12500,
    price: 89,
    originalPrice: 199,
    image: "/web-development-course.png",
    category: "Development",
    duration: "42 hours",
    level: "Beginner",
    language: "English",
    lastUpdated: "December 2024",
    bestseller: true,
    description: "Master web development from scratch with this comprehensive bootcamp. Learn modern technologies and build real-world projects.",
    whatYouLearn: [
      "Build responsive websites with HTML5 and CSS3",
      "Master JavaScript ES6+ and modern programming concepts",
      "Create dynamic web applications with React",
      "Build backend APIs with Node.js and Express",
      "Work with databases using MongoDB",
      "Deploy applications to production",
      "Version control with Git and GitHub",
      "Modern development tools and workflows"
    ],
    curriculum: [
      {
        title: "Getting Started",
        lessons: 8,
        duration: "2h 30m",
        topics: ["Course Introduction", "Setting up Development Environment", "HTML Basics", "CSS Fundamentals"]
      },
      {
        title: "JavaScript Fundamentals",
        lessons: 12,
        duration: "4h 15m",
        topics: ["Variables and Data Types", "Functions", "Objects and Arrays", "DOM Manipulation"]
      },
      {
        title: "React Development",
        lessons: 15,
        duration: "6h 45m",
        topics: ["Components", "State Management", "Hooks", "Routing"]
      },
      {
        title: "Backend Development",
        lessons: 10,
        duration: "5h 30m",
        topics: ["Node.js Basics", "Express Framework", "Database Integration", "API Development"]
      }
    ],
    requirements: [
      "No prior programming experience required",
      "A computer with internet connection",
      "Willingness to learn and practice"
    ],
    reviews: [
      {
        name: "Alex Thompson",
        avatar: "/professional-male-headshot.png",
        rating: 5,
        date: "2 weeks ago",
        comment: "Excellent course! Sarah explains everything clearly and the projects are very practical."
      },
      {
        name: "Maria Garcia",
        avatar: "/professional-headshot-female.png",
        rating: 5,
        date: "1 month ago",
        comment: "This course changed my career. I'm now working as a web developer thanks to the skills I learned here."
      }
    ]
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-100 text-blue-700">{course.category}</Badge>
                {course.bestseller && (
                  <Badge className="bg-orange-500 text-white">Bestseller</Badge>
                )}
                <Badge variant="outline">{course.level}</Badge>
              </div>
              <h1 className="text-4xl font-bold text-slate-900">{course.title}</h1>
              <p className="text-xl text-slate-600">{course.subtitle}</p>
              <div className="flex items-center space-x-6 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span>({course.students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span>{course.language}</span>
                </div>
              </div>
            </div>

            {/* Course Video/Image */}
            <div className="relative">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                width={800}
                height={450}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                <Button size="lg" className="bg-white/90 text-slate-900 hover:bg-white">
                  <Play className="w-6 h-6 mr-2" />
                  Preview Course
                </Button>
              </div>
            </div>

            {/* Course Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What you'll learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.whatYouLearn.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 leading-relaxed">{course.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-slate-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                {course.curriculum.map((section, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <div className="text-sm text-slate-600">
                          {section.lessons} lessons • {section.duration}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {section.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center space-x-3 py-2">
                            <Play className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="instructor" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{course.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-slate-900">{course.instructor.name}</h3>
                        <p className="text-slate-600">{course.instructor.title}</p>
                        <div className="flex items-center space-x-6 text-sm text-slate-600">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{course.instructor.rating} rating</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{course.instructor.students.toLocaleString()} students</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{course.instructor.courses} courses</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl font-bold text-slate-900">{course.rating}</div>
                  <div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-slate-600">{course.students.toLocaleString()} reviews</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {course.reviews.map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={review.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-slate-900">{review.name}</h4>
                              <span className="text-sm text-slate-500">{review.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <p className="text-slate-700">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-slate-900">${course.price}</span>
                    <span className="text-lg text-slate-500 line-through">${course.originalPrice}</span>
                    <Badge className="bg-green-100 text-green-700">
                      {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                    </Badge>
                  </div>
                  <p className="text-sm text-red-600 font-medium">🔥 Limited time offer!</p>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout">
                    <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-lg">
                      Enroll Now
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full h-12">
                    Add to Cart
                  </Button>
                </div>

                <div className="text-center text-sm text-slate-600">
                  30-Day Money-Back Guarantee
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900">This course includes:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span>{course.duration} on-demand video</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Download className="w-4 h-4 text-slate-500" />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-slate-500" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-slate-500" />
                      <span>Lifetime access</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
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
