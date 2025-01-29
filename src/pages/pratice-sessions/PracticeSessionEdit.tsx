import { fetchPracticeSession, updatePracticeSession } from "@/core/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";

import { ExercisesPlayer } from "@/components/exercises-player/ExercisesPlayer";
import { PracticeSession } from "@/core/practice-session";
import { PracticeSessionForm } from "@/components/practice-session/PracticeSessionForm";
import clsx from "clsx";

type ScreenState =
  | { kind: "form" }
  | { kind: "playing"; session: PracticeSession };

/**
 * Page level component which allows a user to edit an existing practice session.
 */
export function PracticeSessionEditPage() {
  const params = useParams({ from: "/practice-sessions/$id/" });
  const nav = useNavigate();
  const [session, setSession] = useState<PracticeSession | null>(null);
  const [screenState, setScreenState] = useState<ScreenState>({ kind: "form" });

  useEffect(() => {
    setSession(fetchPracticeSession(params.id));
  }, [params.id]);

  function handleSubmit(formData: PracticeSession) {
    updatePracticeSession(formData);
    nav({ to: "/practice-sessions" });
  }

  return (
    <div>
      {session && (
        <PracticeSessionForm
          data={session}
          onSubmit={handleSubmit}
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
