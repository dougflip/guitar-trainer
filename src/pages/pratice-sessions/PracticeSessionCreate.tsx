import { PracticeSessionForm } from "@/components/practice-session/practice-session-form";
import { createPracticeSession } from "@/core/api";
import { makePracticeSession } from "@/core/practice-session";
import { useNavigate } from "@tanstack/react-router";

/**
 * Page level component which allows a user to create a practice session.
 */
export function PraticeSessionCreatePage() {
  const nav = useNavigate();

  return (
    <div>
      <PracticeSessionForm
        data={makePracticeSession()}
        onSubmit={(formData) => {
          createPracticeSession(formData);
          nav({ to: "/practice-sessions" });
        }}
        onCancel={() => {
          nav({ to: "/practice-sessions" });
        }}
      />
    </div>
  );
}
