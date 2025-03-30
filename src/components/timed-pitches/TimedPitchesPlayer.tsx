import "./TimedPitchesPlayer.css";

import { Flex, Progress, Title } from "@mantine/core";
import { memo, useEffect, useRef, useState } from "react";

import { ExerciseTimedPitchesConfig } from "@/core/practice-session";
import { TempoBeat } from "@/components/tempo-beat/TempoBeat";
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
  const [beatNum, setBeatNum] = useState(0);
  const [progress, setProgress] = useState(0);
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

          setProgress(
            ((currentInterval + 1) /
              (config.numberOfCycles * notePool.current.length)) *
              100,
          );

          pitchGenerator.play({
            frequency: noteFrequencies[currentNote],
            duration: 750,
            volume: 0.5,
          });
        },
      },
      onBeatStart: ({ beatNumber }) => {
        setBeatNum(beatNumber - 1);
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
      <Title order={3}>{config.title}</Title>
      <span
        className={clsx("c4p-note", { "is-invisible": !note })}
        onClick={handlePauseResume}
      >
        {note || "A"}
      </span>
      <TempoBeat activeBeat={beatNum} totalBeats={4} />
      <Progress
        my="md"
        value={progress}
        size="lg"
        style={{ alignSelf: "stretch" }}
        transitionDuration={200}
      />
    </Flex>
  );
}
export const TimedPitchesPlayer = memo(TimedPitchesPlayerRaw);
