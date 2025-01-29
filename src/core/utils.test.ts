import { describe, expect, it } from "vitest";
import {
  getTimeForPracticeSession,
  getTimeForSingleExercise,
  secondsToApproximateMinutes,
  secondsToMinutes,
} from "@/core/utils";
import {
  makePracticeSession,
  makeTimedPitchesExercise,
} from "@/core/practice-session";

describe("utils", () => {
  describe("getTimeForSingleExercise", () => {
    it("returns the correct time for 1 cycle of circle of fourths", () => {
      const exercise = makeTimedPitchesExercise({
        tempo: 60,
        beatsPerNote: 4,
        numberOfCycles: 1,
        notes: { kind: "circle-of-fourths" },
      });

      expect(getTimeForSingleExercise(exercise)).toBe(48);
    });

    it("returns the correct time for 3 cycles of circle of fourths", () => {
      const exercise = makeTimedPitchesExercise({
        tempo: 120,
        beatsPerNote: 4,
        numberOfCycles: 3,
        notes: { kind: "circle-of-fourths" },
      });

      expect(getTimeForSingleExercise(exercise)).toBe(72);
    });

    it("returns the correct time for 2 beats per note", () => {
      const exercise = makeTimedPitchesExercise({
        tempo: 60,
        beatsPerNote: 2,
        numberOfCycles: 2,
        notes: { kind: "circle-of-fourths" },
      });

      expect(getTimeForSingleExercise(exercise)).toBe(48);
    });
  });

  describe("getTimeForPracticeSession", () => {
    it("returns the correct time for a practice session", () => {
      const session = makePracticeSession({
        exercises: [
          makeTimedPitchesExercise({
            tempo: 60,
            beatsPerNote: 4,
            numberOfCycles: 1,
            notes: { kind: "circle-of-fourths" },
          }),
          makeTimedPitchesExercise({
            tempo: 120,
            beatsPerNote: 4,
            numberOfCycles: 3,
            notes: { kind: "circle-of-fourths" },
          }),
          makeTimedPitchesExercise({
            tempo: 60,
            beatsPerNote: 2,
            numberOfCycles: 2,
            notes: { kind: "circle-of-fourths" },
          }),
        ],
      });

      expect(getTimeForPracticeSession(session)).toBe(168);
    });
  });

  describe("secondsToMinutes", () => {
    it("converts seconds to minutes", () => {
      expect(secondsToMinutes(60)).toBe("1:00");
      expect(secondsToMinutes(120)).toBe("2:00");
      expect(secondsToMinutes(121)).toBe("2:01");
      expect(secondsToMinutes(122)).toBe("2:02");
    });
  });

  describe("secondsToApproximateMinutes", () => {
    it("converts seconds to approximate minutes", () => {
      expect(secondsToApproximateMinutes(0)).toBe("0s");
      expect(secondsToApproximateMinutes(32)).toBe("30s");
      expect(secondsToApproximateMinutes(60)).toBe("1m");
      expect(secondsToApproximateMinutes(120)).toBe("2m");
      expect(secondsToApproximateMinutes(122)).toBe("2m");
      expect(secondsToApproximateMinutes(135)).toBe("2m 15s");
      expect(secondsToApproximateMinutes(155)).toBe("2m 30s");
    });
  });
});
