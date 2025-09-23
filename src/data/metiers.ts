import type { JobProfile } from '@/types/game'

export const METIERS_ADPEP: JobProfile[] = [
  {
    id: 'agent-service-interieur',
    nom: 'Agent/Agente de service intérieur',
    secteur: 'général',
    competences: [
      { id: 'entretien-locaux', libelle: "Assurer l'entretien des locaux", type: 'spécifique' },
      { id: 'protocoles-hygiene', libelle: "Appliquer les protocoles d'hygiène et sécurité", type: 'spécifique' },
    ],
  },
]

