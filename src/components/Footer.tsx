"use client";
import { motion } from "framer-motion";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <motion.footer
      layout
      className="absolute bottom-0 inset-x-0 flex justify-center py-2"
    >
      <div className="font-bold">By IndieBaie</div>
    </motion.footer>
  );
};
