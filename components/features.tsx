"use client"

import { motion } from "framer-motion"
import { CheckCircle, Mail, Clock, Sparkles, Zap, Shield, Copy, Star, RefreshCw, Save, Edit2, Trash2, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export function Features() {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <>
      <section className="w-full py-16 md:py-24 text-white relative">
        <motion.div 
          className="absolute top-1/3 right-1/3 w-72 h-72 bg-[#D1B4C6]/12 rounded-full blur-3xl"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: [0.5, 1.3, 0.5], opacity: [0, 0.5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          viewport={{ once: true }}
        ></motion.div>
        {/* Additional light source */}
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/4 rounded-full blur-3xl"
          initial={{ scale: 0.3, opacity: 0 }}
          whileInView={{ scale: [0.3, 1.1, 0.3], opacity: [0, 0.3, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          viewport={{ once: true }}
        ></motion.div>
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            <div className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              <div>SMART</div>
              <div>FEATURES</div>
            </div>
          </h2>
          <p className="text-base text-zinc-300 max-w-2xl leading-relaxed mb-8">
            BossyEmail turns your deal chaos into clear, professional messages that get replies, keep clients calm, and push contracts forward—without you staring at a blinking cursor all night.
          </p>
          <a
            href="#pricing"
            className="bg-[#D1B4C6] hover:bg-[#C4A7B9] text-black px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 hover:shadow-[0_0_20px_rgba(209,180,198,0.4)] active:scale-95"
          >
            Get Started
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>

          {/* Feature List - Matching the image design */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full md:w-1/2 space-y-8">
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div 
                  className="flex items-center justify-between py-6 border-b border-zinc-800 hover:border-zinc-600 transition-colors duration-200 cursor-pointer"
                  onClick={() => toggleSection(0)}
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white group-hover:text-zinc-300 transition-colors duration-200">
                    Smart Email Generator
                  </h3>
                  {expandedSections.includes(0) ? (
                    <ChevronUp className="w-6 h-6 text-white group-hover:text-zinc-300 transition-colors duration-200" />
                  ) : (
                    <ArrowUpRight className="w-6 h-6 text-white group-hover:text-zinc-300 transition-colors duration-200" />
                  )}
                </div>
                
                {/* Expanded Content - Dashboard Image */}
                {expandedSections.includes(0) && (
                  <div className="mt-6">
                    <p className="text-zinc-300 mb-6 leading-relaxed">
                      Why waste an hour "perfecting" an email? Drop in a few details, click generate, and watch BossyEmail hand you a polished draft faster than your client can say "Can we see it tonight?"
                    </p>
                    <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-[#D1B4C6]/30 hover:shadow-[0_0_25px_rgba(209,180,198,0.08)] transition-all duration-300 group">
                      <div className="aspect-video bg-gradient-to-br from-zinc-700 to-zinc-600 rounded flex items-center justify-center">
                        <div className="text-center">
                          <Mail className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                          <p className="text-zinc-300 text-lg font-medium">Email Generation Dashboard</p>
                          <p className="text-zinc-400 text-sm mt-2">Live email creation interface</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
              
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div 
                  className="flex items-center justify-between py-6 border-b border-zinc-800 hover:border-zinc-600 transition-colors duration-200 cursor-pointer"
                  onClick={() => toggleSection(1)}
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white group-hover:text-zinc-300 transition-colors duration-200">
                    Real Estate–Smart Templates
                  </h3>
                  {expandedSections.includes(1) ? (
                    <ChevronUp className="w-6 h-6 text-white group-hover:text-zinc-300 transition-colors duration-200" />
                  ) : (
                    <ArrowUpRight className="w-6 h-6 text-white group-hover:text-zinc-300 transition-colors duration-200" />
                  )}
                </div>
                
                {/* Expanded Content - Dashboard Image */}
                {expandedSections.includes(1) && (
                  <div className="mt-6">
                    <p className="text-zinc-300 mb-6 leading-relaxed">
                      Forget "Dear Sir/Madam." BossyEmail comes preloaded with 100+ plug-and-play email templates written for the chaos of contract-to-close. Inspection drama? Low appraisal? Ghosting client? We've got a draft ready.
                    </p>
                    <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-[#D1B4C6]/30 hover:shadow-[0_0_25px_rgba(209,180,198,0.08)] transition-all duration-300 group">
                      <div className="aspect-video rounded overflow-hidden">
                        <img 
                          src="/templates.jpeg" 
                          alt="Template Library Dashboard" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
              
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div 
                  className="flex items-center justify-between py-6 border-b border-zinc-800 hover:border-zinc-600 transition-colors duration-200 cursor-pointer"
                  onClick={() => toggleSection(2)}
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white group-hover:text-zinc-300 transition-colors duration-200">
                    AI That Knows Real Estate
                  </h3>
                  {expandedSections.includes(2) ? (
                    <ChevronUp className="w-6 h-6 text-white group-hover:text-zinc-300 transition-colors duration-200" />
                  ) : (
                    <ArrowUpRight className="w-6 h-6 text-white group-hover:text-zinc-300 transition-colors duration-200" />
                  )}
                </div>
                
                {/* Expanded Content - Dashboard Image */}
                {expandedSections.includes(2) && (
                  <div className="mt-6">
                    <p className="text-zinc-300 mb-6 leading-relaxed">
                      Other email tools spit out fluff. BossyEmail speaks agent. It pulls from real contracts, addenda, and scenarios, so what you send actually makes sense (and gets a response instead of a delete).
                    </p>
                    <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-[#D1B4C6]/30 hover:shadow-[0_0_25px_rgba(209,180,198,0.08)] transition-all duration-300 group">
                      <div className="aspect-video rounded overflow-hidden">
                        <img 
                          src="/favorites.jpeg" 
                          alt="AI Real Estate Dashboard" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
              
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div 
                  className="flex items-center justify-between py-6 border-b border-zinc-800 hover:border-zinc-600 transition-colors duration-200 cursor-pointer"
                  onClick={() => toggleSection(3)}
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white group-hover:text-zinc-300 transition-colors duration-200">
                    Conversion-First Copy
                  </h3>
                  {expandedSections.includes(3) ? (
                    <ChevronUp className="w-6 h-6 text-white group-hover:text-zinc-300 transition-colors duration-200" />
                  ) : (
                    <ArrowUpRight className="w-6 h-6 text-white group-hover:text-zinc-300 transition-colors duration-200" />
                  )}
                </div>
                
                {/* Expanded Content - Dashboard Image */}
                {expandedSections.includes(3) && (
                  <div className="mt-6">
                    <p className="text-zinc-300 mb-6 leading-relaxed">
                      Our tone isn't corporate robot. It's clear, direct, and professional with just enough personality to make clients listen (and lenders answer). Emails that get opened, read, and acted on.
                    </p>
                    <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-[#D1B4C6]/30 hover:shadow-[0_0_25px_rgba(209,180,198,0.08)] transition-all duration-300 group">
                      <div className="aspect-video bg-gradient-to-br from-zinc-700 to-zinc-600 rounded flex items-center justify-center">
                        <div className="text-center">
                          <Zap className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                          <p className="text-zinc-300 text-lg font-medium">Conversion Dashboard</p>
                          <p className="text-zinc-400 text-sm mt-2">Copy that converts and gets results</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}