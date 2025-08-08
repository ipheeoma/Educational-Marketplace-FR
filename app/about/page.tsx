'use client'

import { BookOpen, Users, Award, Lightbulb, Target, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { WalletButton } from '@/components/wallet/WalletButton'
import { useState } from 'react'

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">About EduMarket</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            At EduMarket, we believe that quality education should be accessible to everyone, everywhere. We are dedicated to empowering individuals to achieve their full potential through flexible, affordable, and high-quality online learning experiences.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
              <Target className="w-8 h-8 text-blue-600" />
              <span>Our Mission</span>
            </h2>
            <p className="text-lg text-slate-700">
              Our mission is to bridge the gap between aspiring learners and world-class knowledge. We strive to create a dynamic and supportive learning environment where curiosity is celebrated, skills are honed, and careers are transformed. We are committed to offering a diverse range of courses taught by industry experts, ensuring that our students gain practical, relevant, and in-demand skills.
            </p>
            <p className="text-lg text-slate-700">
              We envision a future where continuous learning is a cornerstone of personal and professional growth, and EduMarket is the go-to platform for anyone seeking to expand their horizons.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
              <Lightbulb className="w-8 h-8 text-indigo-600" />
              <span>Our Vision</span>
            </h2>
            <p className="text-lg text-slate-700">
              To be the leading global online marketplace for education, recognized for our innovative approach to learning, the quality of our content, and our unwavering commitment to student success. We aim to foster a community of lifelong learners and educators who inspire and support each other.
            </p>
            <p className="text-lg text-slate-700">
              We continuously evolve our platform to incorporate the latest educational technologies and methodologies, ensuring that our learners receive the most effective and engaging learning experience possible.
            </p>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Why Choose EduMarket?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
              <Award className="w-12 h-12 text-blue-600 mx-auto" />
              <h3 className="text-xl font-semibold text-slate-900">Expert Instructors</h3>
              <p className="text-slate-600">Learn from industry leaders and experienced professionals who are passionate about teaching.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
              <Users className="w-12 h-12 text-indigo-600 mx-auto" />
              <h3 className="text-xl font-semibold text-slate-900">Diverse Course Catalog</h3>
              <p className="text-slate-600">Explore thousands of courses across various disciplines, from tech to creative arts.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
              <BookOpen className="w-12 h-12 text-purple-600 mx-auto" />
              <h3 className="text-xl font-semibold text-slate-900">Flexible Learning</h3>
              <p className="text-slate-600">Study at your own pace, anytime, anywhere, with lifetime access to course materials.</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Join Our Community</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Become a part of a thriving global community of learners and educators. Connect, collaborate, and grow with EduMarket.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-lg px-8">
              Sign Up Today
            </Button>
          </Link>
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
