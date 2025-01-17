import { BasicScaleForm } from "@/components/basic-scale/BasicScaleForm";
import NoteRecognitionForm from "@/components/note-recognition/NoteRecognitionForm";
import { Exercise } from "@/core/exercises";

type ExerciseFormProps = {
  data: Exercise;
  onSubmit: (exercise: Exercise) => void;
  onCancel: () => void;
};

export function ExerciseForm(props: ExerciseFormProps) {
  switch (props.data.type) {
    case "note-recognition":
      return <NoteRecognitionForm {...props} data={props.data} />;
    case "scales":
      return <BasicScaleForm {...props} data={props.data} />;
    default:
      console.error(
        `Attempted to render unknown exercise: ${props.data satisfies never}`,
      );
      return;
  }
}
