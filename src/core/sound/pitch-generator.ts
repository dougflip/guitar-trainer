import { Milliseconds } from "@/core/base";

type CreatePitchGeneratorArgs = {
  oscillatorType?: OscillatorType;
};

type PlayPitchArgs = {
  frequency: number;
  duration: Milliseconds;
  volume?: number;
};

export function createPitchGenerator({
  oscillatorType = "triangle",
}: CreatePitchGeneratorArgs = {}) {
  const audioContext = new window.AudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  oscillator.type = oscillatorType;
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();

  return {
    /**
     * Plays a pitch for a specified duration.
     */
    play({ frequency, duration, volume }: PlayPitchArgs) {
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

      // small fade in time
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        volume || 0.5,
        audioContext.currentTime + 0.05,
      );

      // fade out the sound to avoid a "click" from a sharp stop
      // still hearing a click - especially in headphones - but it is better.
      // in the end, we may want to play samples anyway, we'll see

      // TODO: Instead of a timeout try to use an interval
      //   and keep track of how much time has elapsed.
      // We should also ensure (from the parent) that the note is given
      // enough time to play before the component is unmounted.
      timeoutId = setTimeout(() => {
        gainNode.gain.linearRampToValueAtTime(
          0,
          audioContext.currentTime + 0.1,
        );
        timeoutId = null;
      }, duration - 100);
    },
    /**
     * Cleans up resources when the generator is no longer needed.
     * Helpful for disposing of this when used in a React `useEffect` hook.
     */
    dispose() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      oscillator.stop();
      audioContext.close();
    },
  };
}
