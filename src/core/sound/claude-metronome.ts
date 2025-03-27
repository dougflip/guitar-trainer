type BeatEvent = {
  beatNumber: number; // Current beat in the bar (1-based)
  time: number; // Audio context time
  totalBeats: number; // Total beats since metronome started
};

type MetronomeConfig = {
  tempo: number;
  beatsPerBar: number;
  volume: number; // 0-100
  onBeatStart?: (event: BeatEvent) => void;
};

type PlaybackState = "playing" | "stopped" | "paused";

type MetronomeState = {
  playbackState: PlaybackState;
  currentBeat: number;
  totalBeats: number;
  nextNoteTime: number;
  audioContext: AudioContext | null;
  timerID: number | null;
  lookaheadMs: number; // How far ahead to schedule audio (in milliseconds)
};

export function createMetronome(config: MetronomeConfig) {
  const state: MetronomeState = {
    playbackState: "stopped",
    currentBeat: 0,
    totalBeats: 0,
    nextNoteTime: 0,
    audioContext: null,
    timerID: null,
    lookaheadMs: 25.0, // 25ms lookahead
  };

  let tempo = config.tempo;
  let beatsPerBar = config.beatsPerBar;
  let volume = config.volume / 100; // Convert to 0-1 range
  let onBeatStart = config.onBeatStart || ((event: BeatEvent) => {});

  // Calculate beat length in seconds based on tempo (BPM)
  const getBeatLength = () => 60.0 / tempo;

  // Create and configure audio context if it doesn't exist
  const initializeAudioContext = () => {
    if (!state.audioContext) {
      state.audioContext = new AudioContext();
    }
    return state.audioContext;
  };

  // Generate a click sound at the specified time
  const scheduleNote = (time: number) => {
    if (!state.audioContext) return;

    // Create oscillator
    const oscillator = state.audioContext.createOscillator();
    const gainNode = state.audioContext.createGain();

    // Configure oscillator
    // Use different frequency for the first beat of the bar
    oscillator.frequency.value =
      state.currentBeat % beatsPerBar === 0 ? 1000 : 800;

    // Configure volume
    gainNode.gain.value = volume;

    // Short duration click
    gainNode.gain.setValueAtTime(volume, time);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.03);

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(state.audioContext.destination);

    // Schedule and play
    oscillator.start(time);
    oscillator.stop(time + 0.03);

    // Create a separate oscillator just for precise callback timing
    // Calculate the actual beat number (1-based) to pass to the callback
    const beatNumber = state.currentBeat + 1;

    // Create a separate oscillator just for precise callback timing
    const callbackTrigger = state.audioContext.createOscillator();

    // Use minimal resources - inaudible frequency and no gain needed
    callbackTrigger.frequency.value = 1;

    // Set up the callback to fire exactly when the oscillator ends
    callbackTrigger.onended = () => {
      onBeatStart({
        beatNumber,
        time,
        totalBeats: state.totalBeats,
      });
    };

    // Schedule it to start and stop immediately at the exact time of the beat
    callbackTrigger.start(time);
    callbackTrigger.stop(time + 0.001); // Minimal duration to trigger onended
  };

  // Schedule notes ahead of time
  const scheduler = () => {
    if (!state.audioContext) return;

    // Convert lookahead from ms to seconds for audio scheduling
    const scheduleAheadTimeSec = state.lookaheadMs / 1000;

    // Schedule notes until we're a little ahead
    while (
      state.nextNoteTime <
      state.audioContext.currentTime + scheduleAheadTimeSec
    ) {
      scheduleNote(state.nextNoteTime);

      // Advance beat and time
      state.currentBeat = (state.currentBeat + 1) % beatsPerBar;
      state.totalBeats += 1;
      state.nextNoteTime += getBeatLength();
    }

    // Schedule next check
    state.timerID = window.setTimeout(scheduler, state.lookaheadMs);
  };

  // Start the metronome
  const start = () => {
    if (state.playbackState === "playing") return;

    const audioContext = initializeAudioContext();

    if (state.playbackState === "stopped") {
      // Not resuming, so reset the beat counter
      state.currentBeat = 0;
    }

    state.playbackState = "playing";
    state.nextNoteTime = audioContext.currentTime;

    scheduler();
  };

  // Stop the metronome
  const stop = () => {
    if (state.playbackState === "stopped") return;

    state.playbackState = "stopped";
    state.currentBeat = 0; // Reset beat counter
    state.totalBeats = 0; // Reset total beats counter

    if (state.timerID !== null) {
      window.clearTimeout(state.timerID);
      state.timerID = null;
    }
  };

  // Pause the metronome - maintains current beat position
  const pause = () => {
    if (state.playbackState !== "playing") return;

    state.playbackState = "paused";

    // Stop the scheduler
    if (state.timerID !== null) {
      window.clearTimeout(state.timerID);
      state.timerID = null;
    }
  };

  // Resume the metronome from paused state
  const resume = () => {
    if (state.playbackState !== "paused") return;

    // Move to the next beat when resuming
    state.currentBeat = (state.currentBeat + 1) % beatsPerBar;

    // Use start to handle the resumed state
    start();
  };

  // Update configuration
  const updateConfig = (newConfig: Partial<MetronomeConfig>) => {
    const wasPlaying = state.playbackState === "playing";

    // Stop if playing
    if (wasPlaying) {
      stop();
    }

    // Update values
    if (newConfig.tempo !== undefined) {
      tempo = newConfig.tempo;
    }

    if (newConfig.beatsPerBar !== undefined) {
      beatsPerBar = newConfig.beatsPerBar;
    }

    if (newConfig.volume !== undefined) {
      volume = newConfig.volume / 100;
    }

    if (newConfig.onBeatStart !== undefined) {
      onBeatStart = newConfig.onBeatStart || ((event: BeatEvent) => {});
    }

    // Restart if it was playing
    if (wasPlaying) {
      start();
    }
  };

  // Get current state
  const getState = () => ({
    playbackState: state.playbackState,
    tempo,
    beatsPerBar,
    volume: volume * 100,
    currentBeat: state.currentBeat,
    totalBeats: state.totalBeats,
  });

  return {
    start,
    stop,
    pause,
    resume,
    updateConfig,
    getState,
  };
}
