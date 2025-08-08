'use client'
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Menu, X } from 'lucide-react'
import { WalletButton } from "@/components/wallet/WalletButton"

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
        <h1 className="text-4xl font-bold text-slate-900 mb-8">About EduMarket</h1>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              At EduMarket, our mission is to democratize education by providing high-quality, accessible, and affordable learning experiences to everyone, everywhere. We believe that knowledge is the key to unlocking potential, and we are committed to empowering individuals to achieve their personal and professional goals through continuous learning.
            </p>
          </div>
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/modern-online-learning.png"
              alt="Modern Online Learning"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/diverse-user-avatars.png"
              alt="Diverse User Avatars"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">Our Values</h2>
            <ul className="space-y-4 text-lg text-slate-700 leading-relaxed list-disc pl-5">
              <li>
                <span className="font-semibold">Accessibility:</span> Education should be available to all, regardless of their background or location.
              </li>
              <li>
                <span className="font-semibold">Quality:</span> We partner with expert instructors to deliver engaging and effective content.
              </li>
              <li>
                <span className="font-semibold">Innovation:</span> We continuously explore new technologies and teaching methods to enhance the learning journey.
              </li>
              <li>
                <span className="font-semibold">Community:</span> We foster a supportive environment where learners can connect, collaborate, and grow together.
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Our diverse team of educators, technologists, and designers are passionate about creating the best possible learning platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardContent className="p-6 flex flex-col items-center">
              <Image
                src="/professional-male-headshot.png"
                alt="John Doe"
                width={120}
                height={120}
                className="rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-slate-900">John Doe</h3>
              <p className="text-blue-600 font-medium">CEO & Founder</p>
              <p className="text-slate-600 mt-2">
                Visionary leader passionate about transforming education through technology.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6 flex flex-col items-center">
              <Image
                src="/professional-female-headshot.png"
                alt="Jane Smith"
                width={120}
                height={120}
                className="rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-slate-900">Jane Smith</h3>
              <p className="text-blue-600 font-medium">Head of Curriculum</p>
              <p className="text-slate-600 mt-2">
                Experienced educator dedicated to crafting engaging and effective course content.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6 flex flex-col items-center">
              <Image
                src="/professional-asian-male-headshot.png"
                alt="David Lee"
                width={120}
                height={120}
                className="rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-slate-900">David Lee</h3>
              <p className="text-blue-600 font-medium">CTO</p>
              <p className="text-slate-600 mt-2">
                Innovator building scalable and robust platforms for seamless learning experiences.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">Join Our Community</h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto mb-6">
            Become a part of our growing community of learners and educators. Connect with peers, share insights, and get support.
          </p>
          <Link href="/auth/signup">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-lg px-8 py-3">
              Sign Up Today
            </Button>
          </Link>
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
