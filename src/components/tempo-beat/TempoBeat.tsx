import "@/components/tempo-beat/TempoBeat.css";

import { useEffect, useState } from "react";

import { Flex } from "@mantine/core";

type TempoBeatProps = {
  activeBeat: number;
  beats: number;
  color?: string;
};

export function TempoBeat({
  activeBeat = 0,
  beats = 4,
  color = "#228BE6",
}: TempoBeatProps) {
  // Validate activeBeat is within range
  const safeActiveBeat = Math.min(Math.max(0, activeBeat), beats - 1);

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
    <div className="tempo-beat-wrapper flex items-center justify-center space-x-8 p-8">
      {Array.from({ length: beats }).map((_, index) => (
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
