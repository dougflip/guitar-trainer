import { Exercise } from "@/core/exercises";

export type TrainingSession = {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
};
