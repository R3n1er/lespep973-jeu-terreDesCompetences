import type { Challenge, ThemeType } from "@/types/game";
import { METIERS_ADPEP } from "@/data/metiers";

const JOB_THEME_MAP = new Map<string, ThemeType>();
for (const job of METIERS_ADPEP) {
  if (job.theme) {
    JOB_THEME_MAP.set(job.id, job.theme);
  }
}

const DEFAULT_THEME: ThemeType = "scolarite";

function resolveThemeFromJob(jobId?: string): ThemeType | undefined {
  if (!jobId) {
    return undefined;
  }
  return JOB_THEME_MAP.get(jobId);
}

export function resolveThemeForChallenge(
  challenge: Challenge | null,
  fallbackTheme: ThemeType = DEFAULT_THEME
): ThemeType {
  if (!challenge) {
    return fallbackTheme;
  }

  if (challenge.theme) {
    return challenge.theme;
  }

  if (challenge.type === "metier-to-competences") {
    const explicit = resolveThemeFromJob(challenge.metier);
    if (explicit) {
      return explicit;
    }
  }

  if (challenge.type === "competences-to-metier") {
    const preferredAnswer = challenge.correctAnswers?.[0];
    const jobTheme = resolveThemeFromJob(preferredAnswer);
    if (jobTheme) {
      return jobTheme;
    }

    const firstOptionTheme = challenge.options
      .map((optionId) => resolveThemeFromJob(optionId))
      .find((theme): theme is ThemeType => Boolean(theme));
    if (firstOptionTheme) {
      return firstOptionTheme;
    }
  }

  return fallbackTheme;
}

export function resolveThemeForJob(jobId?: string, fallbackTheme: ThemeType = DEFAULT_THEME): ThemeType {
  return resolveThemeFromJob(jobId) ?? fallbackTheme;
}
