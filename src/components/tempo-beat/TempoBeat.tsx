import "@/components/tempo-beat/TempoBeat.css";

import { useEffect, useState } from "react";

import { Flex } from "@mantine/core";
import clsx from "clsx";

type TempoBeatProps = {
  activeBeat: number;
  totalBeats: number;
  color?: string;
  className?: string;
};

export function TempoBeat({
  activeBeat,
  totalBeats,
  color = "#228BE6",
  className,
}: TempoBeatProps) {
  // Validate activeBeat is within range
  const safeActiveBeat = Math.min(Math.max(0, activeBeat), totalBeats - 1);

  // Animation state
  const [scale, setScale] = useState(1);

  // Animate when activeBeat changes
  useEffect(() => {
    setScale(1.5);
    const timer = setTimeout(() => {
      setScale(1);
    }, 150);

    return () => clearTimeout(timer);
  }, [activeBeat]);

  return (
    <div className={clsx("tempo-beat-wrapper", className)}>
      {Array.from({ length: totalBeats }).map((_, index) => (
        <Flex
          key={index}
          align="center"
          justify="center"
          style={{
            width: "45px",
            height: "45px",
            transition: "all 200ms ease-in-out",
          }}
        >
          <div
            style={{
              backgroundColor: color,
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              transition: "all 200ms ease-in-out",
              opacity: index === safeActiveBeat ? 1 : 0.4,
              transform:
                index === safeActiveBeat ? `scale(${scale})` : "scale(1)",
              transformOrigin: "center",
            }}
          />
        </Flex>
      ))}
    </div>
  );
}
