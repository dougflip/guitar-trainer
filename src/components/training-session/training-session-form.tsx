import { Button, Stack, Text, TextInput, Textarea, Title } from "@mantine/core";
import { Exercise, ExerciseTimedPitches } from "@/core/training-session";
import { ReactNode, useState } from "react";

import { DataListItem } from "@/components/data-list-item/DataListItem";
import { FormButtons } from "@/components/form/form-buttons";
import { TimedPitchesForm } from "@/components/timed-pitches/timed-pitches-form";
import { TrainingSession } from "@/core/training-session";
import { getDefaultTimedPitchesExercise } from "@/core/note-recognition";
import { useForm } from "@mantine/form";

type TrainingSessionFormProps = {
  data: TrainingSession;
  onSubmit: (data: TrainingSession) => void;
  onCancel: () => void;
};

type ScreenState =
  | { kind: "form" }
  | {
      kind: "exercise-edit";
      exercise: ExerciseTimedPitches;
      editIndex?: number;
    };

function getExerciseListProps(exercise: Exercise): {
  title: ReactNode;
  description: ReactNode;
} {
  return {
    title: exercise.config.title,
    description: `${exercise.config.tempo} BPM for ${exercise.config.numberOfCycles} ${exercise.config.numberOfCycles === 1 ? "cycle" : "cycles"}`,
  };
}

export function TrainingSessionForm({
  data,
  onSubmit,
  onCancel,
}: TrainingSessionFormProps) {
  const [screenState, setScreenState] = useState<ScreenState>({ kind: "form" });
  const form = useForm({ initialValues: data });

  function handleExerciseSubmit(exercise: Exercise, editIndex: number | null) {
    if (editIndex !== null) {
      form.replaceListItem("exercises", editIndex, exercise);
    } else {
      form.insertListItem("exercises", exercise);
    }
    setScreenState({ kind: "form" });
  }

  function handleSubmit(formData: TrainingSession) {
    onSubmit({ ...data, ...formData });
  }

  const exercises = form.getValues().exercises;

  return (
    <>
      {screenState.kind === "form" && (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Title order={2}>Create a Training Session</Title>
          <p>
            A training session is a collection of exercises which help you
            practice a specific skill.
          </p>
          <TextInput
            withAsterisk
            label="Title"
            description="The title of the training session"
            mb="lg"
            key={form.key("title")}
            {...form.getInputProps("title")}
          />
          <Stack mb="lg" gap="xs">
            <Text size="sm">Exercises</Text>
            {exercises.length === 0 && (
              <Text size="sm" c="gray">
                Click below to add an exercise
              </Text>
            )}
            {exercises.map((exercise, index) => (
              <DataListItem
                key={index}
                symbol={index + 1}
                onEdit={() =>
                  setScreenState({
                    kind: "exercise-edit",
                    exercise,
                    editIndex: index,
                  })
                }
                onRemove={() => form.removeListItem("exercises", index)}
                {...getExerciseListProps(exercise)}
              />
            ))}
            <Button
              variant="outline"
              onClick={() =>
                setScreenState({
                  kind: "exercise-edit",
                  exercise: getDefaultTimedPitchesExercise(),
                })
              }
            >
              Add an exercise
            </Button>
          </Stack>
          <Textarea
            label="Description"
            rows={4}
            mb="lg"
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
          <FormButtons onCancel={onCancel} />
        </form>
      )}
      {screenState.kind === "exercise-edit" && (
        <TimedPitchesForm
          data={screenState.exercise}
          onCancel={() => setScreenState({ kind: "form" })}
          onSubmit={(e) =>
            handleExerciseSubmit(e, screenState.editIndex ?? null)
          }
        />
      )}
    </>
  );
}
