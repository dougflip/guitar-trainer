import "./App.css";

import {
  NoteRecognitionConfig,
  getDefaultNoteRecognitionConfig,
} from "@/core/note-recognition";
import { useCallback, useState } from "react";

import NoteRecognitionForm from "./components/note-recognition/NoteRecognitionForm";
import { NoteRecognitionPlayer } from "@/components/note-recognition/NoteRecognitionPlayer";
import { useWakeLock } from "react-screen-wake-lock";

type ScreenState = "form" | "playing";

function App() {
  const [screenState, setScreenState] = useState<ScreenState>("form");
  const [noteRecConfig, setNoteRecConfig] = useState<NoteRecognitionConfig>(
    getDefaultNoteRecognitionConfig(),
  );

  const { request: requestWakeLock, release: releaseWakeLock } = useWakeLock();

  function handleNoteRedFormSubmit(data: NoteRecognitionConfig) {
    setNoteRecConfig(data);
    setScreenState("playing");
    requestWakeLock();
  }

  const handleOnEnd = useCallback(() => {
    setScreenState("form");
    releaseWakeLock();
  }, [releaseWakeLock]);

  return (
    <div className="guitar-trainer-app">
      {screenState === "form" && (
        <NoteRecognitionForm
          data={noteRecConfig}
          onSubmit={handleNoteRedFormSubmit}
        />
      )}
      {screenState === "playing" && (
        <NoteRecognitionPlayer config={noteRecConfig} onEnd={handleOnEnd} />
      )}
    </div>
  );
}

export default App;
