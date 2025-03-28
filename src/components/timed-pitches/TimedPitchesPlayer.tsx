import "./TimedPitchesPlayer.css";

import { Flex, Title } from "@mantine/core";
import { memo, useEffect, useRef, useState } from "react";

import { ExerciseTimedPitchesConfig } from "@/core/practice-session";
import clsx from "clsx";
// import { createMetronome } from "@/core/sound/metronome";
import { createMetronome } from "@/core/sound/claude-metronome";
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
  const metronomeRef = useRef<ReturnType<typeof createMetronome> | null>(null);
  const notePool = useRef(getNotePool(config.notePool));
  const [note, setNote] = useState("");

  useEffect(() => {
    const pitchGenerator = createPitchGenerator();
    const metronome = createMetronome({
      tempo: Math.round(config.tempo),
      beatsPerBar: 4,
      volume: 50,
      maxBeats: {
        count:
          config.numberOfCycles * config.beatsPerNote * notePool.current.length,
        onEnd: onEnd,
      },
      beatInterval: {
        count: config.beatsPerNote,
        onBeatInterval: ({ currentInterval }) => {
          const currentNote =
            notePool.current[currentInterval % notePool.current.length];
          setNote(currentNote);

          // Play the note using the pitch generator
          pitchGenerator.play({
            frequency: noteFrequencies[currentNote],
            duration: 750, // Adjust duration as needed
            volume: 0.5, // Adjust volume as needed
          });
        },
      },
    });

    metronomeRef.current = metronome;
    metronome.start();

    return () => {
      metronomeRef.current = null;
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
