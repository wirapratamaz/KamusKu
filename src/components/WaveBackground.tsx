// src/components/WaveBackground.tsx

'use client'

import { motion } from 'framer-motion';

interface WaveBackgroundProps {
    className?: string;
}

const WaveBackground = ({  }: WaveBackgroundProps) => (
    <div className="absolute inset-0 overflow-hidden z-0">
    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <motion.path
        fill="rgba(59, 130, 246, 0.1)"
        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        animate={{
          d: [
            "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            "M0,64L48,85.3C96,107,192,149,288,160C384,171,480,149,576,149.3C672,149,768,171,864,176C960,181,1056,171,1152,176C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
          ],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 30,
          ease: "easeInOut",
        }}
      />
    </svg>
  </div>
);

export default WaveBackground;