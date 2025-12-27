import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { GraduationCap, Users, BarChart3, BookOpen, Building2, UserCircle } from 'lucide-react';

export default function EducationDetails() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding/purpose');
  };

  const roles = [
    { icon: GraduationCap, value: 'student', label: 'Student' },
    { icon: Users, value: 'citizen', label: 'Citizen' },
    { icon: BarChart3, value: 'researcher', label: 'Researcher' },
    { icon: BookOpen, value: 'legal_aspirant', label: 'Legal Aspirant' },
    { icon: Building2, value: 'ngo', label: 'NGO / Social Worker' },
    { icon: UserCircle, value: 'analyst', label: 'Policy Analyst' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">✓</div>
                <span className="ml-2 text-sm">Personal Details</span>
              </div>
              <div className="w-16 h-1 bg-[#1a2847]"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#1a2847] text-white rounded-full flex items-center justify-center">2</div>
                <span className="ml-2 text-sm">Education</span>
              </div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">3</div>
                <span className="ml-2 text-sm text-gray-500">Purpose</span>
              </div>
            </div>
          </div>

          <Card className="border-2 border-gray-200">
            <CardHeader className="bg-[#1a2847] text-white">
              <CardTitle>Step 2: Education & Role Details</CardTitle>
              <p className="text-sm text-gray-300">Tell us about your background</p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Education Section */}
                <div className="space-y-6">
                  <h3 className="text-xl text-[#1a2847] border-b-2 border-[#ff9933] pb-2">Education Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="qualification">Highest Qualification *</Label>
                      <Select required>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select qualification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high_school">High School</SelectItem>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="institution">Institution Name</Label>
                      <Input id="institution" className="mt-2" placeholder="Name of institution" />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="field">Field of Study</Label>
                      <Input id="field" className="mt-2" placeholder="e.g., Law, Engineering, Social Sciences" />
                    </div>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-6">
                  <h3 className="text-xl text-[#1a2847] border-b-2 border-[#ff9933] pb-2">Select Your Role *</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {roles.map((role) => (
                      <label key={role.value} className="cursor-pointer">
                        <input type="radio" name="role" value={role.value} required className="peer hidden" />
                        <div className="border-2 border-gray-300 peer-checked:border-[#1a2847] peer-checked:bg-blue-50 rounded-lg p-4 hover:shadow-md transition-all">
                          <div className="flex flex-col items-center text-center">
                            <role.icon className="w-10 h-10 text-[#1a2847] mb-2" />
                            <span className="text-sm">{role.label}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" onClick={() => navigate('/onboarding/personal')} variant="outline">
                    ← Back
                  </Button>
                  <Button type="submit" className="bg-[#ff9933] hover:bg-[#ff8800] text-white px-8">
                    Next → Purpose Selection
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
