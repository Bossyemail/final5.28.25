"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, ArrowRight } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 text-black bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="display-6 sm:display-7 md:display-8 mb-6 text-black" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
            Contact
          </h2>
          <p className="paragraph-default text-[#505050] max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
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
                <h3 className="display-4 mb-6 text-black" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>Drop Us a Line</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-[#161616] rounded-none flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#161616]" />
                  </div>
                  <div>
                    <p className="paragraph-default text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500, lineHeight: '1.5em' }}>Email</p>
                    <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>aylen@bossyemail.com</p>
                    <p className="paragraph-small text-[#ABABAB] mt-1" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>We actually read these (unlike your clients)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-[#161616] rounded-none flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#161616]" />
                  </div>
                  <div>
                    <p className="paragraph-default text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500, lineHeight: '1.5em' }}>Office</p>
                    <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>Miami, FL</p>
                    <p className="paragraph-small text-[#ABABAB] mt-1" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>Where the deals are hot and the emails are hotter</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-[#161616] rounded-none p-6 md:p-8 border border-[#161616]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block paragraph-small font-medium text-white mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 bg-[#292929] border border-[#292929] rounded-none text-white placeholder-[#ABABAB] focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                    placeholder="Your actual first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block paragraph-small font-medium text-white mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 bg-[#292929] border border-[#292929] rounded-none text-white placeholder-[#ABABAB] focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                    placeholder="Your real last name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block paragraph-small font-medium text-white mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-[#292929] border border-[#292929] rounded-none text-white placeholder-[#ABABAB] focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                  placeholder="your.email@notfake.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block paragraph-small font-medium text-white mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-[#292929] border border-[#292929] rounded-none text-white placeholder-[#ABABAB] focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 resize-none"
                  style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                  placeholder="Spill the tea. What's your email nightmare? How many times have you stared at a blank screen? We're here for the drama."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-white hover:bg-[#FBFBFB] text-[#161616] text-sm font-medium px-8 py-4 rounded-none transition-all duration-200 uppercase tracking-wide h-12 inline-flex items-center justify-center gap-2 group"
                style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
              >
                SEND IT
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
