import {
  UseMutationOptions,
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deletePracticeSession,
  fetchPracticeSession,
  fetchPracticeSessions,
} from "@/api";

export const practiceSessionQueries = {
  all: () => ["practice-sessions"] as const,
  list: () =>
    queryOptions({
      queryKey: [...practiceSessionQueries.all(), "list"],
      queryFn: fetchPracticeSessions,
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: [...practiceSessionQueries.all(), id],
      queryFn: () => fetchPracticeSession(id),
    }),
};

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
