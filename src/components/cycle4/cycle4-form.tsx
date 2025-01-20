import { Exercise } from "@/core/exercises";
import { FormButtons } from "@/components/form/form-buttons";

type Cycle4FormProps = {
  data: Extract<Exercise, { type: "cycle4" }>;
  onSubmit: (data: Exercise) => void;
  onCancel: () => void;
};

export function Cycle4Form({ data, onSubmit, onCancel }: Cycle4FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <div>
      <h1>Cycle 4 Form</h1>
      <form onSubmit={handleSubmit}>
        <FormButtons onCancel={onCancel} />
      </form>
    </div>
  );
}
