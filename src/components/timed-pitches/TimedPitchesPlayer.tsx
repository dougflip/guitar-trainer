import "./TimedPitchesPlayer.css";

import { Flex, Title } from "@mantine/core";
import { memo, useEffect, useRef, useState } from "react";

import { ExerciseTimedPitchesConfig } from "@/core/practice-session";
import clsx from "clsx";
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
  const notePool = useRef(getNotePool(config.notePool));
  const [note, setNote] = useState("");

  // store a ref to the metronome so we can pause/resume
  // eventually, I think this will move up to the parent component
  const metronomeRef = useRef<ReturnType<typeof createMetronome> | null>(null);

  useEffect(() => {
    const pitchGenerator = createPitchGenerator();
    metronomeRef.current = createMetronome({
      tempo: Math.round(config.tempo),
      beatsPerBar: 4,
      volume: 50,
      maxBeats: {
        count:
          config.numberOfCycles * config.beatsPerNote * notePool.current.length,
        onEnd,
      },
      beatInterval: {
        count: config.beatsPerNote,
        onBeatInterval: ({ currentInterval }) => {
          const currentNote =
            notePool.current[currentInterval % notePool.current.length];

          setNote(currentNote);
          pitchGenerator.play({
            frequency: noteFrequencies[currentNote],
            duration: 750,
            volume: 0.5,
          });
        },
      },
    });

    metronomeRef.current.start();

    return () => {
      metronomeRef.current?.stop();
      metronomeRef.current = null;
      pitchGenerator.dispose();
    };
  }, [config, onEnd]);

  function handlePauseResume() {
    if (!metronomeRef.current) {
      return;
    }

    return metronomeRef.current.getState().playbackState === "playing"
      ? metronomeRef.current.pause()
      : metronomeRef.current.resume();
  }

  return (
    <Flex direction="column" align="center">
      <Title order={3} my="sm">
        {config.title}
      </Title>
      <span
        className={clsx("c4p-note", { "is-invisible": !note })}
        onClick={handlePauseResume}
      >
        {note || "A"}
      </span>
    </Flex>
  );
}
export const TimedPitchesPlayer = memo(TimedPitchesPlayerRaw);
