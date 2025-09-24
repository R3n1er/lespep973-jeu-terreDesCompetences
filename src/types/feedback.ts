export type AnswerFeedbackProps = {
  visible: boolean;
  isCorrect: boolean;
  pointsEarned: number;
  correctMatches: number;
  incorrectMatches: number;
  total: number;
  onComplete: () => void;
};
