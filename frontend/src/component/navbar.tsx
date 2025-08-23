import React from 'react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Navbar = () => {
  return (
    <div className="w-full flex justify-center p-4">
      <nav className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-3 sm:px-6 py-2 shadow-lg max-w-fit">
        <div className="flex items-center justify-between gap-2 sm:gap-8 w-full">
          {/* Navigation Links */}
          <div className="hidden sm:flex items-center gap-6">
            <a href="#home" className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200">
              Home
            </a>
            <a href="#about" className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200">
              About
            </a>
            <a href="/analyze" className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200">
              Analyze
            </a>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex sm:hidden items-center gap-3">
            <a href="#home" className="text-white/90 hover:text-white text-xs font-medium transition-colors duration-200">
              Home
            </a>
            <a href="#about" className="text-white/90 hover:text-white text-xs font-medium transition-colors duration-200">
              About
            </a>
            <a href="/analyze" className="text-white/90 hover:text-white text-xs font-medium transition-colors duration-200">
              Analyze
            </a>
          </div>

          {/* Auth section */}
          <div className="flex items-center gap-2 sm:gap-3">
            <SignedOut>
              <SignInButton>
                <button className="text-white/90 hover:text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full hover:bg-white/10 transition-all duration-200">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="text-white/90 hover:text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full hover:bg-white/10 transition-all duration-200">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Simple background for demo */}
      <div className="fixed inset-0 -z-20 bg-slate-900"></div>
    </div>
  )
}

export default Navbar