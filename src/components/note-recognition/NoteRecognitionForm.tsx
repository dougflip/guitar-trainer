import { Button, Slider, Switch, TextInput } from "@mantine/core";

import { NoteRecognitionConfig } from "@/core/note-recognition";
import React from "react";
import { useInputState } from "@mantine/hooks";

type NoteRecognitionFormProps = {
  data: NoteRecognitionConfig;
  onSubmit: (data: NoteRecognitionConfig) => void;
};

function NoteRecognitionForm({ data, onSubmit }: NoteRecognitionFormProps) {
  const [noteDuration, setNoteDuration] = useInputState<number>(
    data.noteDuration,
  );
  const [playCurrentNote, setPlayCurrentNote] = useInputState<boolean>(
    data.playCurrentNote,
  );
  const [noteVolume, setNoteVolume] = useInputState<number>(data.noteVolume);
  const [totalDuration, setTotalDuration] = useInputState<number>(
    data.totalDuration,
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ noteDuration, totalDuration, playCurrentNote, noteVolume });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Note duration"
        description="How long is each note displayed?"
        value={noteDuration}
        onChange={setNoteDuration}
        type="number"
        min={0}
        size="lg"
      />
      <TextInput
        label="Total duration"
        description="How long does this module last?"
        value={totalDuration}
        onChange={setTotalDuration}
        type="number"
        min={0}
        size="lg"
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
        step={5}
        marks={[
          { value: 0, label: "0" },
          { value: 50, label: "50" },
          { value: 100, label: "100" },
        ]}
      />
      <Button type="submit">Save</Button>
    </form>
  );
}

export default NoteRecognitionForm;
