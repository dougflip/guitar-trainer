import { PracticeSession, makePracticeSession } from "@/core/practice-session";

import { ExercisesPlayer } from "@/components/exercises-player/ExercisesPlayer";
import { PracticeSessionForm } from "@/components/practice-session/PracticeSessionForm";
import clsx from "clsx";
import { useNavigate } from "@tanstack/react-router";
import { usePracticeSessionCreate } from "@/queries";
import { useState } from "react";

type ScreenState =
  | { kind: "form" }
  | { kind: "playing"; session: PracticeSession };

/**
 * Page level component which allows a user to create a practice session.
 */
export function PraticeSessionCreatePage() {
  const nav = useNavigate();
  const [screenState, setScreenState] = useState<ScreenState>({ kind: "form" });

  const createPracticeSession = usePracticeSessionCreate({
    onSuccess: (ps) =>
      nav({ to: "/practice-sessions/$id", params: { id: ps.id } }),
  });

  return (
    <div>
      <PracticeSessionForm
        data={makePracticeSession()}
        title="Create a Practice Session"
        onSubmit={createPracticeSession.mutate}
        onPreview={(session) => setScreenState({ kind: "playing", session })}
        onCancel={() => {
          nav({ to: "/practice-sessions" });
        }}
        submitting={createPracticeSession.isPending}
        className={clsx({ "d-none": screenState.kind === "playing" })}
      />

      {screenState.kind === "playing" && (
        <ExercisesPlayer
          exercises={screenState.session.exercises}
          onEnd={() => setScreenState({ kind: "form" })}
        />
      )}
    </div>
  );
}
