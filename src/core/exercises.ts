import { NoteRecognitionConfig } from "@/core/note-recognition";

export type Exercise = {
  type: "note-recognition";
  config: NoteRecognitionConfig;
};
