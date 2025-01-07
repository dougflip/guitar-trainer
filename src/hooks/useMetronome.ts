import { MetronomeConfig, createMetronome } from "@/core/Metronome";

import { useEffect } from "react";

export type UseMetronomeConfig = MetronomeConfig & { enabled: boolean };

/**
 * Creates a metronome that automatically starts when rendered.
 */
export function useMetronome({
  enabled,
  tempo,
  beatsPerBar,
}: UseMetronomeConfig) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const m = createMetronome({ tempo, beatsPerBar });
    m.start();

    return m.stop;
  }, [tempo, beatsPerBar, enabled]);
}
