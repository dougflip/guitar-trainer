import "./TimedPitchesPlayer.css";

import { Button, Flex, Title } from "@mantine/core";
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
      // see if we can push more down into the metronome
      // events:
      //  - one for when a note should change - what would the generic term be?
      //  - one for when it "repeats" based on the config?
      //  - onEnd: inform the metronome of total beats and it can fire an event
      //            and clean itself up after that many beats
      // Basically push down all of these decisions to the metronome so it can alert
      // consumers when they happen
      // Just need to think of good names for these things
      // But then the components become much simpler
      onBeatStart: ({ totalBeats }) => {
        // Check if the current beat is the start of a note interval
        if ((totalBeats - 1) % config.beatsPerNote === 0) {
          // Calculate the note index based on the total beats
          const noteIndex =
            Math.floor((totalBeats - 1) / config.beatsPerNote) %
            notePool.current.length;

          // Determine the current cycle
          const cycleIndex = Math.floor(
            (totalBeats - 1) / (config.beatsPerNote * notePool.current.length),
          );

          // End the exercise if the cycle limit is reached
          if (cycleIndex >= config.numberOfCycles) {
            onEnd();
            return;
          }

          // Get the current note from the note pool
          const currentNote = notePool.current[noteIndex];

          // Update the state with the current note
          setNote(currentNote);

          // Play the note using the pitch generator
          pitchGenerator.play({
            frequency: noteFrequencies[currentNote],
            duration: 750, // Adjust duration as needed
            volume: 0.5, // Adjust volume as needed
          });
        }
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
