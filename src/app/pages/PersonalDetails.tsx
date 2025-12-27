import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Upload, User } from 'lucide-react';

export default function PersonalDetails() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding/education');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#1a2847] text-white rounded-full flex items-center justify-center">1</div>
                <span className="ml-2 text-sm">Personal Details</span>
              </div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">2</div>
                <span className="ml-2 text-sm text-gray-500">Education</span>
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
              <CardTitle>Step 1: Personal Information</CardTitle>
              <p className="text-sm text-gray-300">Please provide your basic details</p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Image Upload */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-[#ff9933]">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-16 h-16 text-gray-400" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-[#1a2847] text-white p-2 rounded-full cursor-pointer hover:bg-[#2a3857] transition-colors">
                      <Upload className="w-5 h-5" />
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">Upload Profile Photo</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" required className="mt-2" placeholder="Enter your full name" />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" required className="mt-2" placeholder="email@example.com" />
                  </div>

                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input id="age" type="number" required className="mt-2" placeholder="Enter your age" min="18" />
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select required>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="phone">Contact Number *</Label>
                    <Input id="phone" type="tel" required className="mt-2" placeholder="+91 XXXXX XXXXX" />
                  </div>

                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" required className="mt-2" placeholder="Enter city" />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="state">State *</Label>
                    <Select required>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        <SelectItem value="rajasthan">Rajasthan</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" className="bg-[#ff9933] hover:bg-[#ff8800] text-white px-8">
                    Next → Education Details
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Your data is protected and used only for platform personalization</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
