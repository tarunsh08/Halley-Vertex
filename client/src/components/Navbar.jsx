import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-transparent backdrop-blur-md py-3 shadow-lg' 
        : 'bg-transparent backdrop-blur-sm py-2'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.5 8.5L22 9L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9L8.5 8.5L12 2Z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Halley Vertex</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200">
              Features
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200">
              Solutions
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200">
              Pricing
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200">
              Resources
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200">
              Sign In
            </button>
            <button className="bg-neutral-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-neutral-700 transition-colors duration-200 shadow-md hover:shadow-lg">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200">
                Features
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200">
                Solutions
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200">
                Pricing
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200">
                Resources
              </a>
              <div className="pt-4 flex flex-col space-y-3">
                <button className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 text-left">
                  Sign In
                </button>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;