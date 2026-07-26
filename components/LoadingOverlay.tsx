'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  title?: string;
  subtitle?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  title = 'Synthesizing Book...',
  subtitle = 'Processing PDF and setting up voice assistant',
}) => {
  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper bg-white shadow-2xl border border-[var(--border-subtle)]">
        <div className="loading-shadow">
          <Loader2 className="loading-animation w-12 h-12 text-[#663820]" />
          <div className="text-center space-y-2">
            <h3 className="loading-title font-serif">{title}</h3>
            {subtitle && (
              <p className="text-[#3d485e] text-sm font-sans">{subtitle}</p>
            )}
          </div>
          <div className="loading-progress">
            <div className="loading-progress-item">
              <span className="loading-progress-status" />
              <span className="text-[#3d485e]">Analyzing content & preparing voice...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
