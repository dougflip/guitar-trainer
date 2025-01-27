import { fetchPracticeSession, updatePracticeSession } from "@/core/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";

import { PracticeSession } from "@/core/practice-session";
import { PracticeSessionForm } from "@/components/practice-session/practice-session-form";

/**
 * Page level component which allows a user to edit an existing practice session.
 */
export function PracticeSessionEditPage() {
  const params = useParams({ from: "/practice-sessions/$id/" });
  const nav = useNavigate();
  const [session, setSession] = useState<PracticeSession | null>(null);

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
          onCancel={() => {
            nav({ to: "/practice-sessions" });
          }}
        />
      )}
    </div>
  );
}
