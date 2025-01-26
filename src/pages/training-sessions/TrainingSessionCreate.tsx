import { TrainingSessionForm } from "@/components/training-session/training-session-form";
import { createTrainingSession } from "@/core/api";
import { makeTrainingSession } from "@/core/training-session";
import { useNavigate } from "@tanstack/react-router";

/**
 * Allows the use to build a training course comprised of a set of exercises.
 * For now, you can just run the training.
 * In the future, you will be able to save the training and run it later.
 */
export function TrainingSessionCreatePage() {
  const nav = useNavigate();

  return (
    <div>
      <TrainingSessionForm
        data={makeTrainingSession()}
        onSubmit={(formData) => {
          createTrainingSession(formData);
          nav({ to: "/training-sessions" });
        }}
        onCancel={() => {
          nav({ to: "/training-sessions" });
        }}
      />
    </div>
  );
}
