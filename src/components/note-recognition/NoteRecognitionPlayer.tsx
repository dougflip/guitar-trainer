import "./NoteRecognitionPlayer.css";

import { Button } from "@mantine/core";
import { NoteRecognitionConfig } from "@/core/note-recognition";
import { getRandomNote } from "@/core/notes";
import { useInterval } from "@/hooks/useInterval";
import { useState } from "react";

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
