import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface PauseOverlayProps {
  visible: boolean;
  title?: string;
  subtitle?: string;
  cta?: ReactNode;
}

export default function PauseOverlay({ visible, title, subtitle, cta }: PauseOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intermission-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="intermission-overlay__panel"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {title && <h2 className="intermission-overlay__title">{title}</h2>}
            {subtitle && <p className="intermission-overlay__subtitle">{subtitle}</p>}
            {cta && <div className="intermission-overlay__actions">{cta}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
