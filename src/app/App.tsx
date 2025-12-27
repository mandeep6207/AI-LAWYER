import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

/* Landing & Onboarding */
import LandingPage from './pages/LandingPage';
import PersonalDetails from './pages/PersonalDetails';
import EducationDetails from './pages/EducationDetails';
import PurposeAwareness from './pages/PurposeAwareness';

/* Core Pages */
import Dashboard from './pages/Dashboard';
import ContactPage from './pages/ContactPage';

/* Analytics */
import WomenCrimesAnalytics from './pages/WomenCrimesAnalytics';
import IPCCrimeDashboard from './pages/IPCCrimeDashboard';

/* AI Tools */
import IPCAIAssistant from './pages/IPCAIAssistant';
import SupremeCourtExplorer from './pages/SupremeCourtExplorer';
import CaseOutcomePredictor from './pages/CaseOutcomePredictor';

/* Legal Awareness */
import LegalAwareness from './pages/LegalAwareness';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ Landing Page FIRST */}
        <Route path="/" element={<LandingPage />} />

        {/* Onboarding Flow */}
        <Route path="/onboarding/personal" element={<PersonalDetails />} />
        <Route path="/onboarding/education" element={<EducationDetails />} />
        <Route path="/onboarding/purpose" element={<PurposeAwareness />} />

        {/* Main Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Analytics */}
        <Route path="/analytics/women-crimes" element={<WomenCrimesAnalytics />} />
        <Route path="/analytics/ipc-trends" element={<IPCCrimeDashboard />} />

        {/* AI Tools */}
        <Route path="/tools/ipc-assistant" element={<IPCAIAssistant />} />
        <Route path="/tools/supreme-court" element={<SupremeCourtExplorer />} />
        <Route path="/tools/case-predictor" element={<CaseOutcomePredictor />} />

        {/* Legal Awareness */}
        <Route path="/legal-awareness" element={<LegalAwareness />} />

        {/* Contact */}
        <Route path="/contact" element={<ContactPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
