import { useEffect, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";

import { TrainingPlayer } from "@/components/training-player/TrainingPlayer";
import { TrainingSession } from "@/core/training-session";
import { fetchTrainingSession } from "@/core/api";

export function TrainingSessionPlay() {
  const params = useParams({ from: "/training-sessions/$id/play" });
  const nav = useNavigate();
  const [session, setSession] = useState<TrainingSession | null>(null);

  useEffect(() => {
    setSession(fetchTrainingSession(params.id));
  }, [params.id]);

  if (!session) {
    return null;
  }

  return (
    <TrainingPlayer
      exercises={session.exercises}
      onEnd={() => nav({ to: "/training-sessions" })}
    />
  );
}
