"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: { scale: 0.98, y: 0 }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating Elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-full blur-sm"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
        className="absolute top-40 right-16 w-16 h-16 border border-primary/15 rounded-lg blur-sm"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "4s" }}
        className="absolute bottom-32 left-20 w-12 h-12 border border-primary/10 rounded-full blur-sm"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-5xl mx-auto relative z-10"
      >
        {/* Enhanced Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center px-6 py-3 mb-8 border border-primary/20 rounded-full backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              boxShadow: ["0 0 0px rgba(59, 130, 246, 0.3)", "0 0 20px rgba(59, 130, 246, 0.6)", "0 0 0px rgba(59, 130, 246, 0.3)"]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-3 h-3 bg-primary rounded-full mr-3"
          />
          <span className="text-sm text-primary font-semibold tracking-wide">AI-POWERED LEGAL ANALYSIS</span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="ml-3 w-4 h-4 border border-primary/40 border-t-primary rounded-full"
          />
        </motion.div>

        {/* Enhanced Main Heading */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <motion.h1
            className="text-6xl sm:text-7xl lg:text-8xl font-black mb-4 bg-gradient-to-r from-text-primary via-primary to-text-primary bg-clip-text leading-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            AI Legal Shield
          </motion.h1>
          
          {/* Animated underline */}
          <motion.div
            className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 1.5, delay: 1 }}
          />
        </motion.div>

        {/* Enhanced Subheading */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.p
            className="text-2xl sm:text-3xl lg:text-4xl text-text-secondary font-bold tracking-wide"
            whileHover={{ scale: 1.02, color: "var(--primary)" }}
            transition={{ duration: 0.3 }}
          >
            Your intelligent contract guardian
          </motion.p>
          <motion.div
            className="flex justify-center mt-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full mx-1"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
        >
          Upload any contract and get <span className="text-primary font-semibold">instant AI analysis</span>. 
          We highlight risky clauses, explain complex terms in plain English, and provide 
          <span className="text-primary font-semibold"> strategic negotiation points</span>.
        </motion.p>

        {/* Enhanced CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
        >
          {/* Primary Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="group relative bg-gradient-to-r from-primary to-primary-dark text-white px-10 py-5 rounded-2xl shadow-2xl font-bold text-xl overflow-hidden border border-primary/20"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-primary-dark opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: ["0 0 0px rgba(59, 130, 246, 0.5)", "0 0 30px rgba(59, 130, 246, 0.8)", "0 0 0px rgba(59, 130, 246, 0.5)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10 flex items-center">
              Upload Contract
              <motion.svg
                className="w-6 h-6 ml-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 8, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </motion.svg>
            </span>
          </motion.button>

          {/* Secondary Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="group relative text-text-primary border-2 border-text-secondary/20 hover:border-primary/60 px-10 py-5 rounded-2xl font-bold text-xl backdrop-blur-sm hover:backdrop-blur-md transition-all duration-300 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center">
              Try Sample
              <motion.svg
                className="w-6 h-6 ml-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>

        {/* Enhanced Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-8 opacity-80"
        >
          {[
            { icon: "🔒", text: "256-bit Encryption", desc: "Bank-level security" },
            { icon: "🛡️", text: "GDPR Compliant", desc: "Privacy guaranteed" },
            { icon: "🚫", text: "No Data Stored", desc: "Complete confidentiality" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="group flex flex-col items-center space-y-2 p-4 rounded-xl border border-transparent hover:border-primary/20 transition-all duration-300"
              whileHover={{ 
                scale: 1.08, 
                opacity: 1,
                y: -5
              }}
              variants={pulseVariants}
              animate="animate"
              style={{ animationDelay: `${index * 0.5}s` }}
              transition={{ duration: 0.3 }}
            >
              <motion.span 
                className="text-2xl mb-1"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {item.icon}
              </motion.span>
              <span className="text-sm font-semibold text-text-secondary group-hover:text-primary transition-colors">
                {item.text}
              </span>
              <span className="text-xs text-text-secondary/60 group-hover:text-text-secondary transition-colors">
                {item.desc}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;