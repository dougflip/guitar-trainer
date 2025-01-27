import { BPM, ZeroToOneHundred } from "@/core/base";

/**
 * This single exercise will cover all of the existing exercises.
 */
export type ExerciseTimedPitchesConfig = {
  title: string;
  description: string;
  tempo: BPM;
  notes: string[];
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
