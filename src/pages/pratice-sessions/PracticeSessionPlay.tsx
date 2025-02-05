import { useNavigate, useParams } from "@tanstack/react-router";

import { ExercisesPlayer } from "@/components/exercises-player/ExercisesPlayer";
import { practiceSessionQueries } from "@/queries";
import { useQuery } from "@tanstack/react-query";

/**
 * Page level component which can "play" through an existing practice session.
 */
export function PracticeSessionPlay() {
  const params = useParams({ from: "/practice-sessions/$id/play" });
  const nav = useNavigate();

  // TODO: Router should expose params.id as a number
  const practiceSession = useQuery(
    practiceSessionQueries.detail(Number(params.id)),
  );

  // TODO: Loader
  if (!practiceSession.data) {
    return null;
  }

  return (
    <ExercisesPlayer
      exercises={practiceSession.data.exercises}
      onEnd={() => nav({ to: "/practice-sessions" })}
    />
  );
}
