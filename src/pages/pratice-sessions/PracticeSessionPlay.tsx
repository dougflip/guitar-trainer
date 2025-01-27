import { useEffect, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";

import { ExercisesPlayer } from "@/components/exercises-player/ExercisesPlayer";
import { PracticeSession } from "@/core/practice-session";
import { fetchPracticeSession } from "@/core/api";

/**
 * Page level component which can "play" through an existing practice session.
 */
export function PracticeSessionPlay() {
  const params = useParams({ from: "/practice-sessions/$id/play" });
  const nav = useNavigate();
  const [session, setSession] = useState<PracticeSession | null>(null);

  useEffect(() => {
    setSession(fetchPracticeSession(params.id));
  }, [params.id]);

  if (!session) {
    return null;
  }

  return (
    <ExercisesPlayer
      exercises={session.exercises}
      onEnd={() => nav({ to: "/practice-sessions" })}
    />
  );
}
