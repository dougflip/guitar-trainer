import "./TimedPitchesPlayer.css";

import { Flex, Title } from "@mantine/core";
import { memo, useEffect, useRef, useState } from "react";

import { ExerciseTimedPitchesConfig } from "@/core/practice-session";
import clsx from "clsx";
import { createMetronome } from "@/core/sound/metronome";
import { createPitchGenerator } from "@/core/sound/pitch-generator";
import { getNotePool } from "@/core/utils";
import { noteFrequencies } from "@/core/notes";

type TimedPitchesPlayerProps = {
  config: ExerciseTimedPitchesConfig;
  onEnd: () => void;
};

function TimedPitchesPlayerRaw({ config, onEnd }: TimedPitchesPlayerProps) {
  // default the screen to "empty" state
  // we use the metronome to sync state changes and we want to initialize on the first beat
  const noteIndex = useRef(-1);
  const cycleCount = useRef(0);
  const beatCount = useRef(-1);
  const notePool = useRef(getNotePool(config.notePool));
  const [note, setNote] = useState("");

  useEffect(() => {
    const pitchGenerator = createPitchGenerator();
    const metronome = createMetronome({
      tempo: Math.round(config.tempo),
      onBeatEnd: () => {
        beatCount.current += 1;
        // check if we should advance the note based on beat number
        if (beatCount.current % config.beatsPerNote !== 0) {
          return;
        }

        noteIndex.current =
          noteIndex.current < 0 ||
          noteIndex.current >= notePool.current.length - 1
            ? 0
            : noteIndex.current + 1;

        // check if we are starting a new cycle
        if (noteIndex.current === 0) {
          // cycles are 1 based, so the first cycle is 1!
          cycleCount.current += 1;
          if (cycleCount.current > config.numberOfCycles) {
            onEnd();
            return;
          }
        }

        const currentNote = notePool.current[noteIndex.current];
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
  }, [config, onEnd]);

  return (
    <Flex direction="column" align="center">
      <Title order={3} my="sm">
        {config.title}
      </Title>
      <span className={clsx("c4p-note", { "is-invisible": !note })}>
        {note || "A"}
      </span>
    </Flex>
  );
}
export const TimedPitchesPlayer = memo(TimedPitchesPlayerRaw);
