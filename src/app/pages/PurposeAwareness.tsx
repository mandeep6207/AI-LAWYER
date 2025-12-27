import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BookOpen, Shield, BarChart3, FileText, Heart, CheckCircle2 } from 'lucide-react';

export default function PurposeAwareness() {
  const navigate = useNavigate();

  const purposes = [
    { icon: BookOpen, value: 'learning', label: 'Learning Indian Law' },
    { icon: Shield, value: 'awareness', label: 'Legal Awareness' },
    { icon: BarChart3, value: 'research', label: 'Research & Analysis' },
    { icon: FileText, value: 'case_understanding', label: 'Case Understanding' },
    { icon: Heart, value: 'social', label: 'Social Awareness' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
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
                <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">✓</div>
                <span className="ml-2 text-sm">Personal Details</span>
              </div>
              <div className="w-16 h-1 bg-green-500"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">✓</div>
                <span className="ml-2 text-sm">Education</span>
              </div>
              <div className="w-16 h-1 bg-[#1a2847]"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#1a2847] text-white rounded-full flex items-center justify-center">3</div>
                <span className="ml-2 text-sm">Purpose</span>
              </div>
            </div>
          </div>

          <Card className="border-2 border-gray-200">
            <CardHeader className="bg-[#1a2847] text-white">
              <CardTitle>Step 3: Purpose & Legal Awareness Level</CardTitle>
              <p className="text-sm text-gray-300">Help us personalize your experience</p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Purpose Selection */}
                <div className="space-y-6">
                  <h3 className="text-xl text-[#1a2847] border-b-2 border-[#ff9933] pb-2">What brings you here? (Select all that apply)</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {purposes.map((purpose) => (
                      <label key={purpose.value} className="cursor-pointer">
                        <input type="checkbox" name="purpose" value={purpose.value} className="peer hidden" />
                        <div className="border-2 border-gray-300 peer-checked:border-[#1a2847] peer-checked:bg-blue-50 rounded-lg p-4 hover:shadow-md transition-all">
                          <div className="flex items-center gap-3">
                            <purpose.icon className="w-8 h-8 text-[#1a2847]" />
                            <span>{purpose.label}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Awareness Level */}
                <div className="space-y-6">
                  <h3 className="text-xl text-[#1a2847] border-b-2 border-[#ff9933] pb-2">
                    How familiar are you with Indian laws and IPC sections? *
                  </h3>
                  
                  <div className="space-y-3">
                    {[
                      { value: 'new', label: 'New / Beginner', desc: 'I have little to no knowledge about Indian laws' },
                      { value: 'some', label: 'Some Knowledge', desc: 'I know basic legal concepts and some IPC sections' },
                      { value: 'advanced', label: 'Advanced / Expert', desc: 'I have extensive knowledge of Indian legal system' }
                    ].map((level) => (
                      <label key={level.value} className="cursor-pointer block">
                        <input type="radio" name="awareness" value={level.value} required className="peer hidden" />
                        <div className="border-2 border-gray-300 peer-checked:border-[#1a2847] peer-checked:bg-blue-50 rounded-lg p-4 hover:shadow-md transition-all">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-[#1a2847] mt-1 peer-checked:block hidden" />
                            <div>
                              <p>{level.label}</p>
                              <p className="text-sm text-gray-600">{level.desc}</p>
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" onClick={() => navigate('/onboarding/education')} variant="outline">
                    ← Back
                  </Button>
                  <Button type="submit" className="bg-[#138808] hover:bg-[#0f6606] text-white px-8">
                    Proceed to Dashboard →
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
