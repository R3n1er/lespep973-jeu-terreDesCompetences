import type { JobProfile } from "@/types/game";

export const METIERS_ADPEP: JobProfile[] = [
  {
    id: "agent-service-interieur",
    nom: "Agent·e de service intérieur",
    secteur: "général",
    theme: "multiaccueil",
    competences: [
      {
        id: "entretien-locaux",
        libelle: "Assurer l'entretien des locaux",
        type: "spécifique",
      },
      {
        id: "protocoles-hygiene",
        libelle: "Appliquer les protocoles d'hygiène et sécurité",
        type: "spécifique",
      },
      {
        id: "gestion-consommables",
        libelle: "Gérer les stocks et consommables",
        type: "transversale",
      },
      {
        id: "maintenance-premier-niveau",
        libelle: "Maintenance de premier niveau",
        type: "spécifique",
      },
      {
        id: "suivi-traceabilite",
        libelle: "Tracer les interventions et les contrôles",
        type: "transversale",
      },
      {
        id: "collaboration-equipes",
        libelle: "Collaborer avec les équipes éducatives et médicales",
        type: "comportementale",
      },
    ],
  },
  {
    id: "educateur-specialise",
    nom: "Éducateur·rice spécialisé·e",
    secteur: "pédagogique",
    theme: "handicap",
    competences: [
      {
        id: "accompagnement-individualise",
        libelle: "Accompagnement individualisé",
        type: "spécifique",
      },
      {
        id: "projet-personnalise",
        libelle: "Construction de projets personnalisés",
        type: "spécifique",
      },
      {
        id: "coordination-familles",
        libelle: "Coordination avec les familles",
        type: "transversale",
      },
      {
        id: "travail-pluridisciplinaire",
        libelle: "Travail en équipe pluridisciplinaire",
        type: "transversale",
      },
      {
        id: "animation-ateliers",
        libelle: "Animation d'ateliers éducatifs",
        type: "spécifique",
      },
      {
        id: "evaluation-progression",
        libelle: "Évaluation des progressions",
        type: "transversale",
      },
      {
        id: "gestion-situations-crise",
        libelle: "Gestion de situations de crise",
        type: "comportementale",
      },
      {
        id: "inclusion-sociale",
        libelle: "Promotion de l'inclusion sociale",
        type: "comportementale",
      },
    ],
  },
  {
    id: "psychologue",
    nom: "Psychologue",
    secteur: "paramédical",
    theme: "parentalite",
    competences: [
      {
        id: "evaluation-clinique",
        libelle: "Évaluer les besoins psychologiques",
        type: "spécifique",
      },
      {
        id: "soutien-familles",
        libelle: "Proposer un soutien aux familles",
        type: "comportementale",
      },
      {
        id: "entretiens-individuels",
        libelle: "Mener des entretiens individuels",
        type: "spécifique",
      },
      {
        id: "travail-reseau",
        libelle: "Travailler en réseau avec les partenaires",
        type: "transversale",
      },
      {
        id: "analyse-situations",
        libelle: "Analyser les situations complexes",
        type: "comportementale",
      },
      {
        id: "psychoeducation",
        libelle: "Mettre en place des actions de psychoéducation",
        type: "spécifique",
      },
    ],
  },
];

export const JOB_LABELS = METIERS_ADPEP.reduce<Record<string, string>>(
  (acc, job) => {
    acc[job.id] = job.nom;
    return acc;
  },
  {}
);

export const COMPETENCE_LABELS = METIERS_ADPEP.reduce<Record<string, string>>(
  (acc, job) => {
    job.competences.forEach((competence) => {
      acc[competence.id] = competence.libelle;
    });
    return acc;
  },
  {}
);

export function getJobLabel(jobId: string): string {
  return JOB_LABELS[jobId] ?? jobId;
}

export function getCompetenceLabel(competenceId: string): string {
  return COMPETENCE_LABELS[competenceId] ?? competenceId;
}
