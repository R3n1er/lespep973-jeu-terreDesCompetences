export type ChallengeType = "competences-to-metier" | "metier-to-competences";

export type ThemeType =
  | "handicap"
  | "parentalite"
  | "scolarite"
  | "prevention"
  | "protection"
  | "insertion"
  | "mobilite"
  | "multiaccueil"
  | "multimedia";

export interface Competence {
  id: string;
  libelle: string;
  type: "spécifique" | "transversale" | "comportementale";
  description?: string;
}

export interface JobProfile {
  id: string;
  nom: string;
  description?: string;
  secteur:
    | "administratif"
    | "paramédical"
    | "pédagogique"
    | "social"
    | "général";
  competences: Competence[];
}

export interface ChallengeBase {
  id: string;
  type: ChallengeType;
  difficulty: "facile" | "moyen" | "difficile";
  question: string;
  correctAnswers: string[];
  points: number;
  timeLimit?: number;
  theme?: ThemeType;
}

export interface ChallengeCompetencesToMetier extends ChallengeBase {
  type: "competences-to-metier";
  competences: string[];
  options: string[];
}

export interface ChallengeMetierToCompetences extends ChallengeBase {
  type: "metier-to-competences";
  metier: string;
  options: string[];
}

export type Challenge =
  | ChallengeCompetencesToMetier
  | ChallengeMetierToCompetences;

export interface TeamMember {
  id: string;
  nom: string;
  service: string;
  isCapitain?: boolean;
}

export interface Team {
  id: string;
  nom: string;
  membres: TeamMember[];
}

export interface GameConfiguration {
  duration: number;
  teamsCount: number;
  rotationTime: number;
  challengesPerRound: number;
  difficultyProgression: boolean;
}

export interface GameState {
  phase: "setup" | "playing" | "rotation" | "finished" | "bonus";
  currentTeamIndex: number;
  currentChallenge: Challenge | null;
  challengeIndex: number;
  currentTheme: ThemeType;
  score: ScoreData;
  responses: ChallengeResponse[];
}

export interface GameTimerState {
  phase: "team" | "intermission" | "finished";
  timeRemaining: number;
  isRunning: boolean;
  lastUpdate: number;
  currentTeamIndex: number;
  alerts: {
    thirtySeconds: boolean;
    tenSeconds: boolean;
    fiveSeconds: boolean;
  };
  countdownMode: "none" | "visual" | "audio-visual";
}

export interface ChallengeResponse {
  challengeId: string;
  teamId: string;
  selectedOptions: string[];
  timeSpent: number;
  isCorrect: boolean;
  pointsEarned: number;
  timestamp: number;
}

export interface ScoreData {
  teamScores: Record<string, number>;
  globalScore: number;
  correctAnswers: number;
  totalChallenges: number;
  streak: number;
}
