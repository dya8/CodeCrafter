import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Users, Target, Award, ArrowRight, Sun, Moon } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-50 to-white'} min-h-screen`}>
      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4">
        <button
          className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-gray-600 hover:bg-gray-600 hover:text-white transition-all duration-300"
          onClick={toggleTheme}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className={`inline-flex items-center space-x-2 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-green-100 text-green-700'} px-4 py-2 rounded-full mb-6`}>
              <span className="text-lg">🌱</span>
              <span className="font-medium">Welcome to Green Yathra</span>
            </div>
            <h1 className={`text-5xl md:text-6xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-green-800'} mb-6 leading-tight`}>
              Journey to
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-green-600'} block`}>Sustainability</span>
            </h1>
            <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-green-700'} mb-8 max-w-3xl mx-auto leading-relaxed`}>
              Embark on your journey to sustainability with Green Yathra. Join our community of environmental champions working together through the Haritha Karma Sena initiative and home-based conservation efforts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-green-600 hover:bg-green-700 text-white'} px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2`}
                onClick={() => navigate('/app')}
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                className={`${isDarkMode ? 'border-2 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white' : 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white'} px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300`}
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-green-800'} mb-4`}>Why Choose Green Yathra?</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-green-600'} max-w-2xl mx-auto`}>
              Discover the features that make environmental conservation accessible and impactful
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`group ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
              <div className={`w-16 h-16 ${isDarkMode ? 'bg-gray-600' : 'bg-green-600'} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-green-800'} mb-4`}>Community Driven</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-green-700'} leading-relaxed`}>
                Connect with like-minded individuals and organizations working towards a common goal of environmental sustainability.
              </p>
            </div>
            <div className={`group ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
              <div className={`w-16 h-16 ${isDarkMode ? 'bg-gray-600' : 'bg-green-600'} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-green-800'} mb-4`}>Focused Action</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-green-700'} leading-relaxed`}>
                Structured programs and initiatives designed to maximize environmental impact through targeted conservation efforts.
              </p>
            </div>
            <div className={`group ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
              <div className={`w-16 h-16 ${isDarkMode ? 'bg-gray-600' : 'bg-green-600'} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-green-800'} mb-4`}>Proven Results</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-green-700'} leading-relaxed`}>
                Track your environmental contributions and see the collective impact of our community's conservation efforts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
