import { useCallback, useEffect, useState } from "react";

import { Exercise } from "@/core/exercises";
import { NoteRecognitionPlayer } from "@/components/note-recognition/NoteRecognitionPlayer";
import { useWakeLock } from "react-screen-wake-lock";

type TrainingPlayerProps = {
  exercises: Exercise[];
  onEnd: () => void;
};

/**
 * Can "play" through a training which is a collection of exercises.
 * An exercise is still TBD, but probably at a minumum is something with a total duration.
 */
export function TrainingPlayer({ exercises, onEnd }: TrainingPlayerProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const { request: requestWakeLock, release: releaseWakeLock } = useWakeLock();

  useEffect(() => {
    requestWakeLock();
    return () => {
      releaseWakeLock();
    };
  }, [requestWakeLock, releaseWakeLock]);

  const handleOnExerciseEnd = useCallback(() => {
    if (currentExerciseIndex === exercises.length - 1) {
      return onEnd();
    }

    setCurrentExerciseIndex((index) => index + 1);
  }, [currentExerciseIndex, exercises, onEnd]);

  return (
    <NoteRecognitionPlayer
      config={exercises[currentExerciseIndex].config}
      onEnd={handleOnExerciseEnd}
    />
  );
}
