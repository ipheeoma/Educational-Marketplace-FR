import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Play, ArrowRight } from 'lucide-react'
import Link from "next/link"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">EduMarket</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-700">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900">
              See EduMarket in Action
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Watch our platform demo to see how easy it is to start learning and teaching on EduMarket
            </p>
          </div>

          {/* Video Player */}
          <Card className="overflow-hidden shadow-2xl">
            <div className="relative bg-slate-900 aspect-video flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <div className="text-white">
                  <h3 className="text-xl font-semibold">Platform Demo Video</h3>
                  <p className="text-white/80">Duration: 3:45</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
                  <Play className="w-5 h-5 mr-2" />
                  Play Demo
                </Button>
              </div>
            </div>
          </Card>

          {/* Demo Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Browse Courses</CardTitle>
                <CardDescription>
                  Explore our vast library of courses across different categories
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Play className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Interactive Learning</CardTitle>
                <CardDescription>
                  Experience our interactive video player and learning tools
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>
                  See how easy it is to track your learning progress and achievements
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center space-y-4 mt-16">
            <h2 className="text-3xl font-bold">Ready to Start Learning?</h2>
            <p className="text-blue-100 text-lg">
              Join thousands of students already learning on our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Start Learning Today
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Browse Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
