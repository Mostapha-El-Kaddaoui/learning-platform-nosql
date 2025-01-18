import React, { useEffect, useState } from 'react';
import { Search, Filter, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const App = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(sortBy && { sort: sortBy })
      });

      const response = await fetch(`http://localhost:3000/api/courses?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      
      const data = await response.json();
      setCourses(data);
      setError(null);
    } catch (err) {
      setError('Failed to load courses. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [searchTerm, selectedCategory, sortBy]);

  const categories = [
    'Programming',
    'Design',
    'Business',
    'Marketing',
    'Science'
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Course Catalog
            </CardTitle>
            <div className="grid gap-4 md:grid-cols-3 mt-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="w-full"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Select>

              <Select
                value={sortBy}
                onValueChange={setSortBy}
                className="w-full"
              >
                <option value="">Sort By</option>
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
          </CardHeader>
        </Card>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading courses...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <Button
              onClick={fetchCourses}
              className="mt-4"
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map(course => (
              <Card key={course._id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
                  {course.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                  )}
                  <div className="flex flex-col gap-2 text-sm text-gray-500">
                    {course.instructor && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Instructor: {course.instructor}</span>
                      </div>
                    )}
                    {course.duration && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                    )}
                    {course.category && (
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>{course.category}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && !error && courses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;