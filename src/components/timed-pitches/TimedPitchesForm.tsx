import {
  Checkbox,
  Input,
  SegmentedControl,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import {
  Exercise,
  ExerciseTimedPitchesConfig,
  exerciseTimedPitchesConfigSchema,
  notePoolKinds,
} from "@/core/practice-session";
import { useForm, zodResolver } from "@mantine/form";

import { FormButtons } from "@/components/form/FormButtons";
import { z } from "zod";

const formSchemaValues = z.object({
  noteKind: z.enum(notePoolKinds),
  notesRandomize: z.boolean(),
});

const formSchema = formSchemaValues.merge(
  exerciseTimedPitchesConfigSchema.omit({ notes: true }),
);

type FormValues = z.infer<typeof formSchema>;

type TimedPitchesFormProps = {
  data: Extract<Exercise, { type: "timed-pitches" }>;
  onSubmit: (data: Exercise) => void;
  onCancel: () => void;
};

function mapDataToFormValues(data: ExerciseTimedPitchesConfig): FormValues {
  return {
    noteKind: data.notes.kind,
    notesRandomize:
      data.notes.kind === "natural-notes" ? data.notes.randomize : false,
    ...data,
  };
}

function mapFormValuesToData({
  noteKind,
  notesRandomize,
  ...values
}: FormValues): ExerciseTimedPitchesConfig {
  return {
    ...values,
    notes:
      noteKind === "natural-notes"
        ? { kind: noteKind, randomize: notesRandomize }
        : { kind: noteKind },
  };
}

export function TimedPitchesForm({
  data,
  onSubmit,
  onCancel,
}: TimedPitchesFormProps) {
  const form = useForm({
    initialValues: mapDataToFormValues(data.config),
    validate: zodResolver(formSchema),
  });

  const handleSubmit = (formData: FormValues) => {
    onSubmit({
      type: "timed-pitches",
      config: mapFormValuesToData(formData),
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
        <Input.Wrapper
          label="Notes"
          description="The notes that will be displayed during the exercise"
          mb="lg"
          withAsterisk
        >
          <SegmentedControl
            mt="sm"
            color="blue"
            data={[
              { value: "circle-of-fourths", label: "Circle of 4ths" },
              { value: "circle-of-fifths", label: "Circle of 5ths" },
              { value: "natural-notes", label: "Natural Notes" },
            ]}
            key={form.key("noteKind")}
            {...form.getInputProps("noteKind")}
          />
          {form.values.noteKind === "natural-notes" && (
            <Checkbox
              label="Randomize"
              description="Randomize the order of the natural notes from A to G"
              my="md"
              key={form.key("notesRandomize")}
              {...form.getInputProps("notesRandomize")}
            />
          )}
        </Input.Wrapper>
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
