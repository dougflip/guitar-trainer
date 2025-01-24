import { BPM, Milliseconds, ZeroToOneHundred } from "@/core/base";

import { NoteRecognitionConfig } from "@/core/note-recognition";

export type BasicScaleConfig = {
  tempo: Milliseconds;
  totalDuration: Milliseconds;
};

export type ExerciseNoteRecognition = {
  type: "note-recognition";
  config: NoteRecognitionConfig;
};

export type ExerciseScales = {
  type: "scales";
  config: BasicScaleConfig;
};

export type Cycle4Config = {
  tempo: BPM;
  beatsPerNote: number;
  numberOfCycles: number;
  totalDuration: Milliseconds;
};

export type ExerciseCycle4 = {
  type: "cycle4";
  config: Cycle4Config;
};

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

export type Exercise =
  | ExerciseNoteRecognition
  | ExerciseScales
  | ExerciseCycle4
  | ExerciseTimedPitches;

export type ExerciseName = Exercise["type"];
