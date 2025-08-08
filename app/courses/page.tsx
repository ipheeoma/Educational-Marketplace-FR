'use client'

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Star, Clock, Users, BookOpen, SlidersHorizontal } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { WalletButton } from "@/components/wallet/WalletButton"

export default function CoursesPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [sortBy, setSortBy] = useState("popular")

  const allCourses = [
    {
      id: 1,
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
      bestseller: true
    },
    {
      id: 2,
      title: "Advanced React & Redux Masterclass",
      instructor: "Mike Wilson",
      rating: 4.8,
      students: 8900,
      price: 129,
      originalPrice: 249,
      image: "/react-redux-course.png",
      category: "Development",
      duration: "38 hours",
      level: "Advanced",
      bestseller: false
    },
    {
      id: 3,
      title: "Data Science & Machine Learning",
      instructor: "Dr. Michael Chen",
      rating: 4.8,
      students: 8900,
      price: 129,
      originalPrice: 299,
      image: "/data-science-course.png",
      category: "Data Science",
      duration: "45 hours",
      level: "Intermediate",
      bestseller: true
    },
    {
      id: 4,
      title: "UI/UX Design Masterclass",
      instructor: "Emma Rodriguez",
      rating: 4.9,
      students: 6700,
      price: 79,
      originalPrice: 179,
      image: "/ui-ux-design-course.png",
      category: "Design",
      duration: "28 hours",
      level: "Beginner",
      bestseller: false
    },
    {
      id: 5,
      title: "Digital Marketing Strategy",
      instructor: "James Parker",
      rating: 4.7,
      students: 5400,
      price: 99,
      originalPrice: 199,
      image: "/digital-marketing-course.png",
      category: "Marketing",
      duration: "32 hours",
      level: "Intermediate",
      bestseller: false
    },
    {
      id: 6,
      title: "Python for Data Analysis",
      instructor: "Dr. Lisa Chang",
      rating: 4.8,
      students: 9200,
      price: 109,
      originalPrice: 229,
      image: "/python-data-analysis-course.png",
      category: "Data Science",
      duration: "36 hours",
      level: "Intermediate",
      bestseller: true
    }
  ]

  // Initialize filters from URL parameters only once
  useEffect(() => {
    const search = searchParams.get('search') || ""
    const category = searchParams.get('category') || "all"
    
    setSearchQuery(search)
    setSelectedCategory(category)
  }, [searchParams])

  // Use useMemo to compute filtered courses instead of useEffect
  const filteredCourses = useMemo(() => {
    let filtered = [...allCourses]

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(course => 
        course.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory.toLowerCase() ||
        course.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Level filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter(course => course.level.toLowerCase() === selectedLevel.toLowerCase())
    }

    // Price filter
    filtered = filtered.filter(course => course.price >= priceRange[0] && course.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        // Keep original order for newest
        break
      default: // popular
        filtered.sort((a, b) => b.students - a.students)
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedLevel, priceRange, sortBy])

  const handleSearch = () => {
    // Search is handled by the searchQuery state change
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedLevel("all")
    setPriceRange([0, 300])
    setSortBy("popular")
  }

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
              <WalletButton />
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">All Courses</h1>
          <p className="text-xl text-slate-600">Discover your next learning adventure</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="w-5 h-5 text-slate-600" />
                  <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
                </div>

                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input 
                      placeholder="Search courses..." 
                      className="pl-10" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Level */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Level</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Price Range</label>
                  <div className="px-2">
                    <Slider 
                      value={priceRange} 
                      onValueChange={setPriceRange}
                      max={300} 
                      step={10} 
                      className="w-full" 
                    />
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Rating</label>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{rating} & up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            </Card>
          </div>

          {/* Courses Grid */}
          <div className="lg:col-span-3">
            {/* Sort and Results */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-600">{filteredCourses.length} courses found</p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Courses Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className="bg-white/90 text-slate-700">
                        {course.category}
                      </Badge>
                      {course.bestseller && (
                        <Badge className="bg-orange-500 text-white">
                          Bestseller
                        </Badge>
                      )}
                    </div>
                    <Badge className="absolute top-3 right-3 bg-blue-600 text-white">
                      {course.level}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Link href={`/course/${course.id}`} className="hover:text-blue-600 transition-colors">
                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                      </Link>
                      <p className="text-slate-600">by {course.instructor}</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-slate-900">${course.price}</span>
                          <span className="text-sm text-slate-500 line-through">${course.originalPrice}</span>
                        </div>
                      </div>
                      <Link href={`/course/${course.id}`}>
                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
                          Enroll Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-slate-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No courses found</h3>
                <p className="text-slate-600 mb-4">Try adjusting your filters or search terms</p>
                <Button 
                  variant="outline" 
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Load More */}
            {filteredCourses.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" className="px-8">
                  Load More Courses
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
