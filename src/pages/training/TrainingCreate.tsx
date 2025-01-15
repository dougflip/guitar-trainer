import { Button, Select } from "@mantine/core";
import { Exercise, ExerciseName } from "@/core/exercises";
import { ReactNode, useState } from "react";
import {
  getDefaultNoteRecognitionExercise,
  getDefaultScaleExercise,
} from "@/core/note-recognition";

import { BasicScaleForm } from "@/components/basic-scale/BasicScaleForm";
import { DataListItem } from "@/components/data-list-item/DataListItem";
import NoteRecognitionForm from "@/components/note-recognition/NoteRecognitionForm";
import { TrainingPlayer } from "@/components/training-player/TrainingPlayer";

type ScreenState =
  | { kind: "exercise-select" }
  | { kind: "exercise-form"; form: ExerciseName }
  | { kind: "playing" };

function getExerciseListProps(exercise: Exercise): {
  title: ReactNode;
  description: ReactNode;
} {
  switch (exercise.type) {
    case "note-recognition":
      return {
        title: "Note Recognition",
        description: `${exercise.config.noteDuration} second notes for ${exercise.config.totalDuration} seconds`,
      };
    case "scales":
      return {
        title: "Scales",
        description: `${exercise.config.tempo} BPM for ${exercise.config.totalDuration} seconds`,
      };
  }
}

/**
 * Allows the use to build a training course comprised of a set of exercises.
 * For now, you can just run the training.
 * In the future, you will be able to save the training and run it later.
 */
export function TrainingCreatePage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [screenState, setScreenState] = useState<ScreenState>({
    kind: "exercise-select",
  });

  const handleExerciseSubmit = (exercise: Exercise) => {
    setExercises([...exercises, exercise]);
    setScreenState({ kind: "exercise-select" });
  };

  const handleTrainingEnd = () => {
    setScreenState({ kind: "exercise-select" });
  };

  const handleExerciseRemove = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  return (
    <div>
      {screenState.kind === "exercise-select" && (
        <>
          <h1>Create a Training Session</h1>
          <p>
            Build a training session by selecting and configuring exercises.
          </p>
          <Select
            data={[
              { label: "Note Recognition", value: "note-recognition" },
              { label: "Scales", value: "scales" },
            ]}
            placeholder="Select an exercise"
            searchable={false}
            mb="lg"
            onChange={(e) => {
              setScreenState({
                kind: "exercise-form",
                form: e as ExerciseName,
              });
            }}
            comboboxProps={{ offset: 0 }}
          />
          {exercises.map((exercise, index) => (
            <DataListItem
              key={index}
              symbol={index + 1}
              onRemove={() => handleExerciseRemove(index)}
              {...getExerciseListProps(exercise)}
            />
          ))}

          {exercises.length > 0 && (
            <Button onClick={() => setScreenState({ kind: "playing" })}>
              Start!
            </Button>
          )}
        </>
      )}

      {screenState.kind === "exercise-form" && (
        <>
          {screenState.form === "note-recognition" && (
            <NoteRecognitionForm
              data={getDefaultNoteRecognitionExercise()}
              onSubmit={handleExerciseSubmit}
              onCancel={() => setScreenState({ kind: "exercise-select" })}
            />
          )}
          {screenState.form === "scales" && (
            <BasicScaleForm
              data={getDefaultScaleExercise()}
              onSubmit={handleExerciseSubmit}
              onCancel={() => setScreenState({ kind: "exercise-select" })}
            />
          )}
        </>
      )}

      {screenState.kind === "playing" && (
        <TrainingPlayer exercises={exercises} onEnd={handleTrainingEnd} />
      )}
    </div>
  );
}
