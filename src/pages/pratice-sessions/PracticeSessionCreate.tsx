import { PracticeSession, makePracticeSession } from "@/core/practice-session";

import { ExercisesPlayer } from "@/components/exercises-player/ExercisesPlayer";
import { PracticeSessionForm } from "@/components/practice-session/PracticeSessionForm";
import clsx from "clsx";
import { createPracticeSession } from "@/core/api";
import { useNavigate } from "@tanstack/react-router";
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

  return (
    <div>
      <PracticeSessionForm
        data={makePracticeSession()}
        onSubmit={(formData) => {
          createPracticeSession(formData);
          nav({ to: "/practice-sessions" });
        }}
        onPreview={(session) => setScreenState({ kind: "playing", session })}
        onCancel={() => {
          nav({ to: "/practice-sessions" });
        }}
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
