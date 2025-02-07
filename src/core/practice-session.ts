import { errorMap } from "@/core/utils";
import { notes } from "@/core/notes";
import { shuffle } from "remeda";
import { z } from "zod";

export type NotePool = { kind: "circle-of-fourths" };

export type PracticeSessionOwner = "all" | "mine";

export type PracticeSessionFilters = {
  currentUserId: string;
  owner: PracticeSessionOwner;
};

export const exerciseTimedPitchesConfigSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string(),
  tempo: z
    .number(errorMap("Tempo should be a number between 30 and 200"))
    .int()
    .min(30)
    .max(200),
  beatsPerNote: z
    .number(errorMap("Beats per note should be a number between 1 and 100"))
    .int()
    .positive(),
  numberOfCycles: z
    .number(errorMap("Number of cycles should be a number between 1 and 25"))
    .int()
    .positive(),
  metronomeVolume: z
    .number(errorMap("Volume should be a number between 1 and 100"))
    .int()
    .min(0)
    .max(100),
  pitchVolume: z
    .number(errorMap("Volume should be a number between 1 and 100"))
    .int()
    .min(0)
    .max(100),
  notes: z.object({
    kind: z.literal("circle-of-fourths"),
  }),
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

export type PracticeSession = z.infer<typeof practiceSessionSchema>;

export function makePracticeSession(
  overrides: Partial<PracticeSession> = {},
): PracticeSession {
  return {
    id: -1,
    title: "",
    description: "",
    exercises: [],
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
      notes: { kind: "circle-of-fourths" },
      metronomeVolume: 50,
      pitchVolume: 50,
      ...overrides,
    },
  };
}
