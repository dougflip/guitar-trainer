import { Button, TextInput } from "@mantine/core";

import { BasicScaleConfig } from "@/core/exercises";
import { useInputState } from "@mantine/hooks";

type BasicScaleFormProps = {
  onSubmit: (config: BasicScaleConfig) => void;
};

export function BasicScaleForm({ onSubmit }: BasicScaleFormProps) {
  const [tempo, setTempo] = useInputState(80);
  const [totalDuration, setTotalDuration] = useInputState(60);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ tempo, totalDuration });
  }

  return (
    <>
      <h2>Scales</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Tempo in BPM"
          value={tempo}
          onChange={setTempo}
          type="number"
          min={0}
          size="lg"
        />
        <TextInput
          label="Total duration"
          description="How long does this exercise last?"
          value={totalDuration}
          onChange={setTotalDuration}
          type="number"
          min={0}
          size="lg"
        />
        <Button type="submit">Save</Button>
      </form>
    </>
  );
}
