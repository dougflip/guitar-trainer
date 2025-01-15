import { Slider, Switch, TextInput } from "@mantine/core";

import { Exercise } from "@/core/exercises";
import { FormButtons } from "@/components/form/form-buttons";
import React from "react";
import { useInputState } from "@mantine/hooks";

type NoteRecognitionFormProps = {
  data: Extract<Exercise, { type: "note-recognition" }>;
  onSubmit: (data: Exercise) => void;
  onCancel: () => void;
};

function NoteRecognitionForm({
  data,
  onSubmit,
  onCancel,
}: NoteRecognitionFormProps) {
  const config = data.config;
  const [noteDuration, setNoteDuration] = useInputState<number>(
    config.noteDuration,
  );
  const [playCurrentNote, setPlayCurrentNote] = useInputState<boolean>(
    config.playCurrentNote,
  );
  const [noteVolume, setNoteVolume] = useInputState<number>(config.noteVolume);
  const [totalDuration, setTotalDuration] = useInputState<number>(
    config.totalDuration,
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      type: "note-recognition",
      config: { noteDuration, totalDuration, playCurrentNote, noteVolume },
    });
  };

  return (
    <>
      <h2>Note Recognition</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Note duration"
          description="How long is each note displayed?"
          value={noteDuration}
          onChange={setNoteDuration}
          type="number"
          min={0}
          size="lg"
          mb="lg"
        />
        <TextInput
          label="Total duration"
          description="How long does this exercise last?"
          value={totalDuration}
          onChange={setTotalDuration}
          type="number"
          min={0}
          size="lg"
          mb="lg"
        />
        <Switch
          label="Play the current note?"
          checked={playCurrentNote}
          onChange={setPlayCurrentNote}
          size="lg"
        />
        <Slider
          label={(x) => `Volume: ${Math.floor(x)}`}
          value={noteVolume * 100}
          onChange={(x) => setNoteVolume(x / 100)}
          disabled={!playCurrentNote}
          mb="xl"
          step={5}
          marks={[
            { value: 0, label: "0" },
            { value: 50, label: "50" },
            { value: 100, label: "100" },
          ]}
        />
        <FormButtons onCancel={onCancel} />
      </form>
    </>
  );
}

export default NoteRecognitionForm;
