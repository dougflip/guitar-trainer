import { Exercise } from "@/core/exercises";
import { FormButtons } from "@/components/form/form-buttons";
import { TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";

type Cycle4FormProps = {
  data: Extract<Exercise, { type: "cycle4" }>;
  onSubmit: (data: Exercise) => void;
  onCancel: () => void;
};

export function Cycle4Form({ data, onSubmit, onCancel }: Cycle4FormProps) {
  const [numberOfCycles, setNumberOfCycles] = useInputState(
    data.config.numberOfCycles,
  );
  const [beatsPerNote, setBeatsPerNote] = useInputState(
    data.config.beatsPerNote,
  );
  const [tempo, setTempo] = useInputState(data.config.tempo);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      type: "cycle4",
      config: {
        ...data.config,
        numberOfCycles: Number(numberOfCycles),
        beatsPerNote: Number(beatsPerNote),
        tempo: Number(tempo),
      },
    });
  };

  return (
    <div>
      <h2>Cycle 4</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Tempo (BPM)"
          value={tempo}
          onChange={setTempo}
          type="number"
          min={1}
          mb="lg"
        />
        <TextInput
          label="Number of cycles"
          description="How many times should the cycle be played?"
          value={numberOfCycles}
          onChange={setNumberOfCycles}
          type="number"
          min={1}
          mb="lg"
        />
        <TextInput
          label="Beat per Note"
          description="How many beats will each note last?"
          value={beatsPerNote}
          onChange={setBeatsPerNote}
          type="number"
          min={1}
        />
        <FormButtons onCancel={onCancel} />
      </form>
    </div>
  );
}
