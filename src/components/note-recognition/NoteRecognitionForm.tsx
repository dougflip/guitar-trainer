import { Button, TextInput } from "@mantine/core";

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
  const [totalDuration, setTotalDuration] = useInputState<number>(
    data.totalDuration,
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ noteDuration, totalDuration });
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
        placeholder=""
        size="lg"
      />
      <TextInput
        label="Total duration"
        description="How long does this module last?"
        value={totalDuration}
        onChange={setTotalDuration}
        type="number"
        min={0}
        placeholder=""
        size="lg"
      />
      <Button type="submit">Save</Button>
    </form>
  );
}

export default NoteRecognitionForm;
