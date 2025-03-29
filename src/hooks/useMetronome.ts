import {
  MetronomeConfig,
  createMetronome,
} from "@/core/sound/claude-metronome";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type UseMetronomeConfig = MetronomeConfig;

/**
 * Creates a metronome that triggers state updates whenever it is updated.
 */
export function useMetronome(config: UseMetronomeConfig) {
  const [, updateState] = useState({});
  const forceRender = useCallback(() => updateState({}), []);
  const metronome = useRef(createMetronome(config));

  useEffect(() => {
    return () => metronome.current.stop();
  }, []);

  return useMemo(
    () => ({
      updateConfig: (newConfig: Partial<UseMetronomeConfig>) => {
        metronome.current.updateConfig(newConfig);
        forceRender();
      },
      getState: () => metronome.current.getState(),
      start: () => {
        metronome.current.start();
        forceRender();
      },
      stop: () => {
        metronome.current.stop();
        forceRender();
      },
      pause: () => {
        metronome.current.pause();
        forceRender();
      },
      resume: () => {
        metronome.current.resume();
        forceRender();
      },
    }),
    [metronome.current],
  );
}
