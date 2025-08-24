import React from 'react';
import Beams from './Beams';

const Hero = () => {
  return (
    <>
    
      {/* Your Original Background */}
      {/* <div className="absolute inset-0 z-[-10]">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div> */}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge/Tag */}
        <div className="inline-flex items-center px-3 sm:px-4 py-2 mb-4 sm:mb-6 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-sm">
          <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
          <span className="text-xs sm:text-sm text-primary font-medium">AI-Powered Legal Analysis</span>
        </div>

        {/* Main Heading with Gradient */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-text-primary to-primary leading-tight px-2">
          AI Legal Shield
        </h1>

        {/* Subheading */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-text-secondary mb-6 sm:mb-8 max-w-2xl opacity-90 px-2">
          Your intelligent contract guardian
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mb-8 sm:mb-12 leading-relaxed opacity-80 px-2">
          Upload or paste any contract and get instant AI analysis. We highlight risky clauses, 
          explain complex legal terms in plain English, and provide strategic negotiation points 
          to protect your interests.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2">
          {['Risk Detection', 'Plain English', 'Negotiation Tips', 'Instant Analysis'].map((feature, index) => (
            <span 
              key={feature}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-full text-xs sm:text-sm text-text-secondary backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full max-w-md sm:max-w-none px-4 sm:px-0">
          <button className="group relative bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-primary/25 font-medium text-base sm:text-lg w-full sm:w-auto">
            <span className="relative z-10 flex items-center justify-center">
              Upload Contract
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          
          <button className="group text-text-primary border border-text-secondary/30 hover:border-primary/50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 font-medium text-base sm:text-lg backdrop-blur-sm hover:bg-white/5 w-full sm:w-auto">
            <span className="flex items-center justify-center">
              Try Sample Contract
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center px-4">
          <p className="text-xs sm:text-sm text-text-secondary mb-3 sm:mb-4 opacity-70">Trusted by professionals worldwide</p>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8 opacity-60">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs sm:text-sm text-text-secondary">256-bit Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-xs sm:text-sm text-text-secondary">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-xs sm:text-sm text-text-secondary">No Data Stored</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements for Visual Interest - Hidden on mobile for performance */}
      <div className="hidden sm:block absolute top-1/4 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="hidden sm:block absolute bottom-1/4 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      {/* Mobile-optimized floating elements */}
      <div className="block sm:hidden absolute top-1/3 left-4 w-12 h-12 bg-primary/5 rounded-full blur-lg animate-pulse"></div>
      <div className="block sm:hidden absolute bottom-1/3 right-4 w-16 h-16 bg-primary/3 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
    </>
  );
};

export default Hero;