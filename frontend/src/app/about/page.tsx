'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, MessageSquare, Code2, Database, Lock } from 'lucide-react';

const AboutPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2
      }
    }
  };

  const techStackItems = [
    { icon: Code2, name: "Next.js", description: "React framework", color: "text-blue-400" },
    { icon: Code2, name: "FastAPI", description: "Python backend", color: "text-green-400" },
    { icon: MessageSquare, name: "LangChain", description: "AI processing", color: "text-purple-400" },
    { icon: Database, name: "NeonDB", description: "PostgreSQL database", color: "text-cyan-400" },
    { icon: Lock, name: "Clerk", description: "Authentication", color: "text-orange-400" },
    { icon: Code2, name: "OpenRouter", description: "AI API gateway", color: "text-pink-400" }
  ];

  return (
    <>
      <motion.div 
        className="relative pt-32 pb-20 px-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div className="mb-8" variants={itemVariants}>
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <motion.div
                variants={iconVariants}
                whileHover="hover"
              >
                <Shield className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            AI Legal Shield
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/80 mb-12 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Your free AI lawyer for contracts. Upload any document and get instant analysis in plain English.
          </motion.p>

          {/* Glassmorphism Feature Cards */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
          >
            {[
              { icon: FileText, title: "Risk Detection", description: "Highlights risky clauses automatically" },
              { icon: MessageSquare, title: "Plain English", description: "Explains complex terms simply" },
              { icon: Shield, title: "Negotiation Tips", description: "Suggests improvement points" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <feature.icon className="w-8 h-8 text-white mb-4 mx-auto" />
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div 
        className="pb-20 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-white mb-4">Built With</h2>
            <p className="text-white/70">Modern tech stack for reliable performance</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {techStackItems.map((tech, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                custom={index}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <tech.icon className={`w-6 h-6 ${tech.color}`} />
                  </motion.div>
                  <span className="text-white font-medium">{tech.name}</span>
                </div>
                <p className="text-white/60 text-sm">{tech.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Simple CTA */}
      <motion.div 
        className="pb-32 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div 
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10"
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <motion.h3 
              className="text-2xl font-bold text-white mb-4"
              variants={itemVariants}
            >
              Making legal documents accessible to everyone
            </motion.h3>
            <motion.p 
              className="text-white/70 mb-6"
              variants={itemVariants}
            >
              Bridge the legal literacy gap with AI-powered contract analysis
            </motion.p>
            <motion.button 
              className="px-8 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              Try It Now
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
</>
  );
};

export default AboutPage;