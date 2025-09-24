import type { Challenge } from "@/types/game";

export const CHALLENGES_CONFIGURATION: Challenge[] = [
  {
    id: "challenge-1",
    type: "competences-to-metier",
    difficulty: "facile",
    question: "À quel métier correspondent ces compétences ?",
    competences: [
      "entretien-locaux",
      "protocoles-hygiene",
      "gestion-consommables",
    ],
    options: ["agent-service-interieur", "educateur-specialise", "psychologue"],
    correctAnswers: ["agent-service-interieur"],
    points: 100,
    theme: "multiaccueil",
  },
  {
    id: "challenge-2",
    type: "metier-to-competences",
    difficulty: "moyen",
    question: "Sélectionnez les 6 compétences clés pour ce métier",
    metier: "educateur-specialise",
    options: [
      "accompagnement-individualise",
      "projet-personnalise",
      "coordination-familles",
      "travail-pluridisciplinaire",
      "animation-ateliers",
      "evaluation-progression",
      "gestion-situations-crise",
      "inclusion-sociale",
      "maintenance-premier-niveau",
      "entretien-locaux",
    ],
    correctAnswers: [
      "accompagnement-individualise",
      "projet-personnalise",
      "coordination-familles",
      "travail-pluridisciplinaire",
      "animation-ateliers",
      "evaluation-progression",
    ],
    points: 120,
    theme: "handicap",
  },
];
