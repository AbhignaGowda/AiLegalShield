'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.footer 
      className="border-t border-white/10 bg-black/20 backdrop-blur-md"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI Legal Shield</span>
            </div>
            <p className="text-white/60 mb-6 max-w-md">
              Making legal documents accessible to everyone through AI-powered contract analysis.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Mail, href: "#" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {['How it Works', 'Features', 'Pricing', 'API'].map((link, index) => (
                <li key={index}>
                  <motion.a 
                    href="#" 
                    className="text-white/60 hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {['Help Center', 'Contact', 'Privacy Policy', 'Terms of Service'].map((link, index) => (
                <li key={index}>
                  <motion.a 
                    href="#" 
                    className="text-white/60 hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-2 text-white/60 mb-4 md:mb-0">
            <span>© 2025 AI Legal Shield. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart className="w-4 h-4 text-red-400 fill-current" />
            </motion.div>
            <span>for better contracts</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-white/60">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10"
            >
              🔒 Secure & Private
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10"
            >
              ⚡ Always Free
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;