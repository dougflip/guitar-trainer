import "./NoteRecognitionPlayer.css";

import { getRandomNote, noteFrequencies } from "@/core/notes";
import { useEffect, useState } from "react";

import { Button } from "@mantine/core";
import { NoteRecognitionConfig } from "@/core/note-recognition";
import { useInterval } from "@/hooks/useInterval";
import { useNote } from "@/hooks/useNote";

type NoteRecognitionPlayerProps = {
  config: NoteRecognitionConfig;
  onEnd: () => void;
};

export function NoteRecognitionPlayer({
  config,
  onEnd,
}: NoteRecognitionPlayerProps) {
  const [note, setNote] = useState<string>(getRandomNote());

  useInterval(() => {
    setNote(getRandomNote());
  }, config.noteDuration * 1000);

  useNote({
    frequency: noteFrequencies[note],
    duration: 750,
    enabled: config.playCurrentNote,
  });

  // TODO: Maybe this moves up to the parent component?
  useInterval(onEnd, config.totalDuration * 1000);

  return (
    <div className="nrp-container">
      <div className="nrp-note">{note}</div>
      <div>
        <Button onClick={onEnd}>Stop</Button>
      </div>
    </div>
  );
}
