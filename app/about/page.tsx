'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Users, Award, Menu, X } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { WalletButton } from "@/components/wallet/WalletButton"

export default function AboutPage() {
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-slate-900">About EduMarket</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Empowering learners worldwide with quality education and expert instruction.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              At EduMarket, our mission is to democratize education by providing accessible, high-quality online courses
              to anyone, anywhere. We believe that learning should be a lifelong journey, and we are committed to
              equipping individuals with the skills they need to thrive in a rapidly evolving world.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              We partner with industry experts and leading educators to create engaging and practical content that
              delivers real-world value. Our platform is designed to be intuitive and supportive, fostering a community
              where learners can connect, collaborate, and grow.
            </p>
          </div>
          <div className="relative">
            <Image
              src="/modern-online-learning.png"
              alt="Our Mission"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-slate-900">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8 pt-8">
            <Card className="p-6 space-y-4 shadow-md">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>
              <CardTitle className="text-xl font-semibold">Quality</CardTitle>
              <CardDescription className="text-slate-600">
                We are committed to delivering the highest quality educational content.
              </CardDescription>
            </Card>
            <Card className="p-6 space-y-4 shadow-md">
              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8" />
              </div>
              <CardTitle className="text-xl font-semibold">Community</CardTitle>
              <CardDescription className="text-slate-600">
                Fostering a supportive and collaborative learning environment.
              </CardDescription>
            </Card>
            <Card className="p-6 space-y-4 shadow-md">
              <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8" />
              </div>
              <CardTitle className="text-xl font-semibold">Accessibility</CardTitle>
              <CardDescription className="text-slate-600">
                Making education available to everyone, regardless of background.
              </CardDescription>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-4xl font-bold text-slate-900 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8 pt-8">
            <Card className="p-6 text-center space-y-4 shadow-md">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src="/professional-male-headshot.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl font-semibold">John Doe</CardTitle>
              <CardDescription className="text-slate-600">CEO & Co-founder</CardDescription>
              <p className="text-sm text-slate-700">
                John is a visionary leader with over 15 years of experience in online education.
              </p>
            </Card>
            <Card className="p-6 text-center space-y-4 shadow-md">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src="/professional-headshot-female.png" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl font-semibold">Jane Smith</CardTitle>
              <CardDescription className="text-slate-600">Chief Learning Officer</CardDescription>
              <p className="text-sm text-slate-700">
                Jane designs our curriculum, ensuring it meets the highest educational standards.
              </p>
            </Card>
            <Card className="p-6 text-center space-y-4 shadow-md">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src="/professional-asian-male-headshot.png" />
                <AvatarFallback>DK</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl font-semibold">David Kim</CardTitle>
              <CardDescription className="text-slate-600">Head of Technology</CardDescription>
              <p className="text-sm text-slate-700">
                David leads our tech team, building a robust and scalable learning platform.
              </p>
            </Card>
          </div>
        </section>
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
