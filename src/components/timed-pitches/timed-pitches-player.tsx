import "./timed-pitches-player.css";

import { Flex, Title } from "@mantine/core";
import { cycle4Notes, noteFrequencies } from "@/core/notes";
import { useEffect, useRef, useState } from "react";

import { ExerciseTimedPitchesConfig } from "@/core/exercises";
import { createMetronome } from "@/core/sound/metronome";
import { createPitchGenerator } from "@/core/sound/pitch-generator";

type TimedPitchesPlayerProps = {
  config: ExerciseTimedPitchesConfig;
  onEnd: () => void;
};

export function TimedPitchesPlayer({ config, onEnd }: TimedPitchesPlayerProps) {
  // default the screen to "empty" state
  // we use the metronome to sync state changes and we want to initialize on the first beat
  const noteIndex = useRef(-1);
  const cycleCount = useRef(0);
  const beatCount = useRef(-1);
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
          noteIndex.current < 0 || noteIndex.current >= cycle4Notes.length - 1
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
  }, [config.tempo, config.numberOfCycles, config.beatsPerNote, onEnd]);

  return (
    <Flex direction="column" align="center">
      <Title order={3} my="sm">
        {config.title}
      </Title>
      {note && <span className="c4p-note">{note}</span>}
    </Flex>
  );
}