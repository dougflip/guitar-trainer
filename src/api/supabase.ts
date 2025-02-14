import {
  PracticeSession,
  PracticeSessionFilters,
} from "@/core/practice-session";

import { SignInWithPasswordCreds } from "@/core/auth";
import { supabase } from "@/api/supabase-client";

export async function signInWithPassword(creds: SignInWithPasswordCreds) {
  return await supabase.auth.signInWithPassword(creds);
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function fetchPracticeSessions(
  filters: PracticeSessionFilters,
): Promise<PracticeSession[]> {
  let query = supabase
    .from("practice-sessions")
    .select("*")
    .order("title")
    .throwOnError();

  if (filters.owner === "mine") {
    query = query.eq("created_user", filters.currentUserId);
  }

  const { data } = await query;

  return data;
}

export async function fetchPracticeSession(
  id: number,
): Promise<PracticeSession> {
  const { data } = await supabase
    .from("practice-sessions")
    .select("*")
    .eq("id", id)
    .single()
    .throwOnError();

  return data;
}

export async function createPracticeSession({
  id: _,
  created_user: __,
  ...ps
}: PracticeSession): Promise<PracticeSession> {
  const response = await supabase
    .from("practice-sessions")
    .insert(ps)
    .throwOnError()
    .select()
    .single();

  return response.data;
}

export async function updatePracticeSession(
  ps: PracticeSession,
): Promise<PracticeSession> {
  const response = await supabase
    .from("practice-sessions")
    .update(ps)
    .eq("id", ps.id)
    .throwOnError()
    .select()
    .single();

  return response.data;
}

export async function deletePracticeSession(id: number): Promise<void> {
  await supabase.from("practice-sessions").delete().eq("id", id).throwOnError();
}
