import { practiceSessionQueries, usePracticeSessionUpdate } from "@/queries";
import { useNavigate, useParams } from "@tanstack/react-router";

import { ExercisesPlayer } from "@/components/exercises-player/ExercisesPlayer";
import { PracticeSession } from "@/core/practice-session";
import { PracticeSessionForm } from "@/components/practice-session/PracticeSessionForm";
import { RemoteData } from "@/components/remote-data/RemoteData";
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
  const params = useParams({ from: "/_authenticated/practice-sessions/$id/" });
  const nav = useNavigate();
  const [screenState, setScreenState] = useState<ScreenState>({ kind: "form" });

  const remoteSession = useQuery(practiceSessionQueries.detail(params.id));
  const updatePracticeSession = usePracticeSessionUpdate({
    onSuccess: () => nav({ to: "/practice-sessions" }),
  });

  return (
    <RemoteData
      {...remoteSession}
      loadingMessage="Fetching practice session"
      render={(session) => (
        <div>
          <PracticeSessionForm
            data={session}
            title="Edit Practice Session"
            onSubmit={updatePracticeSession.mutate}
            onPreview={(session) =>
              setScreenState({ kind: "playing", session })
            }
            onCancel={() => {
              nav({ to: "/practice-sessions" });
            }}
            submitting={updatePracticeSession.isPending}
            className={clsx({ "d-none": screenState.kind === "playing" })}
          />

          {screenState.kind === "playing" && (
            <ExercisesPlayer
              exercises={screenState.session.exercises}
              onEnd={() => setScreenState({ kind: "form" })}
            />
          )}
        </div>
      )}
    />
  );
}
