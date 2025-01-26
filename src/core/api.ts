import { TrainingSession } from "@/core/training-session";

const lsTrainingSessionsKey = "dougflip:guitar-trainer:training-sessions";

type TrainingSessionsInStorage = Record<string, TrainingSession>;

function readAllSessions(): TrainingSessionsInStorage {
  const itemJsonOrNull = localStorage.getItem(lsTrainingSessionsKey);
  return itemJsonOrNull ? JSON.parse(itemJsonOrNull) : {};
}

/**
 * Fetches all training sessions.
 */
export function fetchTrainingSessions(): TrainingSession[] {
  try {
    const items: TrainingSessionsInStorage = readAllSessions();
    return Object.values(items);
  } catch (error) {
    console.error("Error fetching training session", error);
    return [];
  }
}

export function fetchTrainingSession(id: string): TrainingSession {
  const items: TrainingSessionsInStorage = readAllSessions();
  return items[id];
}

/**
 * Creates a new training session.
 */
export function createTrainingSession(ts: TrainingSession) {
  // read and parse training sessions from local storage
  try {
    const items: TrainingSessionsInStorage = readAllSessions();
    const itemWithId = { ...ts, id: crypto.randomUUID() };
    localStorage.setItem(
      lsTrainingSessionsKey,
      JSON.stringify({ ...items, [itemWithId.id]: itemWithId }),
    );
    return itemWithId;
  } catch (error) {
    console.error("Error creating training session", error);
    return ts;
  }
}

export function updateTrainingSession(ts: TrainingSession): TrainingSession {
  try {
    const items: TrainingSessionsInStorage = readAllSessions();
    localStorage.setItem(
      lsTrainingSessionsKey,
      JSON.stringify({ ...items, [ts.id]: ts }),
    );
    return ts;
  } catch (error) {
    console.error("Error updating training session", error);
    return ts;
  }
}

export function deleteTrainingSession(id: string): TrainingSession[] {
  try {
    const items: TrainingSessionsInStorage = readAllSessions();
    delete items[id];
    localStorage.setItem(lsTrainingSessionsKey, JSON.stringify(items));
    return Object.values(items);
  } catch (error) {
    console.error("Error deleting training session", error);
    return [];
  }
}
