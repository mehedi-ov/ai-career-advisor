// src/pages/HomePage.tsx (Final, Definitive, and High-Fidelity Version)

import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

import { ArrowLeftIcon, UserIcon, WifiIcon, CodeBracketIcon, CpuChipIcon, ShareIcon } from '@heroicons/react/24/outline';
import RobotImage from '../assets/landing-page-robot.png';
import FeaturesSection from '@/components/layout/FeaturesSection';
import HowItWorksSection from '@/components/layout/HowItWorksSection';
import PricingSection from '@/components/layout/PricingSection';
import TestimonialsSection from '@/components/layout/TestimonialsSection';
import Footer from '@/components/layout/Footer';
import ProductPreviewSection from "@/components/layout/ProductPreviewSection"
import TrustedBySection from "@/components/layout/TrustedBySection";
import FAQSection from "@/components/layout/FAQSection";
import CTABanner from "@/components/layout/CTABanner";


// --- ANIMATION VARIANTS for a professional staggered entrance effect ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

// --- SUB-COMPONENTS with perfected styling ---

const FloatingCard = ({ className, text, author, subtext }: any) => (
  <motion.div variants={itemVariants} className={`absolute bg-white/70 backdrop-blur-lg p-4 rounded-2xl shadow-card border border-white/20 animate-float ${className}`}>
    <p className="text-sm font-semibold text-brand-text-primary">{text}</p>
    <div className="flex items-center mt-3">
      <UserIcon className="w-6 h-6 rounded-full mr-2 text-brand-text-secondary" />
      <div><p className="text-xs font-bold text-brand-text-primary">{author}</p><p className="text-xs text-brand-text-secondary">{subtext}</p></div>
    </div>
  </motion.div>
);

// --- THIS IS THE NEW, PERFECTED FEATURE CARD ---
const FeatureCard = ({ icon: Icon, title, description, link }: any) => (
  <Link to={link} className="group block h-full">
    <motion.div 
      variants={itemVariants} 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white p-8 rounded-3xl shadow-card h-full border border-gray-100 cursor-pointer"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-brand-primary-light flex items-center justify-center">
          <Icon className="w-7 h-7 text-brand-primary" />
        </div>
        <span className="text-xs font-bold text-brand-text-secondary bg-gray-100 py-1 px-3 rounded-full">Oesxr</span>
      </div>
      <h3 className="text-lg font-bold text-brand-text-primary mb-2">{title}</h3>
      <p className="text-brand-text-secondary leading-relaxed">{description}</p>
    </motion.div>
  </Link>
);

const TopNavbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => { try { await logOut(); toast.success('Logged out!'); navigate('/'); } catch (error) { toast.error('Failed to log out.'); } };
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <motion.header variants={itemVariants} className="absolute top-0 left-0 w-full z-50 py-6">
      <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-brand-primary-light rounded-full flex items-center justify-center"><WifiIcon className="w-6 h-6 text-brand-primary" /></div>
          <span className="text-2xl font-bold text-brand-text-primary">ARO</span>
        </div>
        <nav className="hidden lg:flex items-center space-x-10 text-brand-text-secondary font-semibold">
          <a href="#features" onClick={(e) => handleScroll(e, 'features')} className="hover:text-brand-primary transition-colors">Features</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Pricing</a>
          <a href="#" className="hover:text-brand-primary transition-colors">About Us</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Contact</a>
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="px-6 py-3 font-bold text-white bg-brand-primary rounded-full shadow-button-primary hover:-translate-y-0.5 transition-transform">Dashboard</Link>
              <button onClick={handleLogout} className="px-6 py-3 font-bold text-brand-primary rounded-full hover:bg-gray-100 transition-colors">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-6 py-3 font-bold text-brand-primary rounded-full hover:bg-gray-100 transition-colors">Log In</Link>
              <Link to="/signup" className="px-6 py-3 font-bold text-white bg-brand-primary rounded-full shadow-button-primary hover:-translate-y-0.5 transition-transform">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};



const HomePage = () => {
  const { user } = useAuth();
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="bg-brand-bg font-sans">
      <TopNavbar />
      <main className="relative pt-48 pb-24 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={containerVariants} className="z-10">
            <motion.div variants={itemVariants} className="flex items-center space-x-2 text-sm text-brand-text-secondary font-semibold mb-4"><ArrowLeftIcon className="w-4 h-4" /><span>Career Advisor Tslun E</span></motion.div>
            <motion.h1 variants={itemVariants} className="text-6xl lg:text-7xl font-black text-brand-text-primary tracking-tighter leading-tight">Unlock your career potential with AI</motion.h1>
            <motion.p variants={itemVariants} className="mt-6 text-lg text-brand-text-secondary max-w-lg">AI Career Advisor & Roadmap Builder App to help you create personalized oaths and interactive roadmaps with AI-powered suggestions.</motion.p>
            <motion.div variants={itemVariants} className="mt-10">
              <Link to={user ? "/dashboard" : "/signup"} className="inline-block px-10 py-4 text-lg font-bold rounded-2xl text-white bg-brand-primary shadow-button-primary hover:-translate-y-1 transition-transform duration-300">Get Started</Link>
            </motion.div>
          </motion.div>
          <motion.div variants={containerVariants} className="relative h-[600px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-full blur-3xl opacity-50"></div>
            <motion.img variants={itemVariants} src={RobotImage} alt="AI Robot" className="relative z-20 w-full max-w-md h-auto object-contain" />
            <FloatingCard className="top-10 left-5" text="Jeont Zey, BTEO oon" author="Yhaics ov ontist" subtext="Fiastie thae fnuteog stfaog" />
            <FloatingCard className="bottom-20 -left-10" text="The Tetc deodacry" author="AOM" subtext="Qoemd tort trea" />
            <FloatingCard className="top-5 -right-5" text="Ailu tiidng" author="Fino ests best iof" subtext="+12..35.0 dr asnjqremsopn" />
            <FloatingCard className="bottom-16 right-0" text="193M Don" author="Ieiel sel et oet" />
          </motion.div>
        </div>
      </main>

      <FeaturesSection />
      
       <ProductPreviewSection />
      <PricingSection />
      <FAQSection />

   

      
      <TestimonialsSection />
      <HowItWorksSection />
        <CTABanner />
<TrustedBySection />
       <Footer />
    </motion.div>
   
  );
};

export default HomePage;