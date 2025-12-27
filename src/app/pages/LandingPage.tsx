import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BookOpen, BarChart3, Gavel, Brain, Users, Building2, GraduationCap, Shield } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a2847] via-[#243a5e] to-[#1a2847] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-1 bg-[#ff9933]"></div>
              <div className="w-24 h-1 bg-white mx-2"></div>
              <div className="w-24 h-1 bg-[#138808]"></div>
            </div>
            
            <h1 className="text-5xl mb-6">
              Understand Indian Laws, Crime Trends, and Court Judgments – Simplified using AI
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-lg">Law made simple for citizens</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-lg">Real crime data analytics</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-lg">Supreme Court judgments explained</p>
              </div>
            </div>
            
            <div className="bg-yellow-100 text-[#1a2847] p-4 rounded-lg mb-8 inline-block">
              <p className="flex items-center gap-2 justify-center">
                <Shield className="w-5 h-5" />
                <span>Responsible AI • Not Legal Advice • Educational Purpose Only</span>
              </p>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Link to="/onboarding/personal" className="px-8 py-4 bg-[#ff9933] text-white rounded-lg hover:bg-[#ff8800] transition-all transform hover:scale-105">
                Create Account
              </Link>
              <a href="#features" className="px-8 py-4 bg-white text-[#1a2847] rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105">
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This For Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center mb-12 text-[#1a2847]">Who Is This Platform For?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: GraduationCap, title: 'Students', desc: 'Learn Indian law in simple terms' },
              { icon: Users, title: 'Citizens', desc: 'Know your rights and duties' },
              { icon: BarChart3, title: 'Researchers', desc: 'Access crime data analytics' },
              { icon: BookOpen, title: 'Legal Aspirants', desc: 'Prepare for legal careers' },
              { icon: Building2, title: 'NGOs & Policy Analysts', desc: 'Data-driven insights' }
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-xl transition-all transform hover:scale-105 border-2 border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#1a2847] rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-[#ff9933]" />
                  </div>
                  <h3 className="mb-2 text-[#1a2847]">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center mb-12 text-[#1a2847]">Key Features Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'IPC Law Assistant',
                desc: 'Search and understand IPC sections in simple language. Know what is bailable and non-bailable.',
                color: 'bg-blue-500'
              },
              {
                icon: Gavel,
                title: 'Supreme Court Judgment Explorer',
                desc: 'AI-powered search through Supreme Court judgments with simplified explanations.',
                color: 'bg-purple-500'
              },
              {
                icon: BarChart3,
                title: 'Crimes Against Women Analytics',
                desc: 'Visualize trends, patterns, and statistics about crimes against women in India.',
                color: 'bg-pink-500'
              },
              {
                icon: Brain,
                title: 'Case Outcome Predictor (Prototype)',
                desc: 'Educational AI model to understand potential case outcomes based on facts.',
                color: 'bg-indigo-500'
              },
              {
                icon: Shield,
                title: 'Legal Awareness Tools',
                desc: 'Know Your Rights, FAQs, and educational content for legal awareness.',
                color: 'bg-green-500'
              },
              {
                icon: BarChart3,
                title: 'Crime Trends (IPC)',
                desc: 'Year-wise crime statistics and trends across different IPC sections.',
                color: 'bg-orange-500'
              }
            ].map((feature, i) => (
              <Card key={i} className="hover:shadow-xl transition-all border-l-4 border-[#1a2847]">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl mb-3 text-[#1a2847]">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ethics & Disclaimer */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center mb-12 text-[#1a2847]">Ethics & Disclaimer</h2>
          
          <div className="bg-yellow-50 border-l-4 border-[#ff9933] p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl mb-3 text-[#1a2847]">✓ What This Is</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Educational and decision-support tool</li>
                  <li>• Trusted Indian legal datasets</li>
                  <li>• Transparent AI usage</li>
                  <li>• Free for all citizens</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl mb-3 text-[#1a2847]">✗ What This Is NOT</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Not a replacement for lawyers</li>
                  <li>• Not official legal advice</li>
                  <li>• Not for collecting PII</li>
                  <li>• Not for commercial use</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
