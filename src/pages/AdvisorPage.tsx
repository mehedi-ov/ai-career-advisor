// src/pages/AdvisorPage.tsx

import CareerAdvisorForm from '../components/advisor/CareerAdvisorForm';
import { GridPattern } from "../components/ui/grid-pattern"; 
import { ChartBarIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const AdvisorPage = () => {
  return (
    <div className="relative flex w-full min-h-screen bg-gray-50 font-sans">
      <GridPattern className="absolute inset-0 z-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
      <aside className="relative z-10 w-72 bg-white p-6 h-screen sticky top-0 border-r border-gray-200">
          <div className="text-2xl font-bold text-brand-purple mb-12 mt-4 px-2">ARO</div>
          <nav className="space-y-3">
            <a href="/dashboard" className="flex items-center p-3 text-gray-500 font-semibold hover:bg-gray-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 mr-4" />
              Dashboard
            </a>
            <a href="/advisor" className="flex items-center p-3 bg-indigo-50 text-brand-purple font-bold rounded-lg">
              <BriefcaseIcon className="w-6 h-6 mr-4" />
              AI Advisor
            </a>
          </nav>
      </aside>
      <main className="relative z-10 flex-1 p-8 sm:p-12">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">AI Career Advisor</h1>
            <CareerAdvisorForm />
        </div>
      </main>
    </div>
  );
};

export default AdvisorPage;