import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a2847] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg mb-4 text-[#ff9933]">About Project</h3>
            <p className="text-gray-300 text-sm">
              AI Lawyer is an educational platform designed to make Indian laws accessible to everyone.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg mb-4 text-[#ff9933]">Data Sources</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>National Crime Records Bureau</li>
              <li>Supreme Court of India</li>
              <li>Indian Penal Code Database</li>
              <li>Ministry of Law & Justice</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg mb-4 text-[#ff9933]">Ethics & Privacy</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Educational Purpose Only</li>
              <li>Not Legal Advice</li>
              <li>Data Privacy Protected</li>
              <li>Transparent AI Usage</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg mb-4 text-[#ff9933]">Contact Information</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ff9933]" />
                <span>support@ailawyer.gov.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ff9933]" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ff9933]" />
                <span>Ministry of Law, New Delhi</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© 2024 AI Lawyer Platform | Government of India Initiative | All Rights Reserved</p>
          <p className="mt-2">This platform is for educational and awareness purposes only. It does not replace professional legal counsel.</p>
        </div>
      </div>
    </footer>
  );
}
