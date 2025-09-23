import { motion, AnimatePresence } from "framer-motion";

type ChallengeTransitionProps = {
  children: React.ReactNode;
  challengeKey: string;
};

export default function ChallengeTransition({
  children,
  challengeKey,
}: ChallengeTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={challengeKey}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
