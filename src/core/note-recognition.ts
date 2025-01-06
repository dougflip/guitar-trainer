import { Milliseconds } from "@/core/base";

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

export function getDefaultNoteRecognitionConfig(): NoteRecognitionConfig {
  return {
    noteDuration: 5,
    playCurrentNote: false,
    noteVolume: 0.5,
    totalDuration: 60,
  };
}
