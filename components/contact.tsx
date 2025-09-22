"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, ArrowUpRight } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 text-white relative">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#D1B4C6]/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#D1B4C6]/6 rounded-full blur-3xl"></div>
      {/* Additional light source */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/4 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            <div className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              CONTACT
            </div>
          </h2>
          <p className="text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Tired of staring at a blank email screen? Ready to stop sounding like a robot? Let's chat about how BossyEmail can save your sanity (and your deals).
          </p>
        </motion.div>

        {/* Contact Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Drop Us a Line</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#D1B4C6]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#D1B4C6]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-zinc-400">aylen@bossyemail.com</p>
                    <p className="text-zinc-500 text-xs mt-1">We actually read these (unlike your clients)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#D1B4C6]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#D1B4C6]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Office</p>
                    <p className="text-zinc-400">Miami, FL</p>
                    <p className="text-zinc-500 text-xs mt-1">Where the deals are hot and the emails are hotter</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-zinc-800/50 rounded-2xl p-6 md:p-8 border border-zinc-700/50 backdrop-blur-sm"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-zinc-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#D1B4C6]/50 focus:border-transparent transition-all duration-200"
                    placeholder="Your actual first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-zinc-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#D1B4C6]/50 focus:border-transparent transition-all duration-200"
                    placeholder="Your real last name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#D1B4C6]/50 focus:border-transparent transition-all duration-200"
                  placeholder="your.email@notfake.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#D1B4C6]/50 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Spill the tea. What's your email nightmare? How many times have you stared at a blank screen? We're here for the drama."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#D1B4C6] hover:bg-[#C4A7B9] text-black px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-105 hover:shadow-[0_0_20px_rgba(209,180,198,0.4)] active:scale-95"
              >
                Send It
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
