'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, LayoutDashboard, GraduationCap, Settings, Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { WalletButton } from '@/components/wallet/WalletButton'

export default function DashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "/professional-headshot-female.png",
    coursesEnrolled: 5,
    coursesCompleted: 2,
    progress: 40, // Overall progress
  }

  const enrolledCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      progress: 75,
      image: "/web-development-course.png",
    },
    {
      id: 2,
      title: "Data Science & Machine Learning",
      instructor: "Dr. Michael Chen",
      progress: 20,
      image: "/data-science-course.png",
    },
    {
      id: 4,
      title: "UI/UX Design Masterclass",
      instructor: "Emma Rodriguez",
      progress: 90,
      image: "/ui-ux-design-course.png",
    },
  ]

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
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Welcome, {user.name}!</h1>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 text-center shadow-md">
            <CardTitle className="text-2xl font-bold text-slate-900">{user.coursesEnrolled}</CardTitle>
            <CardDescription className="text-slate-600">Courses Enrolled</CardDescription>
          </Card>
          <Card className="p-6 text-center shadow-md">
            <CardTitle className="text-2xl font-bold text-slate-900">{user.coursesCompleted}</CardTitle>
            <CardDescription className="text-slate-600">Courses Completed</CardDescription>
          </Card>
          <Card className="p-6 text-center shadow-md">
            <CardTitle className="text-2xl font-bold text-slate-900">{user.progress}%</CardTitle>
            <CardDescription className="text-slate-600">Overall Progress</CardDescription>
            <Progress value={user.progress} className="mt-4 h-2" />
          </Card>
        </div>

        <Tabs defaultValue="my-courses" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-12">
            <TabsTrigger value="my-courses" className="text-base">My Courses</TabsTrigger>
            <TabsTrigger value="wishlist" className="text-base">Wishlist</TabsTrigger>
            <TabsTrigger value="certificates" className="text-base">Certificates</TabsTrigger>
            <TabsTrigger value="settings" className="text-base">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="my-courses" className="mt-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Currently Enrolled</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(course => (
                <Card key={course.id} className="shadow-md">
                  <div className="relative h-40 w-full rounded-t-lg overflow-hidden">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
                    <p className="text-sm text-slate-600">by {course.instructor}</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={course.progress} className="h-2 flex-1" />
                      <span className="text-sm text-slate-700">{course.progress}%</span>
                    </div>
                    <Link href={`/course/${course.id}`}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
                        Continue Learning
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            {enrolledCourses.length === 0 && (
              <div className="text-center py-12">
                <GraduationCap className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No courses enrolled yet!</h3>
                <p className="text-slate-600 mb-4">Start your learning journey by exploring our courses.</p>
                <Link href="/courses">
                  <Button variant="outline">Browse Courses</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          <TabsContent value="wishlist" className="mt-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">My Wishlist</h2>
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Your wishlist is empty</h3>
              <p className="text-slate-600 mb-4">Add courses you're interested in to your wishlist.</p>
              <Link href="/courses">
                <Button variant="outline">Browse Courses</Button>
              </Link>
            </div>
          </TabsContent>
          <TabsContent value="certificates" className="mt-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">My Certificates</h2>
            <div className="text-center py-12">
              <Award className="w-16 h-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No certificates earned yet!</h3>
              <p className="text-slate-600 mb-4">Complete courses to earn your certificates.</p>
              <Link href="/courses">
                <Button variant="outline">Explore Courses</Button>
              </Link>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="mt-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Account Settings</h2>
            <Card className="p-6 shadow-md">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl font-bold text-slate-900">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user.email} disabled />
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
