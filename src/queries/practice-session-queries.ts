import {
  PracticeSession,
  PracticeSessionFilters,
} from "@/core/practice-session";
import {
  UseMutationOptions,
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createPracticeSession,
  deletePracticeSession,
  fetchPracticeSession,
  fetchPracticeSessions,
  updatePracticeSession,
} from "@/api";

export const practiceSessionQueries = {
  all: () => ["practice-sessions"] as const,
  list: (filters: PracticeSessionFilters) =>
    queryOptions({
      queryKey: [...practiceSessionQueries.all(), "list", filters],
      queryFn: () => fetchPracticeSessions(filters),
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: [...practiceSessionQueries.all(), id],
      queryFn: () => fetchPracticeSession(id),
    }),
};

/**
 * Mutation to create a practice session.
 */
export function usePracticeSessionCreate(
  options: Partial<
    UseMutationOptions<PracticeSession, unknown, PracticeSession>
  > = {},
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: createPracticeSession,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(practiceSessionQueries.list());
      options.onSuccess?.(data, variables, context);
    },
  });
}

/**
 * Mutation to update a practice session.
 */
export function usePracticeSessionUpdate(
  options: Partial<
    UseMutationOptions<PracticeSession, unknown, PracticeSession>
  > = {},
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: updatePracticeSession,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(practiceSessionQueries.list());
      queryClient.setQueryData(
        practiceSessionQueries.detail(data.id).queryKey,
        data,
      );
      options.onSuccess?.(data, variables, context);
    },
  });
}

/**
 * Mutation to delete a practice session.
 */
export function usePracticeSessionDelete(
  options: Partial<UseMutationOptions<void, unknown, number>> = {},
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: deletePracticeSession,
    onSuccess: (data, variables, context) => {
      queryClient.removeQueries(practiceSessionQueries.detail(variables));
      queryClient.invalidateQueries(practiceSessionQueries.list());
      options.onSuccess?.(data, variables, context);
    },
  });
}
