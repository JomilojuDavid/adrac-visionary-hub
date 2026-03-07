"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  variant?: any;
}

const MotionSection = ({
  children,
  className,
  variant,
}: MotionSectionProps) => {
  return (
    <motion.section
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.2,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default MotionSection;
