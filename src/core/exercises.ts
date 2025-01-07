import { Milliseconds } from "@/core/base";
import { NoteRecognitionConfig } from "@/core/note-recognition";

export type BasicScaleConfig = {
  tempo: Milliseconds;
  totalDuration: Milliseconds;
};

export type Exercise =
  | {
      type: "note-recognition";
      config: NoteRecognitionConfig;
    }
  | { type: "scales"; config: BasicScaleConfig };

export type ExerciseName = Exercise["type"];
