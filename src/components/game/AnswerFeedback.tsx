import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type AnswerFeedbackDetails = {
  visible: boolean;
  isCorrect: boolean;
  points: number;
  correctMatches: number;
  incorrectMatches: number;
  total: number;
};

type AnswerFeedbackProps = {
  visible: boolean;
  isCorrect: boolean;
  pointsEarned: number;
  details: AnswerFeedbackDetails;
  onComplete: () => void;
};

export default function AnswerFeedback({ visible, isCorrect, pointsEarned, details, onComplete }: AnswerFeedbackProps) {
  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(onComplete, 2000);
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
            className={`rounded-2xl p-8 text-center shadow-2xl ${isCorrect ? "bg-green-500 text-white" : "bg-orange-500 text-white"}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-3">{isCorrect ? "Bravo !" : "Bon effort"}</h3>
            <p className="text-lg">
              {isCorrect
                ? "Toutes les bonnes compétences ont été sélectionnées."
                : `Vous avez identifié ${details.correctMatches}/${details.total} bonnes compétences.`}
            </p>
            {details.incorrectMatches > 0 && (
              <p className="text-sm mt-2 opacity-90">
                {details.incorrectMatches} sélection(s) incorrecte(s) retirées.
              </p>
            )}
            <p className="text-2xl font-semibold mt-4">+{pointsEarned} pts</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
