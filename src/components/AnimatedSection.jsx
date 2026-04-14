import { motion } from 'framer-motion';

export default function AnimatedSection({ children, id, className = "", style }) {
  return (
    <motion.section 
      id={id}
      className={`section ${className}`}
      style={{ perspective: 1000, ...style }}
      initial={{ opacity: 0, rotateX: 10, y: 80, scale: 0.98 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
