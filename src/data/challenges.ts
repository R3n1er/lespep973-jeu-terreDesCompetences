import type { Challenge } from '@/types/game'

export const CHALLENGES_CONFIGURATION: Challenge[] = [
  {
    id: 'challenge-1',
    type: 'competences-to-metier',
    difficulty: 'facile',
    question: 'À quel métier correspondent ces compétences ?',
    competences: ['entretien-locaux', 'protocoles-hygiene'],
    options: ['agent-service-interieur'],
    correctAnswers: ['agent-service-interieur'],
    points: 100,
  },
]

