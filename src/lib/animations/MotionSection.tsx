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
        amount: 0.3,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default MotionSection;
