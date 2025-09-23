import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AnswerFeedbackProps = {
  visible: boolean;
  isCorrect: boolean;
  pointsEarned: number;
  onComplete: () => void;
};

export default function AnswerFeedback({
  visible,
  isCorrect,
  pointsEarned,
  onComplete,
}: AnswerFeedbackProps) {
  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(onComplete, 1500);
    return () => clearTimeout(timeout);
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`rounded-2xl p-8 text-center shadow-2xl ${
              isCorrect ? "bg-green-500 text-white" : "bg-orange-500 text-white"
            }`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-3">
              {isCorrect ? "Bravo !" : "Presque !"}
            </h3>
            <p className="text-lg">
              {isCorrect ? "Réponse correcte" : "Réponse partielle"}
            </p>
            <p className="text-2xl font-semibold mt-4">+{pointsEarned} pts</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
