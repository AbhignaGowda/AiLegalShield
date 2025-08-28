"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/analyze', label: 'Analyze' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <motion.div 
        className="w-full flex justify-center p-4 relative z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.nav 
          className={`backdrop-blur-xl border rounded-2xl px-6 sm:px-8 py-4 shadow-2xl max-w-6xl w-full transition-all duration-300 ${
            scrolled 
              ? 'bg-white/15 border-white/30 shadow-xl' 
              : 'bg-white/10 border-white/20'
          }`}
          whileHover={{ 
            scale: 1.01,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between w-full">
            
            {/* Logo/Brand Section */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="text-xl font-bold text-white hover:text-blue-200 transition-colors duration-300">
                Logo
              </Link>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link 
                    href={item.href} 
                    className="relative text-white/90 hover:text-white text-sm font-medium transition-all duration-300 group"
                  >
                    {item.label}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center gap-3">
              <SignedOut>
                <SignInButton>
                  <motion.button 
                    className="text-white/90 hover:text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/20"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In
                  </motion.button>
                </SignInButton>
                <SignUpButton>
                  <motion.button 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign Up
                  </motion.button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-2"
                >
                  <UserButton />
                </motion.div>
              </SignedIn>
            </div>

            {/* Mobile Right Section - User + Hamburger */}
            <div className="md:hidden flex items-center gap-3">
              <SignedIn>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserButton />
                </motion.div>
              </SignedIn>
              
              <motion.button
                onClick={toggleMenu}
                className="text-white/90 hover:text-white p-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 relative z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={isOpen ? "open" : "closed"}
                  className="w-6 h-6 flex flex-col justify-center items-center"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0, opacity: 1 },
                      open: { rotate: 45, y: 6, opacity: 1 }
                    }}
                    className="w-5 h-0.5 bg-current block transition-all duration-300 origin-center"
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1, x: 0 },
                      open: { opacity: 0, x: 20 }
                    }}
                    className="w-5 h-0.5 bg-current block my-1.5 transition-all duration-300"
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0, opacity: 1 },
                      open: { rotate: -45, y: -6, opacity: 1 }
                    }}
                    className="w-5 h-0.5 bg-current block transition-all duration-300 origin-center"
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.nav>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-24 left-4 right-4 bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl z-50 md:hidden overflow-hidden"
            >
              <div className="p-6">
                {/* Mobile Navigation Links */}
                <motion.div className="space-y-3 mb-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      variants={itemVariants}
                      whileHover={{ x: 6, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="flex items-center justify-between text-white/90 hover:text-white text-lg font-medium py-4 px-4 rounded-xl hover:bg-white/10 transition-all duration-300 group border border-transparent hover:border-white/10"
                      >
                        <span>{item.label}</span>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400"
                          whileHover={{ x: 3 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Mobile Auth Section */}
                <SignedOut>
                  <motion.div 
                    variants={itemVariants}
                    className="space-y-3 border-t border-white/20 pt-6"
                  >
                    <SignInButton>
                      <motion.button
                        onClick={closeMenu}
                        className="w-full text-white/90 hover:text-white text-lg font-medium py-4 px-4 rounded-xl hover:bg-white/10 border border-white/20 hover:border-white/30 transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Sign In
                      </motion.button>
                    </SignInButton>
                    <SignUpButton>
                      <motion.button
                        onClick={closeMenu}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg font-semibold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ 
                          scale: 1.02, 
                          y: -2,
                          boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Sign Up
                      </motion.button>
                    </SignUpButton>
                  </motion.div>
                </SignedOut>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;