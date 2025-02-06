import { PageError } from "@/components/errors/PageError";
import { PageLoader } from "@/components/loaders/PageLoader";
import { ReactNode } from "react";

export type RemoteDataRenderOptions = {
  /**
   * Indicates if updated data is currently being fetched/refreshed.
   */
  isFetching: boolean;
  isFetchingProps: { opacity?: number };
};

export type RemoteDataProps<Data, Err> = {
  /**
   * Indicates if this is the intial load of data.
   */
  isLoading: boolean;
  /**
   * Indicates if data is being fetched post initial load.
   * We'll feed this value to your render function as it can be
   * useful to give user feedback that a fetch is in progress.
   */
  isFetching: boolean;
  error: Err | undefined;
  data: Data | undefined;
  render: (data: Data, options: RemoteDataRenderOptions) => JSX.Element;
  loadingMessage?: ReactNode;
  renderLoading?: () => ReactNode;
  renderError?: (props: { error: Err; refetch: () => void }) => ReactNode;
  refetch: () => void;
};

/**
 * Helper to render data that is fetched async.
 * Encapsulates the idea of different "states" like
 * loading, error, data available.
 *
 * You can wrap this to default standard UI elements for loading
 * and error for example.
 */
export function RemoteData<Data, Err>({
  isLoading,
  isFetching,
  error,
  data,
  refetch,
  loadingMessage,
  renderLoading = () => <PageLoader title="Fetching..." />,
  renderError = (props) => <PageError {...props} />,
  render,
}: RemoteDataProps<Data, Err>) {
  if (isLoading) {
    return loadingMessage ? (
      <PageLoader title={loadingMessage} />
    ) : (
      renderLoading()
    );
  }

  if (error) {
    return renderError({ error, refetch });
  }

  if (data) {
    return render(data, {
      isFetching,
      isFetchingProps: { opacity: isFetching ? 0.5 : 1 },
    });
  }

  return <></>;
}
