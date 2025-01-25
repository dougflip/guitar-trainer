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

export type TrainingSession = {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
};

export function makeTrainingSession(
  overrides: Partial<TrainingSession> = {},
): TrainingSession {
  return {
    id: "",
    title: "",
    description: "",
    exercises: [],
    ...overrides,
  };
}
