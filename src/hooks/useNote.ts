import { useEffect } from "react";

type UseNoteParams = {
  enabled?: boolean;
  frequency: number;
  duration: number;
};

export function useNote({ frequency, duration, enabled }: UseNoteParams) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const audioContext = new window.AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "triangle"; // You can change this to "square", "sawtooth", "triangle" for different sounds
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    setTimeout(() => {
      gainNode.gain.exponentialRampToValueAtTime(
        0.00001,
        audioContext.currentTime + 0.1,
      );
    }, duration);

    return () => {
      oscillator.stop();
      audioContext.close();
    };
  }, [frequency, duration, enabled]);
}
