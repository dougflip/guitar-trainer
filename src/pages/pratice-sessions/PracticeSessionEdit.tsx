import { practiceSessionQueries, usePracticeSessionUpdate } from "@/queries";
import { useNavigate, useParams } from "@tanstack/react-router";

import { ExercisesPlayer } from "@/components/exercises-player/ExercisesPlayer";
import { PracticeSession } from "@/core/practice-session";
import { PracticeSessionForm } from "@/components/practice-session/PracticeSessionForm";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type ScreenState =
  | { kind: "form" }
  | { kind: "playing"; session: PracticeSession };

/**
 * Page level component which allows a user to edit an existing practice session.
 */
export function PracticeSessionEditPage() {
  const params = useParams({ from: "/practice-sessions/$id/" });
  const nav = useNavigate();
  const [screenState, setScreenState] = useState<ScreenState>({ kind: "form" });

  // TODO: Router should expose params.id as a number
  const practiceSession = useQuery(
    practiceSessionQueries.detail(Number(params.id)),
  );
  const updatePracticeSession = usePracticeSessionUpdate({
    onSuccess: () => nav({ to: "/practice-sessions" }),
  });

  // TODO: Loader
  if (practiceSession.isLoading) {
    return null;
  }

  return (
    <div>
      {practiceSession.data && (
        <PracticeSessionForm
          data={practiceSession.data}
          title="Edit Practice Session"
          onSubmit={updatePracticeSession.mutate}
          onPreview={(session) => setScreenState({ kind: "playing", session })}
          onCancel={() => {
            nav({ to: "/practice-sessions" });
          }}
          className={clsx({ "d-none": screenState.kind === "playing" })}
        />
      )}

      {screenState.kind === "playing" && (
        <ExercisesPlayer
          exercises={screenState.session.exercises}
          onEnd={() => setScreenState({ kind: "form" })}
        />
      )}
    </div>
  );
}
