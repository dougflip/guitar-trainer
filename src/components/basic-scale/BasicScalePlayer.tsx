import { BasicScaleConfig } from "@/core/exercises";
import { useInterval } from "@/hooks/useInterval";
import { useMetronome } from "@/hooks/useMetronome";

type BasicScalePlayerProps = {
  config: BasicScaleConfig;
  onEnd: () => void;
};

export function BasicScalePlayer({ config, onEnd }: BasicScalePlayerProps) {
  useMetronome({ enabled: true, ...config });
  // TODO: Maybe this moves up to the parent component?
  useInterval(onEnd, config.totalDuration * 1000);

  return <h1>Scales</h1>;
}
