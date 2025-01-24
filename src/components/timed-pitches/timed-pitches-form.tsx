import { TextInput, Textarea } from "@mantine/core";

import { Exercise } from "@/core/exercises";
import { FormButtons } from "@/components/form/form-buttons";
import { useInputState } from "@mantine/hooks";

type TimedPitchesFormProps = {
  data: Extract<Exercise, { type: "timed-pitches" }>;
  onSubmit: (data: Exercise) => void;
  onCancel: () => void;
};

export function TimedPitchesForm({
  data,
  onSubmit,
  onCancel,
}: TimedPitchesFormProps) {
  const [title, setTitle] = useInputState(data.config.title);
  const [description, setDescription] = useInputState(data.config.description);
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
      type: "timed-pitches",
      config: {
        ...data.config,
        title,
        description,
        numberOfCycles: Number(numberOfCycles),
        beatsPerNote: Number(beatsPerNote),
        tempo: Number(tempo),
      },
    });
  };

  return (
    <div>
      <h2>Create an exercise</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Title"
          description="A short title to identify the exercise."
          placeholder="Triads on strings 2, 3, 4."
          value={title}
          onChange={setTitle}
          required
          maxLength={100}
          mb="lg"
        />
        <TextInput
          label="Tempo (BPM)"
          value={tempo}
          onChange={setTempo}
          required
          type="number"
          min={1}
          mb="lg"
        />
        <TextInput
          label="Number of cycles"
          description="How many times we'll cycle through the notes"
          value={numberOfCycles}
          onChange={setNumberOfCycles}
          required
          type="number"
          min={1}
          mb="lg"
        />
        <TextInput
          label="Beats per Note"
          description="How many beats between switching notes"
          value={beatsPerNote}
          onChange={setBeatsPerNote}
          required
          type="number"
          min={1}
          mb="lg"
        />
        <Textarea
          label="Description"
          description="A more detailed description of the exercise"
          value={description}
          onChange={setDescription}
          rows={4}
          maxLength={500}
          mb="lg"
        />
        <FormButtons onCancel={onCancel} />
      </form>
    </div>
  );
}
