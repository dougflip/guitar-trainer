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
 * Returns a random note from the chromatic scale.
 *
 * We'll eventually want options to exclude certain notes, or to limit the range.
 * For example, don't give me any "repeats" until I've exhausted all notes.
 */
export function getRandomNote(): string {
  return notes[Math.floor(Math.random() * notes.length)];
}
