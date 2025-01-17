import { Milliseconds } from "@/core/base";
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

export type Exercise = ExerciseNoteRecognition | ExerciseScales;

export type ExerciseName = Exercise["type"];
