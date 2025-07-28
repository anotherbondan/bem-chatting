"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Section({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className="md:min-h-screen flex items-center justify-start flex-col px-20 max-md:px-10 max-md:pb-10"
    >
      {children}
    </motion.section>
  );
}
