import { Button, Stack, Text, TextInput, Textarea, Title } from "@mantine/core";
import { Exercise, ExerciseTimedPitches } from "@/core/practice-session";
import { ReactNode, useState } from "react";

import { DataListItem } from "@/components/data-list-item/DataListItem";
import { FormButtons } from "@/components/form/FormButtons";
import { PracticeSession } from "@/core/practice-session";
import { TimedPitchesForm } from "@/components/timed-pitches/TimedPitchesForm";
import { getDefaultTimedPitchesExercise } from "@/core/practice-session";
import { useForm } from "@mantine/form";

type PracticeSessionFormProps = {
  data: PracticeSession;
  onSubmit: (data: PracticeSession) => void;
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

export function PracticeSessionForm({
  data,
  onSubmit,
  onCancel,
}: PracticeSessionFormProps) {
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

  function handleSubmit(formData: PracticeSession) {
    onSubmit({ ...data, ...formData });
  }

  const exercises = form.getValues().exercises;

  return (
    <>
      {screenState.kind === "form" && (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Title order={2}>Create a Practice Session</Title>
          <p>
            A practice session is a collection of exercises which help you drill
            a specific skill.
          </p>
          <TextInput
            withAsterisk
            label="Title"
            placeholder="Triads"
            mb="lg"
            key={form.key("title")}
            {...form.getInputProps("title")}
          />
          <Stack mb="lg" gap="xs">
            <Text size="sm">Exercises</Text>
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
            placeholder="Work on playing triads across the neck."
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
