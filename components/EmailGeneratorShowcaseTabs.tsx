import { useState } from 'react';
import EmailGeneratorShowcase from './EmailGeneratorShowcase';
import { motion } from 'framer-motion';
import { TemplateLibraryPreviewHero, FavoritesPreviewHero } from './EmailGeneratorShowcase';

export default function EmailGeneratorShowcaseTabs() {
  const [activeTab, setActiveTab] = useState(0);
  // Accent colors for blobs (expanded)
  const accentColors = [
    '#EFE1E1', // light pink
    '#F0D2DA', // blush
    '#E0C1C6', // soft mauve
    '#D1B4C6', // lavender
    '#CBC4D6', // pastel purple
    '#B6D6E8', // soft blue
    '#F7E6C4', // pastel peach
    '#C7EAD9', // mint
    '#F9D6E2', // light rose
    '#F6F3D6', // pale yellow
  ];
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-zinc-200 mb-6">
        <button className={`flex-1 px-0 py-2 text-sm font-medium border-b-2 focus:outline-none ${activeTab === 0 ? 'border-black text-black' : 'border-transparent text-zinc-400'}`} onClick={() => setActiveTab(0)}>Smart Email Generator</button>
        <button className={`flex-1 px-0 py-2 text-sm font-medium border-b-2 focus:outline-none ${activeTab === 1 ? 'border-black text-black' : 'border-transparent text-zinc-400'}`} onClick={() => setActiveTab(1)}>Time-Saving Templates</button>
        <button className={`flex-1 px-0 py-2 text-sm font-medium border-b-2 focus:outline-none ${activeTab === 2 ? 'border-black text-black' : 'border-transparent text-zinc-400'}`} onClick={() => setActiveTab(2)}>Favorites</button>
      </div>
      {/* Card Container */}
      <div className="w-full">
        {activeTab === 0 ? (
          <div className="h-[360px] relative flex items-center justify-center">
            {/* Animated Accent Blobs (more, varied) */}
            <motion.div
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              aria-hidden="true"
            >
              {/* Main accent blobs */}
              <motion.div
                className="absolute top-6 left-2 w-40 h-40 rounded-full blur-2xl opacity-60"
                style={{ background: accentColors[0] }}
                animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-24 right-0 w-32 h-32 rounded-full blur-2xl opacity-50"
                style={{ background: accentColors[1] }}
                animate={{ y: [0, -18, 0], x: [0, -12, 0] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-2 left-16 w-28 h-28 rounded-full blur-2xl opacity-40"
                style={{ background: accentColors[2] }}
                animate={{ y: [0, 16, 0], x: [0, -8, 0] }}
                transition={{ duration: 9, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-8 right-10 w-36 h-36 rounded-full blur-2xl opacity-50"
                style={{ background: accentColors[3] }}
                animate={{ y: [0, -12, 0], x: [0, 14, 0] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full blur-2xl opacity-30"
                style={{ background: accentColors[4], transform: 'translate(-50%, -50%)' }}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 30, 0] }}
                transition={{ duration: 11, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              />
              {/* Extra blobs for more color and vibrancy */}
              <motion.div
                className="absolute top-10 left-1/3 w-24 h-24 rounded-full blur-2xl opacity-40"
                style={{ background: accentColors[5] }}
                animate={{ y: [0, 10, 0], x: [0, 18, 0] }}
                transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-10 right-1/4 w-20 h-20 rounded-full blur-2xl opacity-35"
                style={{ background: accentColors[6] }}
                animate={{ y: [0, -8, 0], x: [0, -16, 0] }}
                transition={{ duration: 13, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-1/4 right-1/3 w-16 h-16 rounded-full blur-2xl opacity-30"
                style={{ background: accentColors[7] }}
                animate={{ y: [0, 12, 0], x: [0, 10, 0] }}
                transition={{ duration: 14, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-1/3 left-1/4 w-20 h-20 rounded-full blur-2xl opacity-30"
                style={{ background: accentColors[8] }}
                animate={{ y: [0, -10, 0], x: [0, 12, 0] }}
                transition={{ duration: 15, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-1/3 right-10 w-16 h-16 rounded-full blur-2xl opacity-25"
                style={{ background: accentColors[9] }}
                animate={{ y: [0, 8, 0], x: [0, -8, 0] }}
                transition={{ duration: 16, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              />
            </motion.div>
            {/* Showcase Card (on top of blobs) */}
            <div className="relative z-10">
              <EmailGeneratorShowcase />
            </div>
          </div>
        ) : activeTab === 1 ? (
          <TemplateLibraryPreviewHero />
        ) : (
          <FavoritesPreviewHero />
        )}
      </div>
    </div>
  );
} 