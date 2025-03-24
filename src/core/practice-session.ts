import { notes } from "@/core/notes";
import { shuffle } from "remeda";
import { z } from "zod";

export type PracticeSessionOwner = "all" | "mine";

export type PracticeSessionFilters = {
  currentUserId: string;
  owner: PracticeSessionOwner;
};

export const notePoolKinds = [
  "circle-of-fourths",
  "circle-of-fifths",
  "natural-notes",
] as const;

export const notePoolSchema = z.union([
  z.object({ kind: z.literal(notePoolKinds[0]) }),
  z.object({ kind: z.literal(notePoolKinds[1]) }),
  z.object({ kind: z.literal(notePoolKinds[2]), randomize: z.boolean() }),
]);

export const exerciseTimedPitchesConfigSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string(),
  tempo: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 30 && val <= 200, {
      message: "Tempo should be a number between 30 and 200",
    }),
  beatsPerNote: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 100, {
      message: "Beats per note should be a number between 1 and 100",
    }),
  numberOfCycles: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 25, {
      message: "Number of cycles should be a number between 1 and 25",
    }),
  metronomeVolume: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0 && val <= 100, {
      message: "Metronome volume should be a number between 0 and 100",
    }),
  pitchVolume: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0 && val <= 100, {
      message: "Pitch volume should be a number between 0 and 100",
    }),
  notePool: notePoolSchema,
});

export const exerciseTimedPitchesSchema = z.object({
  type: z.literal("timed-pitches"),
  config: exerciseTimedPitchesConfigSchema,
});

export const practiceSessionSchema = z.object({
  id: z.number().int(),
  title: z
    .string()
    .nonempty("Title is required")
    .max(100, "Title should be 100 characters or less"),
  exercises: z
    .array(exerciseTimedPitchesSchema)
    .min(1, "At least one exercise is required"),
  description: z
    .string()
    .max(2500, { message: "Description should be 2500 characters or less" }),
});

export type NotePool = z.infer<typeof notePoolSchema>;

/**
 * This single exercise will cover all of the existing exercises.
 */
export type ExerciseTimedPitchesConfig = z.infer<
  typeof exerciseTimedPitchesConfigSchema
>;

export type ExerciseTimedPitches = {
  type: "timed-pitches";
  config: ExerciseTimedPitchesConfig;
};

export type Exercise = ExerciseTimedPitches;

export type PracticeSession = z.infer<typeof practiceSessionSchema> & {
  created_user: string;
};

export function makePracticeSession(
  overrides: Partial<PracticeSession> = {},
): PracticeSession {
  return {
    id: -1,
    title: "",
    description: "",
    exercises: [],
    created_user: "",
    ...overrides,
  };
}

/**
 * A generator which produces "random" notes, but will not repeat a note until
 * all notes have been used.
 * After all notes are used once, the pool of notes automatically resets to the initial set.
 *
 * NOTE: Currently unused, but keeping for the near future...
 */
export function makeNoteGenerator(initialNotes: string[] = [...notes]) {
  let availableNotes: string[] = [];

  return {
    nextNote() {
      if (availableNotes.length === 0) {
        availableNotes = shuffle(initialNotes);
      }

      const [note, ...nextAvailable] = availableNotes;

      availableNotes = nextAvailable;
      return note;
    },
  };
}

export function makeTimedPitchesExercise(
  overrides: Partial<ExerciseTimedPitchesConfig> = {},
): ExerciseTimedPitches {
  return {
    type: "timed-pitches",
    config: {
      title: "",
      description: "",
      tempo: 80,
      beatsPerNote: 12,
      numberOfCycles: 1,
      notePool: { kind: "circle-of-fourths" },
      metronomeVolume: 50,
      pitchVolume: 50,
      ...overrides,
    },
  };
}
