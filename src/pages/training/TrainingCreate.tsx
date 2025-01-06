import { Button, Select } from "@mantine/core";
import {
  NoteRecognitionConfig,
  getDefaultNoteRecognitionConfig,
} from "@/core/note-recognition";

import { DataListItem } from "@/components/data-list-item/DataListItem";
import { Exercise } from "@/core/exercises";
import NoteRecognitionForm from "@/components/note-recognition/NoteRecognitionForm";
import { TrainingPlayer } from "@/components/training-player/TrainingPlayer";
import { useState } from "react";

type ScreenState = "exercise-select" | "exercise-form" | "playing";

/**
 * Allows the use to build a training course comprised of a set of exercises.
 * For now, you can just run the training.
 * In the future, you will be able to save the training and run it later.
 */
export function TrainingCreatePage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [screenState, setScreenState] =
    useState<ScreenState>("exercise-select");

  const handleNoteRecSubmit = (config: NoteRecognitionConfig) => {
    setExercises([...exercises, { type: "note-recognition", config }]);
    setScreenState("exercise-select");
  };

  const handleTrainingEnd = () => {
    setScreenState("exercise-select");
  };

  return (
    <div>
      {screenState === "exercise-select" && (
        <>
          <h1>Create a Training Course</h1>
          <p>
            Here you can build a training course by selecting and configuring
            exercises.
          </p>
          <Select
            data={[{ label: "Note Recognition", value: "note-recognition" }]}
            placeholder="Select an exercise"
            searchable={false}
            onChange={() => {
              setScreenState("exercise-form");
            }}
          />
          {exercises.map((exercise, index) => (
            <DataListItem
              key={index}
              symbol={index + 1}
              title="Note Recognition"
              description={`${exercise.config.noteDuration} second notes for ${exercise.config.totalDuration} seconds`}
            />
          ))}

          {exercises.length > 0 && (
            <Button onClick={() => setScreenState("playing")}>Start!</Button>
          )}
        </>
      )}

      {screenState === "exercise-form" && (
        <NoteRecognitionForm
          data={getDefaultNoteRecognitionConfig()}
          onSubmit={handleNoteRecSubmit}
        />
      )}

      {screenState === "playing" && (
        <TrainingPlayer exercises={exercises} onEnd={handleTrainingEnd} />
      )}
    </div>
  );
}
