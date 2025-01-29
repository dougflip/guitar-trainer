import { Exercise, NotePool, PracticeSession } from "@/core/practice-session";
import { Minutes, Seconds } from "@/core/base";

import { cycle4Notes } from "@/core/notes";

export function getNoteCount(notes: NotePool): number {
  switch (notes.kind) {
    case "circle-of-fourths":
      return cycle4Notes.length;
  }
}

export function secondsToMinutes(seconds: Seconds): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

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

export function getTimeForSingleExercise({ config }: Exercise): Seconds {
  const oneNoteLength = (60 / config.tempo) * config.beatsPerNote;
  return oneNoteLength * getNoteCount(config.notes) * config.numberOfCycles;
}

export function getTimeForPracticeSession({
  exercises,
}: PracticeSession): Seconds {
  return exercises.reduce(
    (totalTime, exercise) => totalTime + getTimeForSingleExercise(exercise),
    0,
  );
}
