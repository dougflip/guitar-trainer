import { Button, Input, Slider } from "@mantine/core";

import { useMetronome } from "@/hooks/useMetronome";

export function Metronome() {
  const metronome = useMetronome({
    beatsPerBar: 4,
    tempo: 90,
    volume: 50,
  });

  const { tempo, volume, ...state } = metronome.getState();

  return (
    <div>
      <h1>Metronome</h1>
      <form>
        <Input.Wrapper label="Tempo BPM" mb="xl">
          <Slider
            labelAlwaysOn
            min={40}
            max={180}
            defaultValue={tempo}
            onChangeEnd={(tempo) => metronome.updateConfig({ tempo })}
            marks={[
              { value: 40, label: "40 bpm" },
              { value: 60, label: "60 bpm" },
              { value: 80, label: "80 bpm" },
              { value: 100, label: "100 bpm" },
              { value: 120, label: "120 bpm" },
              { value: 140, label: "140 bpm" },
              { value: 160, label: "160 bpm" },
              { value: 180, label: "180 bpm" },
            ]}
          />
        </Input.Wrapper>

        <Input.Wrapper label="Volume" mb="xl">
          <Slider
            labelAlwaysOn
            min={0}
            max={100}
            defaultValue={volume}
            onChangeEnd={(volume) => metronome.updateConfig({ volume })}
            marks={[{ value: 25 }, { value: 50 }, { value: 75 }]}
          />
        </Input.Wrapper>
      </form>
      {state.playbackState !== "playing" && (
        <Button onClick={metronome.start}>Play</Button>
      )}
      {state.playbackState === "playing" && (
        <Button onClick={metronome.pause}>Pause</Button>
      )}
    </div>
  );
}
