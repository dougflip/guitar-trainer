import { PracticeSession } from "@/core/practice-session";

const lsPracticeSessionsKey = "dougflip:guitar-trainer:practice-sessions";

type PracticeSessionsInStorage = Record<string, PracticeSession>;

function readAllSessions(): PracticeSessionsInStorage {
  const itemJsonOrNull = localStorage.getItem(lsPracticeSessionsKey);
  return itemJsonOrNull ? JSON.parse(itemJsonOrNull) : {};
}

/**
 * Fetches all practice sessions.
 */
export function fetchPracticeSessions(): PracticeSession[] {
  try {
    const items: PracticeSessionsInStorage = readAllSessions();
    return Object.values(items);
  } catch (error) {
    console.error("Error fetching practice session", error);
    return [];
  }
}

export function fetchPracticeSession(id: string): PracticeSession {
  const items: PracticeSessionsInStorage = readAllSessions();
  return items[id];
}

/**
 * Creates a new practice session.
 */
export function createPracticeSession(ts: PracticeSession) {
  // read and parse practice sessions from local storage
  try {
    const items: PracticeSessionsInStorage = readAllSessions();
    const itemWithId = { ...ts, id: crypto.randomUUID() };
    localStorage.setItem(
      lsPracticeSessionsKey,
      JSON.stringify({ ...items, [itemWithId.id]: itemWithId }),
    );
    return itemWithId;
  } catch (error) {
    console.error("Error creating practice session", error);
    return ts;
  }
}

export function updatePracticeSession(ts: PracticeSession): PracticeSession {
  try {
    const items: PracticeSessionsInStorage = readAllSessions();
    localStorage.setItem(
      lsPracticeSessionsKey,
      JSON.stringify({ ...items, [ts.id]: ts }),
    );
    return ts;
  } catch (error) {
    console.error("Error updating practice session", error);
    return ts;
  }
}

export function deletePracticeSession(id: string): PracticeSession[] {
  try {
    const items: PracticeSessionsInStorage = readAllSessions();
    delete items[id];
    localStorage.setItem(lsPracticeSessionsKey, JSON.stringify(items));
    return Object.values(items);
  } catch (error) {
    console.error("Error deleting practice session", error);
    return [];
  }
}
