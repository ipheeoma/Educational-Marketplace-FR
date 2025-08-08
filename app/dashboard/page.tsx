import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Clock, Award, TrendingUp, Play, CheckCircle, Calendar, Bell, Settings, User, LogOut } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function DashboardPage() {
  const enrolledCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      progress: 65,
      totalLessons: 42,
      completedLessons: 27,
      image: "/web-development-course.png",
      nextLesson: "Building REST APIs",
      timeLeft: "2h 30m"
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      instructor: "Emma Rodriguez",
      progress: 30,
      totalLessons: 28,
      completedLessons: 8,
      image: "/ui-ux-design-course.png",
      nextLesson: "Color Theory Basics",
      timeLeft: "1h 45m"
    },
    {
      id: 3,
      title: "Data Science & Machine Learning",
      instructor: "Dr. Michael Chen",
      progress: 85,
      totalLessons: 45,
      completedLessons: 38,
      image: "/data-science-course.png",
      nextLesson: "Neural Networks",
      timeLeft: "3h 15m"
    }
  ]

  const achievements = [
    { name: "First Course Completed", icon: Award, earned: true },
    { name: "Week Streak", icon: Calendar, earned: true },
    { name: "Quick Learner", icon: TrendingUp, earned: false },
    { name: "Course Master", icon: BookOpen, earned: false }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">EduMarket</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/diverse-user-avatars.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="text-center space-y-4 mb-6">
                <Avatar className="w-20 h-20 mx-auto">
                  <AvatarImage src="/diverse-user-avatars.png" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">John Doe</h3>
                  <p className="text-slate-600">Student</p>
                </div>
              </div>
              <nav className="space-y-2">
                <Link href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700">
                  <User className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link href="/dashboard/courses" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100">
                  <BookOpen className="w-5 h-5" />
                  <span>My Courses</span>
                </Link>
                <Link href="/dashboard/certificates" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100">
                  <Award className="w-5 h-5" />
                  <span>Certificates</span>
                </Link>
                <Link href="/dashboard/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
                <Link href="/auth/signin" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100">
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </Link>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, John! 👋</h1>
              <p className="text-slate-600">Continue your learning journey</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Enrolled Courses</p>
                      <p className="text-2xl font-bold text-slate-900">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Completed</p>
                      <p className="text-2xl font-bold text-slate-900">1</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Hours Learned</p>
                      <p className="text-2xl font-bold text-slate-900">47</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Certificates</p>
                      <p className="text-2xl font-bold text-slate-900">2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Continue Learning */}
            <Card>
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      width={80}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-semibold text-slate-900">{course.title}</h4>
                        <p className="text-sm text-slate-600">by {course.instructor}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Progress</span>
                          <span className="text-slate-900">{course.completedLessons}/{course.totalLessons} lessons</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600">
                          Next: {course.nextLesson}
                        </div>
                        <Badge variant="secondary">{course.timeLeft} left</Badge>
                      </div>
                    </div>
                    <Link href={`/course/${course.id}/lesson`}><Button className="bg-gradient-to-r from-blue-600 to-indigo-700"><Play className="w-4 h-4 mr-2" />Continue</Button></Link>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Your learning milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-4 rounded-lg border ${achievement.earned ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${achievement.earned ? 'bg-green-100' : 'bg-slate-200'}`}>
                        <achievement.icon className={`w-5 h-5 ${achievement.earned ? 'text-green-600' : 'text-slate-400'}`} />
                      </div>
                      <div>
                        <h4 className={`font-medium ${achievement.earned ? 'text-green-900' : 'text-slate-600'}`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-sm ${achievement.earned ? 'text-green-600' : 'text-slate-500'}`}>
                          {achievement.earned ? 'Earned' : 'Not earned yet'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Based on your learning preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Advanced JavaScript Concepts",
                      instructor: "Alex Thompson",
                      rating: 4.8,
                      price: 99,
                      image: "/javascript-course.png"
                    },
                    {
                      title: "Mobile App Development",
                      instructor: "Maria Garcia",
                      rating: 4.9,
                      price: 129,
                      image: "/mobile-app-development.png"
                    }
                  ].map((course, index) => (
                    <div key={index} className="flex space-x-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        width={100}
                        height={75}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1 space-y-2">
                        <h4 className="font-semibold text-slate-900">{course.title}</h4>
                        <p className="text-sm text-slate-600">by {course.instructor}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-600">★ {course.rating}</div>
                          <div className="text-lg font-bold text-slate-900">${course.price}</div>
                        </div>
                        <Link href={`/course/${index + 4}`}><Button size="sm" variant="outline" className="w-full">View Course</Button></Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
