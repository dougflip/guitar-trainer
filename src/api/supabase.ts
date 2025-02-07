import { PracticeSession } from "@/core/practice-session";
import { SignInWithPasswordCreds } from "@/core/auth";
import { supabase } from "@/api/supabase-client";

export async function fetchUser() {
  return supabase.auth.getUser();
}

export async function signInWithPassword(creds: SignInWithPasswordCreds) {
  return await supabase.auth.signInWithPassword(creds);
}

export async function fetchPracticeSessions(): Promise<PracticeSession[]> {
  const { data } = await supabase
    .from("practice-sessions")
    .select("*")
    .order("title")
    .throwOnError();

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
