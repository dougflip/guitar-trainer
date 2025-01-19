import {
  BasicScaleConfig,
  Exercise,
  ExerciseName,
  ExerciseNoteRecognition,
  ExerciseScales,
} from "@/core/exercises";

import { Milliseconds } from "@/core/base";
import { notes } from "@/core/notes";
import { shuffle } from "remeda";

export type NoteRecognitionConfig = {
  noteDuration: Milliseconds;
  playCurrentNote: boolean;
  noteVolume: number;
  // TODO: Will this be common to all modules?
  totalDuration: Milliseconds;

  // can eventually customize notes - use a checkbox of all notes? dropdown of groupings?
  // notes: "all" | "natural" | "flats" | "sharps" | "enharmonics";
  // play the current pitch - the entire duration? just once? or not at all?
  // playCurrentNote: "full-duration" | "once" | "off";
};

export function getDefaultNoteRecognitionExercise(
  overrides: Partial<NoteRecognitionConfig> = {},
): ExerciseNoteRecognition {
  return {
    type: "note-recognition",
    config: {
      noteDuration: 5,
      playCurrentNote: false,
      noteVolume: 0.5,
      totalDuration: 60,
      ...overrides,
    },
  };
}

export function getDefaultScaleExercise(
  overrides: Partial<BasicScaleConfig> = {},
): ExerciseScales {
  return {
    type: "scales",
    config: {
      tempo: 80,
      totalDuration: 60,
      ...overrides,
    },
  };
}

export function getDefaultExercise(type: ExerciseName): Exercise {
  switch (type) {
    case "note-recognition":
      return getDefaultNoteRecognitionExercise();
    case "scales":
      return getDefaultScaleExercise();
    default:
      throw new Error(`Unknown exercise type: ${type satisfies never}`);
  }
}

/**
 * A generator which produces "random" notes, but will not repeat a note until
 * all notes have been used.
 * After all notes are used once, the pool of notes automatically resets to the initial set.
 */
export function makeNoteGenerator(initialNotes: string[] = [...notes]) {
  let availableNotes: string[] = [];

  return {
    nextNote() {
      if (availableNotes.length === 0) {
        availableNotes = shuffle(initialNotes);
      }

      const [note, ...nextAvailable] = availableNotes;

      availableNotes = nextAvailable;
      return note;
    },
  };
}
