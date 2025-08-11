import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-netflix-bg">
      <div className="w-16 h-16 border-4 border-netflix-red border-t-transparent rounded-full animate-spin shadow-glow" aria-label="Loading" />
    </div>
  );
}