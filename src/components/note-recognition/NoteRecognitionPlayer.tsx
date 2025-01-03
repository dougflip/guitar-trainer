import { useEffect, useState } from "react";

import { Button } from "@mantine/core";
import { NoteRecognitionConfig } from "@/core/note-recognition";
import { getRandomNote } from "@/core/notes";
import { useInterval } from "@/hooks/useInterval";

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

  useInterval(onEnd, config.totalDuration * 1000);

  return (
    <div>
      <h1>{note}</h1>
      <Button onClick={onEnd}>Stop</Button>
    </div>
  );
}
