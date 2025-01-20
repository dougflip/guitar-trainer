import "./cycle4-player.css";

import { cycle4Notes, noteFrequencies } from "@/core/notes";
import { useEffect, useRef, useState } from "react";

import { Center } from "@mantine/core";
import { Cycle4Config } from "@/core/exercises";
import { createMetronome } from "@/core/sound/metronome";
import { createPitchGenerator } from "@/core/sound/pitch-generator";

type Cycle4PlayerProps = {
  config: Cycle4Config;
  onEnd: () => void;
};

export function Cycle4Player({ config, onEnd }: Cycle4PlayerProps) {
  // default the screen to "empty" state
  // we use the metronome to sync state changes and we want to initialize on the first beat
  const noteIndex = useRef(-1);
  const cycleCount = useRef(0);
  const [note, setNote] = useState("");

  useEffect(() => {
    const pitchGenerator = createPitchGenerator();
    const metronome = createMetronome({
      tempo: Math.round(config.tempo),
      onBeatEnd: () => {
        noteIndex.current =
          noteIndex.current < 0 || noteIndex.current >= cycle4Notes.length - 1
            ? 0
            : noteIndex.current + 1;
        if (noteIndex.current === 0) {
          cycleCount.current += 1;
          if (cycleCount.current >= config.numberOfCycles) {
            onEnd();
            return;
          }
        }

        const currentNote = cycle4Notes[noteIndex.current];
        setNote(currentNote);
        pitchGenerator.play({
          frequency: noteFrequencies[currentNote],
          duration: 750,
          volume: 0.5,
        });
      },
    });

    metronome.start();

    return () => {
      metronome.stop();
      pitchGenerator.dispose();
    };
  }, [config.tempo, config.numberOfCycles, onEnd]);

  return (
    <div>
      <h1>Cycle 4 Player</h1>
      {note && <Center className="c4p-note">{note}</Center>}
    </div>
  );
}
