import { useEffect, useRef } from "react";

/**
 * Runs your callback at a specified interval.
 *
 * https://www.joshwcomeau.com/snippets/react-hooks/use-interval/
 * See also: https://stackoverflow.com/a/53990887
 */
export function useInterval(callback: () => void, delay: number | null) {
  const intervalRef = useRef<number | null>(null);
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current || -1);
    }
  }, [delay]);

  return intervalRef;
}
