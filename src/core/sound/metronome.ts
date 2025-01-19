type QueuedNote = { note: number; time: number };

type TimeoutId = ReturnType<typeof setTimeout>;

export type MetronomeConfig = {
  tempo: number;
  beatsPerBar?: number;
  isSoundOn?: boolean;
  onBeatEnd?: (beatNumber: number) => void;
  onMeasureEnd?: () => void;
};

/**
 * Returns a metronome object that can be started, stopped, and toggled.
 *
 * Adapted from:
 * https://github.com/grantjames/metronome/blob/master/metronome.js
 * https://grantjam.es/creating-a-simple-metronome-using-javascript-and-the-web-audio-api/
 */
export function createMetronome({
  tempo,
  beatsPerBar = 4,
  isSoundOn = true,
  onBeatEnd,
  onMeasureEnd,
}: MetronomeConfig) {
  const notesInQueue: QueuedNote[] = []; // notes that have been put into the web audio and may or may not have been played yet {note, time}
  const lookahead = 25; // How frequently to call scheduling function (in milliseconds)
  const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)

  let audioContext: AudioContext | null = null;
  let currentBeatInBar = 0;
  let nextNoteTime = 0.0; // when the next note is due
  let isRunning = false;
  let intervalId: TimeoutId | null = null;

  function nextNote() {
    // Advance current note and time by a quarter note (crotchet if you're posh)
    const secondsPerBeat = 60.0 / tempo; // Notice this picks up the CURRENT tempo value to calculate beat length.
    nextNoteTime += secondsPerBeat; // Add beat length to last beat time

    currentBeatInBar++; // Advance the beat number, wrap to zero
    if (currentBeatInBar == beatsPerBar) {
      currentBeatInBar = 0;
    }
  }

  function scheduleNote(beatNumber: number, time: number) {
    if (audioContext === null) {
      return;
    }

    // push the note on the queue, even if we're not playing.
    notesInQueue.push({ note: beatNumber, time: time });

    // create an oscillator
    const osc = audioContext.createOscillator();
    const envelope = audioContext.createGain();

    osc.frequency.value = beatNumber % beatsPerBar == 0 ? 1000 : 800;
    envelope.gain.value = isSoundOn ? 1 : 0;
    envelope.gain.exponentialRampToValueAtTime(
      isSoundOn ? 1 : 0.001,
      time + 0.001,
    );
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

    osc.connect(envelope);
    envelope.connect(audioContext.destination);

    osc.start(time);
    osc.stop(time + 0.03);
    osc.onended = () => {
      onBeatEnd?.(beatNumber);
      if (beatNumber % beatsPerBar === 0) {
        onMeasureEnd?.();
      }
    };
  }

  function scheduler() {
    if (audioContext === null) {
      return;
    }
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
      scheduleNote(currentBeatInBar, nextNoteTime);
      nextNote();
    }
  }

  function start() {
    if (isRunning) return;

    if (audioContext == null) {
      audioContext = new window.AudioContext();
    }

    isRunning = true;

    currentBeatInBar = 0;
    nextNoteTime = audioContext.currentTime + 0.05;

    intervalId = setInterval(() => scheduler(), lookahead);
  }

  function stop() {
    isRunning = false;

    clearInterval(intervalId || -1);
  }

  function toggle() {
    if (isRunning) {
      stop();
    } else {
      start();
    }
  }

  return {
    start,
    stop,
    toggle,
  };
}
