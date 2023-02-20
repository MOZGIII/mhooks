import { useCallback, useEffect, useRef } from "react";

export type GetAbortControllerFn = () => AbortController | null;
export type GetSignalFn = () => AbortSignal | void;

export type UseAbortControllerResult = {
  getAbortController: GetAbortControllerFn;
  getSignal: GetSignalFn;
};

function useAbortController(): UseAbortControllerResult {
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const capturedAbortController = new AbortController();
    abortControllerRef.current = capturedAbortController;
    const cleanup = () => {
      capturedAbortController.abort();
    };
    return cleanup;
  }, []);

  const getAbortController = useCallback(
    () => abortControllerRef.current,
    [abortControllerRef]
  );
  const getSignal = useCallback(
    () => abortControllerRef.current?.signal,
    [abortControllerRef]
  );

  return { getAbortController, getSignal };
}

export default useAbortController;
