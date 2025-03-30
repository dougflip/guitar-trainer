import { ActionIcon, Button, Flex } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

import { Exercise } from "@/core/practice-session";
import { TimedPitchesPlayer } from "@/components/timed-pitches/TimedPitchesPlayer";
import { useWakeLock } from "react-screen-wake-lock";

type ExercisesPlayerProps = {
  exercises: Exercise[];
  onEnd: () => void;
};

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
      <TimedPitchesPlayer
        key={currentExerciseIndex}
        config={exercises[currentExerciseIndex].config}
        onEnd={handleOnExerciseEnd}
      />
      <Flex justify="space-between" gap="sm" my="md">
        <ActionIcon
          onClick={() => setCurrentExerciseIndex((x) => x - 1)}
          disabled={currentExerciseIndex === 0}
        >
          <IconChevronLeft />
        </ActionIcon>
        <Button onClick={onEnd}>Exit</Button>
        <ActionIcon
          onClick={() => setCurrentExerciseIndex((x) => x + 1)}
          disabled={currentExerciseIndex === exercises.length - 1}
        >
          <IconChevronRight />
        </ActionIcon>
      </Flex>
    </>
  );
}
