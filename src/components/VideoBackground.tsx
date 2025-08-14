import React from 'react';
import { motion } from 'framer-motion';

interface VideoBackgroundProps {
  videoUrl: string;
  overlay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoUrl,
  overlay = true,
  className = '',
  children,
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      
      {overlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/60"
        />
      )}
      
      {children && (
        <div className="relative z-10 h-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default VideoBackground;