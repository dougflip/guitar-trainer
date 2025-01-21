import { BPM, Milliseconds } from "@/core/base";

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

export type Exercise =
  | ExerciseNoteRecognition
  | ExerciseScales
  | ExerciseCycle4;

export type ExerciseName = Exercise["type"];
