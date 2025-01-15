import { Exercise } from "@/core/exercises";
import { FormButtons } from "@/components/form/form-buttons";
import { TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";

type BasicScaleFormProps = {
  data: Extract<Exercise, { type: "scales" }>;
  onSubmit: (data: Exercise) => void;
  onCancel: () => void;
};

export function BasicScaleForm({
  data,
  onSubmit,
  onCancel,
}: BasicScaleFormProps) {
  const [tempo, setTempo] = useInputState(data.config.tempo || 80);
  const [totalDuration, setTotalDuration] = useInputState(
    data.config.totalDuration || 60,
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ type: "scales", config: { tempo, totalDuration } });
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
        <FormButtons onCancel={onCancel} />
      </form>
    </>
  );
}
