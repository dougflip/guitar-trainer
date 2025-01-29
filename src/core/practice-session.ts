import { BPM, ZeroToOneHundred } from "@/core/base";

import { notes } from "@/core/notes";
import { shuffle } from "remeda";

export type NotePool = { kind: "circle-of-fourths" };

/**
 * This single exercise will cover all of the existing exercises.
 */
export type ExerciseTimedPitchesConfig = {
  title: string;
  description: string;
  tempo: BPM;
  notes: NotePool;
  beatsPerNote: number;
  numberOfCycles: number;
  metronomeVolume: ZeroToOneHundred;
  pitchVolume: ZeroToOneHundred;
};

export type ExerciseTimedPitches = {
  type: "timed-pitches";
  config: ExerciseTimedPitchesConfig;
};

export type Exercise = ExerciseTimedPitches;

export type PracticeSession = {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
};

export function makePracticeSession(
  overrides: Partial<PracticeSession> = {},
): PracticeSession {
  return {
    id: "",
    title: "",
    description: "",
    exercises: [],
    ...overrides,
  };
}

/**
 * A generator which produces "random" notes, but will not repeat a note until
 * all notes have been used.
 * After all notes are used once, the pool of notes automatically resets to the initial set.
 *
 * NOTE: Currently unused, but keeping for the near future...
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

export function makeTimedPitchesExercise(
  overrides: Partial<ExerciseTimedPitchesConfig> = {},
): ExerciseTimedPitches {
  return {
    type: "timed-pitches",
    config: {
      title: "",
      description: "",
      tempo: 80,
      beatsPerNote: 12,
      numberOfCycles: 1,
      notes: { kind: "circle-of-fourths" },
      metronomeVolume: 50,
      pitchVolume: 50,
      ...overrides,
    },
  };
}
