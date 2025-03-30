import {
  Button,
  Center,
  Container,
  Flex,
  Input,
  Slider,
  Text,
} from "@mantine/core";

import { TempoBeat } from "@/components/tempo-beat/TempoBeat";
import { useMetronome } from "@/hooks/useMetronome";
import { useState } from "react";

export function Metronome() {
  const [activeBeat, setActiveBeat] = useState(0);
  const metronome = useMetronome({
    beatsPerBar: 4,
    tempo: 75,
    volume: 50,
    onBeatStart: ({ beatNumber }) => {
      setActiveBeat(beatNumber - 1);
    },
  });

  const { tempo, volume, ...state } = metronome.getState();

  return (
    <div>
      <Center>
        <Text size="4rem" my="lg">
          {tempo} bpm
        </Text>
      </Center>
      <TempoBeat totalBeats={4} activeBeat={activeBeat} />
      <Flex align="center" justify="center" my="lg">
        {state.playbackState !== "playing" && (
          <Button onClick={metronome.start} size="xl">
            Play
          </Button>
        )}
        {state.playbackState === "playing" && (
          <Button onClick={metronome.pause} size="xl">
            Pause
          </Button>
        )}
      </Flex>
      <Container maw={400} mx="auto">
        <form>
          <Input.Wrapper label="Tempo" mb="xl">
            <Slider
              min={40}
              max={180}
              label={(x) => `${x} bpm`}
              defaultValue={tempo}
              onChangeEnd={(tempo) => metronome.updateConfig({ tempo })}
            />
          </Input.Wrapper>

          <Input.Wrapper label="Volume" mb="xl">
            <Slider
              min={0}
              max={100}
              defaultValue={volume}
              onChangeEnd={(volume) => metronome.updateConfig({ volume })}
            />
          </Input.Wrapper>
        </form>
      </Container>
    </div>
  );
}
