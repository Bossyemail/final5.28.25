"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, FileText, Clock, AlertCircle, Users, ArrowRight, HelpCircle, Heart } from "lucide-react"
import { useState, useRef } from "react"

const tabs = [
  { 
    id: 'docs', 
    label: 'Docs', 
    icon: FileText, 
    description: 'Chasing documents, handling requests, and keeping paperwork organized throughout the transaction.'
  },
  { 
    id: 'timeline', 
    label: 'Timeline', 
    icon: Clock, 
    description: 'Clarifying deadlines, explaining delays, and keeping everyone on track with critical dates.'
  },
  { 
    id: 'fire', 
    label: 'Fire', 
    icon: AlertCircle, 
    description: 'Handling urgent issues, putting out fires, and managing crisis situations that threaten deals.'
  },
  { 
    id: 'update', 
    label: 'Update', 
    icon: Users, 
    description: 'Updating lenders, HOA, attorneys, and coordinating with all parties involved in the transaction.'
  },
  { 
    id: 'offer', 
    label: 'Offer', 
    icon: Mail, 
    description: 'Writing compelling offer emails that get taken seriously and stand out in competitive markets.'
  },
  { 
    id: 'delay', 
    label: 'Delay', 
    icon: Clock, 
    description: 'Explaining delays professionally, managing expectations, and keeping clients informed without panic.'
  },
  { 
    id: 'calm', 
    label: 'Calm', 
    icon: Heart, 
    description: 'Calming anxious clients, managing emotions, and maintaining relationships during stressful moments.'
  },
  { 
    id: 'fix', 
    label: 'Fix', 
    icon: HelpCircle, 
    description: 'Fixing misunderstandings, clarifying confusion, and ensuring everyone is on the same page.'
  },
  { 
    id: 'followup', 
    label: 'Follow Up', 
    icon: ArrowRight, 
    description: 'Following up on pending items, checking in with parties, and ensuring nothing falls through the cracks.'
  }
]

export function Why() {
  const [activeTab, setActiveTab] = useState('fire')
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Subtle opacity fade on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5])

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0]

  return (
    <motion.section 
      ref={sectionRef}
      id="why" 
      className="w-full py-16 md:py-24 text-black dark:text-white bg-white dark:bg-[#161616] relative transition-colors"
      style={{
        opacity: opacity
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-[#ABABAB] dark:text-[#ABABAB] uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
            THE PROBLEM
          </p>
          <h2 className="display-6 sm:display-7 md:display-8 mb-6 text-black dark:text-white" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
            Deals Don't Fall Apart Because of Contracts.
            <br />
            They Fall Apart Because of Communication.
          </h2>
          <div className="max-w-4xl mx-auto mb-12">
            <p className="paragraph-default text-[#505050] dark:text-[#ABABAB] mb-6" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
              You've sat in this loop:
            </p>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-6">
              {/* Left Column - Questions */}
              <div className="space-y-3">
                <p className="paragraph-default text-[#505050] dark:text-[#ABABAB]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                  "Did you get this?"
                </p>
                <p className="paragraph-default text-[#505050] dark:text-[#ABABAB]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                  "Can you confirm?"
                </p>
                <p className="paragraph-default text-[#505050] dark:text-[#ABABAB]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                  "Please advise…"
                </p>
              </div>
              {/* Right Column - Consequences */}
              <div className="space-y-3">
                <p className="paragraph-default text-[#505050] dark:text-[#ABABAB]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                  Each one takes time you don't bill for.
                </p>
                <p className="paragraph-default text-[#505050] dark:text-[#ABABAB]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                  Each one introduces uncertainty.
                </p>
                <p className="paragraph-default text-[#505050] dark:text-[#ABABAB]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                  Each one delays the deal.
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-1 text-center">
              <p className="paragraph-default text-[#161616] dark:text-white font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em', fontWeight: 500 }}>
                You know this problem.
              </p>
              <p className="paragraph-default text-[#161616] dark:text-white font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em', fontWeight: 500 }}>
                Now let's fix it.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content Container - 3 Column Grid */}
        <motion.div 
          className="bg-white dark:bg-[#1a1a1a]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column - Icons in 3 columns grid */}
            <div className="grid grid-cols-3 gap-1.5">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                const TabIcon = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`px-2 py-2.5 transition-all duration-300 flex flex-col items-center justify-center gap-1.5 border rounded-none ${
                      isActive
                        ? 'bg-[#FBFBFB] dark:bg-[#292929] border-[#161616] dark:border-white'
                        : 'bg-white dark:bg-[#1a1a1a] border-[#E3E3E3] dark:border-[#292929] hover:border-[#ABABAB] dark:hover:border-[#505050]'
                    }`}
                    style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <TabIcon 
                      className={`w-4 h-4 ${isActive ? 'text-[#161616] dark:text-white' : 'text-[#ABABAB] dark:text-[#ABABAB]'}`} 
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                    <span className={`text-xs font-medium ${isActive ? 'text-[#161616] dark:text-white' : 'text-[#ABABAB] dark:text-[#ABABAB]'}`}>
                      {tab.label}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            {/* Right Column - Text Description for Selected Item */}
            <div>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Selected Item Description */}
                <div>
                  <p className="paragraph-large text-[#505050] dark:text-[#ABABAB]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.6em' }}>
                    {activeTabData.description}
                  </p>
                </div>
                
                {/* Closing Statement */}
                <div className="pt-6 border-t border-[#E3E3E3] dark:border-[#292929] space-y-2">
                  <p className="paragraph-default text-[#505050] dark:text-[#ABABAB]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                    Nobody teaches agents how to write.
                  </p>
                  <p className="display-5 text-[#161616] dark:text-white font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
                    BossyEmail does.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
} 