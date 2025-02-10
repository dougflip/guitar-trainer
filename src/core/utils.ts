import { Exercise, NotePool, PracticeSession } from "@/core/practice-session";
import { Minutes, Seconds } from "@/core/base";
import { cycle4Notes, cycle5Notes } from "@/core/notes";

/**
 * Returns the number of notes in a note pool.
 */
export function getNoteCount(notes: NotePool): number {
  switch (notes.kind) {
    case "circle-of-fourths":
      return cycle4Notes.length;
    case "circle-of-fifths":
      return cycle5Notes.length;
  }
}

/**
 * Gets a pool of notes based on type
 */
export function getNotePool(notes: NotePool): Readonly<string[]> {
  switch (notes.kind) {
    case "circle-of-fourths":
      return cycle4Notes;
    case "circle-of-fifths":
      return cycle5Notes;
  }
}

/**
 * Formats minutes and seconds into a human-readable string.
 */
function formatMinutesAndSeconds(
  minutes: Minutes,
  seconds: Seconds = 0,
): string {
  return minutes > 0 && seconds > 0
    ? `${minutes}m ${seconds}s`
    : minutes > 0
      ? `${minutes}m`
      : `${seconds}s`;
}

/**
 * Returns a human-readable string for the approximate time in minutes.
 * "Approximate" means to the nearest quarter minute.
 */
export function secondsToApproximateMinutes(seconds: Seconds): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Round remaining seconds to nearest quarter minute
  if (remainingSeconds >= 52.5) {
    return formatMinutesAndSeconds(minutes + 1);
  }
  if (remainingSeconds >= 37.5) {
    return formatMinutesAndSeconds(minutes, 45);
  }
  if (remainingSeconds >= 22.5) {
    return formatMinutesAndSeconds(minutes, 30);
  }
  if (remainingSeconds >= 7.5) {
    return formatMinutesAndSeconds(minutes, 15);
  }

  return formatMinutesAndSeconds(minutes);
}

/**
 * Returns the approximate time in seconds for a single exercise.
 */
export function getTimeForSingleExercise({ config }: Exercise): Seconds {
  const oneNoteLength = (60 / config.tempo) * config.beatsPerNote;
  return oneNoteLength * getNoteCount(config.notes) * config.numberOfCycles;
}

/**
 * Returns the approximate time in seconds for a practice session.
 * This is the sum of the time for each exercise.
 */
export function getTimeForPracticeSession({
  exercises,
}: PracticeSession): Seconds {
  return exercises.reduce(
    (totalTime, exercise) => totalTime + getTimeForSingleExercise(exercise),
    0,
  );
}

/**
 *
 * Helper to generate a basic error map for Zod.
 * Saves some typing for the most common case.
 */
export function errorMap(message: string) {
  return {
    errorMap: () => ({ message }),
  };
}
