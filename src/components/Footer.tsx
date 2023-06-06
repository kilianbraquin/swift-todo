"use client";
import { motion } from "framer-motion";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <motion.footer
      layout
      className="absolute inset-x-0 bottom-0 flex justify-center py-2"
    >
      <div className="font-bold">By IndieBaie</div>
    </motion.footer>
  );
};
