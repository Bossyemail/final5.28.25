import { useState } from 'react';
import EmailGeneratorShowcase from './EmailGeneratorShowcase';
import { motion } from 'framer-motion';
import { TemplateLibraryPreviewHero, FavoritesPreviewHero } from './EmailGeneratorShowcase';

export default function EmailGeneratorShowcaseTabs() {
  // Accent colors for blobs (expanded)
  const accentColors = [
    '#EFE1E1', // light pink
    '#F0D2DA', // blush
    '#E0C1C6', // soft mauve
    'var(--accent-1)', // lavender
    '#CBC4D6', // pastel purple
    '#B6D6E8', // soft blue
    '#F7E6C4', // pastel peach
    '#C7EAD9', // mint
    '#F9D6E2', // light rose
    '#F6F3D6', // pale yellow
  ];
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Card Container */}
      <div className="w-full">
        <div className="h-[360px] relative flex items-center justify-center">
          <EmailGeneratorShowcase />
        </div>
      </div>
    </div>
  );
} 