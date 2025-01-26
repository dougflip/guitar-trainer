import { TrainingSession, makeTrainingSession } from "@/core/training-session";
import { fetchTrainingSession, updateTrainingSession } from "@/core/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";

import { TrainingSessionForm } from "@/components/training-session/training-session-form";

/**
 * Allows the use to build a training course comprised of a set of exercises.
 * For now, you can just run the training.
 * In the future, you will be able to save the training and run it later.
 */
export function TrainingSessionEditPage() {
  const params = useParams({ from: "/training-sessions/$id/" });
  const nav = useNavigate();
  const [session, setSession] = useState<TrainingSession | null>(null);

  useEffect(() => {
    setSession(fetchTrainingSession(params.id));
  }, [params.id]);

  function handleSubmit(formData: TrainingSession) {
    updateTrainingSession(formData);
    nav({ to: "/training-sessions" });
  }

  return (
    <div>
      {session && (
        <TrainingSessionForm
          data={session}
          onSubmit={handleSubmit}
          onCancel={() => {
            nav({ to: "/training-sessions" });
          }}
        />
      )}
    </div>
  );
}
