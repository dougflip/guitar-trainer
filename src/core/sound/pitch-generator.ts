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

  return {
    /**
     * Plays a pitch for a specified duration.
     */
    play({ frequency, duration = 750, volume = 0.5 }: PlayPitchArgs) {
      const osc = audioContext.createOscillator();
      const envelope = audioContext.createGain();
      const time = audioContext.currentTime;

      osc.type = oscillatorType;
      osc.frequency.value = frequency;
      envelope.gain.value = volume;
      envelope.gain.exponentialRampToValueAtTime(volume, time + 0.001);
      envelope.gain.exponentialRampToValueAtTime(
        0.001,
        time + duration / 1000 - 0.01,
      );

      osc.connect(envelope);
      envelope.connect(audioContext.destination);

      osc.start(time);
      osc.stop(time + duration / 1000);
    },
    /**
     * Cleans up resources when the generator is no longer needed.
     * Helpful for disposing of this when used in a React `useEffect` hook.
     */
    dispose() {
      audioContext.close();
    },
  };
}
