import { Milliseconds } from "@/core/base";
import { createPitchGenerator } from "@/core/sound/pitch-generator";
import { useEffect } from "react";

type UseNoteParams = {
  frequency: number;
  duration: Milliseconds;
  volume?: number;
  enabled?: boolean;
};

export function useNote({
  frequency,
  duration,
  enabled,
  volume = 0.5,
}: UseNoteParams) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const pitchGen = createPitchGenerator();
    pitchGen.play({ frequency, duration, volume });

    return pitchGen.dispose;
  }, [frequency, duration, enabled, volume]);
}
