import { UseMutationOptions, useMutation, MutationFunction } from "@tanstack/react-query";

export interface UseGenericMutationPropsType<TData, TError, TVariables> {
  onSuccessCb?: (data: TData) => void;
  onErrorCb?: (error: TError) => void;
  onMutateCb?: () => void;
  onSettledCb?: () => void;
  mutationFn: MutationFunction<TData, TVariables>;
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>;
}

export function useGenericMutation<TData, TError, TVariables>({
  onSuccessCb,
  onErrorCb,
  onMutateCb,
  onSettledCb,
  mutationFn,
  options = {},
}: UseGenericMutationPropsType<TData, TError, TVariables>) {
  const mutation = useMutation<TData, TError, TVariables>({
    mutationFn,
    ...options,
    onMutate: () => {
      if (onMutateCb) onMutateCb();
    },
    onSuccess: (data) => {
      if (onSuccessCb) onSuccessCb(data);
    },
    onError: (error) => {
      if ((error as any)?.response?.data?.serverErrorMessage) {
        alert((error as any).response.data.serverErrorMessage);
      }
      if (onErrorCb) onErrorCb(error);
    },
    onSettled: () => {
      if (onSettledCb) onSettledCb();
    },
  });

  return { mutation };
}
