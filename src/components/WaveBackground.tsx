// src/components/WaveBackground.tsx
import { motion } from 'framer-motion';

interface WaveBackgroundProps {
  className?: string;
}

const WaveBackground = ({ className }: WaveBackgroundProps) => (
  <div className={`absolute inset-0 overflow-hidden z-0 ${className}`}>
    <svg
      className="absolute w-full h-full"
      viewBox="0 0 1440 800"
      preserveAspectRatio="none"
      style={{
        top: '50%',
        transform: 'translateY(-30%)',
      }}
    >
      <motion.path
        fill="rgba(59, 130, 246, 0.1)"
        d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,234.7C960,235,1056,181,1152,176C1248,171,1344,213,1392,234.7L1440,256L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
        animate={{
          d: [
            "M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,234.7C960,235,1056,181,1152,176C1248,171,1344,213,1392,234.7L1440,256L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z",
            "M0,160L48,181.3C96,203,192,245,288,261.3C384,277,480,267,576,234.7C672,203,768,149,864,128C960,107,1056,117,1152,138.7C1248,160,1344,192,1392,208L1440,224L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z",
          ],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 100,
          ease: "easeInOut",
        }}
      />
    </svg>
  </div>
);

export default WaveBackground;