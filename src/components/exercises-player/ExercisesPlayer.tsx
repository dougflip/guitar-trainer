import { Button, Center } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";

import { Exercise } from "@/core/practice-session";
import { TimedPitchesPlayer } from "@/components/timed-pitches/timed-pitches-player";
import { useWakeLock } from "react-screen-wake-lock";

type ExercisesPlayerProps = {
  exercises: Exercise[];
  onEnd: () => void;
};

function renderExercise(exercise: Exercise, onEnd: () => void) {
  switch (exercise.type) {
    case "timed-pitches":
      return <TimedPitchesPlayer config={exercise.config} onEnd={onEnd} />;
  }
}

/**
 * Can "play" through a collection of exercises.
 */
export function ExercisesPlayer({ exercises, onEnd }: ExercisesPlayerProps) {
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
    <>
      {renderExercise(exercises[currentExerciseIndex], handleOnExerciseEnd)}
      <Center>
        <Button onClick={onEnd}>Exit</Button>
      </Center>
    </>
  );
}
