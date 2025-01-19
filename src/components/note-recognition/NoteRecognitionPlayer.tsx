import "./NoteRecognitionPlayer.css";

import { getRandomNote, noteFrequencies } from "@/core/notes";
import { useEffect, useState } from "react";

import { NoteRecognitionConfig } from "@/core/note-recognition";
import { createMetronome } from "@/core/sound/metronome";
import { createPitchGenerator } from "@/core/sound/pitch-generator";
import { useInterval } from "@/hooks/useInterval";

type NoteRecognitionPlayerProps = {
  config: NoteRecognitionConfig;
  onEnd: () => void;
};

export function NoteRecognitionPlayer({
  config,
  onEnd,
}: NoteRecognitionPlayerProps) {
  const [note, setNote] = useState<string>("");

  // Use the metronome's event to change/play notes
  useEffect(() => {
    const pitchGenerator = createPitchGenerator();
    const metronome = createMetronome({
      tempo: Math.round(60 / config.noteDuration),
      isSoundOn: false,
      onBeatEnd: () => {
        const note = getRandomNote();
        setNote(note);
        if (config.playCurrentNote) {
          pitchGenerator.play({
            frequency: noteFrequencies[note],
            duration: 750,
            volume: config.noteVolume,
          });
        }
      },
    });

    metronome.start();

    return () => {
      metronome.stop();
      pitchGenerator.dispose();
    };
  }, [config.noteDuration, config.noteVolume, config.playCurrentNote]);

  // TODO: Maybe this moves up to the parent component?
  useInterval(onEnd, config.totalDuration * 1000);

  return (
    <div className="nrp-container">
      {note && <div className="nrp-note">{note}</div>}
    </div>
  );
}
