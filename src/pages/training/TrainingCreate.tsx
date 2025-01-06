import { CloseIcon, Paper, Select } from "@mantine/core";
import {
  NoteRecognitionConfig,
  getDefaultNoteRecognitionConfig,
} from "@/core/note-recognition";

import { DataListItem } from "@/components/data-list-item/DataListItem";
import { Exercise } from "@/core/exercises";
import NoteRecognitionForm from "@/components/note-recognition/NoteRecognitionForm";
import { useState } from "react";

/**
 * Allows the use to build a training course comprised of a set of exercises.
 * For now, you can just run the training.
 * In the future, you will be able to save the training and run it later.
 */
export function TrainingCreatePage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showNoteRec, setShowNoteRec] = useState(false);

  const handleNoteRecSubmit = (config: NoteRecognitionConfig) => {
    setExercises([...exercises, { type: "note-recognition", config }]);
    setShowNoteRec(false);
  };

  return (
    <div>
      {!showNoteRec && (
        <>
          <h1>Create a Training Course</h1>
          <p>
            Here you can build a training course by selecting and configuring
            exercises.
          </p>
          <Select
            data={[{ label: "Note Recognition", value: "note-recognition" }]}
            placeholder="Select exercise"
            searchable={false}
            onChange={() => {
              setShowNoteRec(true);
            }}
          />
          {exercises.map((exercise, index) => (
            <DataListItem
              symbol={index + 1}
              title="Note Recognition"
              description={`${exercise.config.noteDuration} second notes for ${exercise.config.totalDuration} seconds`}
            />
          ))}
        </>
      )}

      {showNoteRec && (
        <NoteRecognitionForm
          data={getDefaultNoteRecognitionConfig()}
          onSubmit={handleNoteRecSubmit}
        />
      )}
    </div>
  );
}
