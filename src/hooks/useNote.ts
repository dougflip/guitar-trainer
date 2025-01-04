import { useEffect } from "react";

type UseNoteParams = {
  frequency: number;
  duration: number;
  volume?: number;
  enabled?: boolean;
};

export function useNote({
  frequency,
  duration,
  enabled,
  volume = 0.5,
}: UseNoteParams) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const audioContext = new window.AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime); // Set the volume
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    setTimeout(
      () => {
        gainNode.gain.exponentialRampToValueAtTime(
          0.00001,
          audioContext.currentTime + 0.1,
        );
      },
      duration - 0.1 * 1000,
    );

    return () => {
      oscillator.stop();
      audioContext.close();
    };
  }, [frequency, duration, enabled, volume]);
}
