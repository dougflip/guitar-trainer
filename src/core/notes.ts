/**
 * Notes in the chromatic scale.
 *
 * Not sure if this is the best way to represent this yet, but we'll start here.
 * Should we include enharmonic equivalents? (e.g. "Bb" and "A#")
 */
export const notes: Readonly<string[]> = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];

/**
 * Frequencies of notes in the chromatic scale.
 * A4 is set to 440 Hz, and other notes are calculated relative to it.
 */
export const noteFrequencies: Readonly<{ [note: string]: number }> = {
  A: 440,
  "A#": 466.16,
  Bb: 466.16,
  B: 493.88,
  C: 261.63,
  "C#": 277.18,
  Db: 277.18,
  D: 293.66,
  "D#": 311.13,
  Eb: 311.13,
  E: 329.63,
  F: 349.23,
  "F#": 369.99,
  Gb: 369.99,
  G: 392.0,
  "G#": 415.3,
  Ab: 415.3,
};

/**
 * The circle of fourths in a list starting at C natural.
 */
export const cycle4Notes: Readonly<string[]> = [
  "C",
  "F",
  "Bb",
  "Eb",
  "Ab",
  "Db",
  "Gb",
  "B",
  "E",
  "A",
  "D",
  "G",
];

/**
 * The circle of fifths in a list starting at C natural.
 */
export const cycle5Notes: Readonly<string[]> = [
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "F#",
  "C#",
  "G#",
  "D#",
  "A#",
  "F",
];

/**
 * The natural notes starting at C (no sharps or flats).
 */
export const naturalNotes: Readonly<string[]> = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
];

/**
 * Returns a random note from the chromatic scale.
 *
 * We'll eventually want options to exclude certain notes, or to limit the range.
 * For example, don't give me any "repeats" until I've exhausted all notes.
 */
export function getRandomNote(): string {
  return notes[Math.floor(Math.random() * notes.length)];
}
