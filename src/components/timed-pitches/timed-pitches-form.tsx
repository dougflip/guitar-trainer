import { Exercise, ExerciseTimedPitchesConfig } from "@/core/exercises";
import { TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

import { FormButtons } from "@/components/form/form-buttons";
import { z } from "zod";

type TimedPitchesFormProps = {
  data: Extract<Exercise, { type: "timed-pitches" }>;
  onSubmit: (data: Exercise) => void;
  onCancel: () => void;
};

const schema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title is required" })
    .max(50, { message: "Title should have at most 50 letters" }),
  tempo: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .refine((val) => !isNaN(val) && val >= 30, {
      message: "Tempo must be 30 BPM or higher",
    }),
  numberOfCycles: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 100, {
      message: "Number of cycles must be between 1 and 100",
    }),
  beatsPerNote: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 100, {
      message: "Beats per note must be between 1 and 100",
    }),
  description: z
    .string()
    .max(2000, { message: "Description should have at most 2000 letters" }),
});

export function TimedPitchesForm({
  data,
  onSubmit,
  onCancel,
}: TimedPitchesFormProps) {
  const form = useForm({
    initialValues: { ...data.config },
    validate: zodResolver(schema),
  });

  const handleSubmit = (formData: ExerciseTimedPitchesConfig) => {
    onSubmit({
      type: "timed-pitches",
      config: {
        ...data.config,
        ...formData,
      },
    });
  };

  return (
    <div>
      <h2>Create an exercise</h2>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Title"
          description="A short title to identify the exercise"
          placeholder="Triads on strings 2, 3, 4."
          mb="lg"
          key={form.key("title")}
          {...form.getInputProps("title")}
        />
        <TextInput
          withAsterisk
          label="Tempo (BPM)"
          type="number"
          mb="lg"
          key={form.key("tempo")}
          {...form.getInputProps("tempo")}
        />
        <TextInput
          withAsterisk
          label="Number of cycles"
          description="How many times we'll cycle through the notes"
          type="number"
          mb="lg"
          key={form.key("numberOfCycles")}
          {...form.getInputProps("numberOfCycles")}
        />
        <TextInput
          withAsterisk
          label="Beats per note"
          description="How many beats between switching notes"
          type="number"
          mb="lg"
          key={form.key("beatsPerNote")}
          {...form.getInputProps("beatsPerNote")}
        />
        <Textarea
          label="Description"
          description="A more detailed description of the exercise"
          rows={4}
          mb="lg"
          key={form.key("description")}
          {...form.getInputProps("description")}
        />
        <FormButtons onCancel={onCancel} />
      </form>
    </div>
  );
}
