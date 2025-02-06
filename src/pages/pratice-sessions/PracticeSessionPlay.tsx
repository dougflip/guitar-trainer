import { useNavigate, useParams } from "@tanstack/react-router";

import { ExercisesPlayer } from "@/components/exercises-player/ExercisesPlayer";
import { RemoteData } from "@/components/remote-data/RemoteData";
import { practiceSessionQueries } from "@/queries";
import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

/**
 * Page level component which can "play" through an existing practice session.
 */
export function PracticeSessionPlay() {
  const params = useParams({ from: "/practice-sessions/$id/play" });
  const nav = useNavigate();

  const remoteSession = useQuery(practiceSessionQueries.detail(params.id));

  const handleOnEnd = useCallback(
    () => nav({ to: "/practice-sessions" }),
    [nav],
  );

  return (
    <RemoteData
      {...remoteSession}
      loadingMessage="Fetching exercises"
      render={({ exercises }) => (
        <ExercisesPlayer exercises={exercises} onEnd={handleOnEnd} />
      )}
    />
  );
}
