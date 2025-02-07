import {
  Exercise,
  ExerciseTimedPitchesConfig,
  exerciseTimedPitchesConfigSchema,
} from "@/core/practice-session";
import { TextInput, Textarea, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

import { FormButtons } from "@/components/form/FormButtons";

type TimedPitchesFormProps = {
  data: Extract<Exercise, { type: "timed-pitches" }>;
  onSubmit: (data: Exercise) => void;
  onCancel: () => void;
};

export function TimedPitchesForm({
  data,
  onSubmit,
  onCancel,
}: TimedPitchesFormProps) {
  const form = useForm({
    initialValues: { ...data.config },
    validate: zodResolver(exerciseTimedPitchesConfigSchema),
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
      <Title order={2}>Add an exercise</Title>
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
