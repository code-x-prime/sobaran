"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Subtle fade between routes. Opacity only: a transform here would become the containing
 * block for the fixed header and shift it during the transition.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
