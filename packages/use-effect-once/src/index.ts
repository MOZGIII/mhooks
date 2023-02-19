import { DependencyList, useCallback, useEffect, useMemo, useRef } from "react";

export type UncancellableEffectCallback = () => void;

export type Reset = () => void;

function usePersistentEffect(
  effect: UncancellableEffectCallback,
  deps?: DependencyList | undefined
): Reset {
  const triggered = useRef(false);
  const reset = useCallback(() => {
    triggered.current = false;
  }, [triggered]);

  // Reset if dependencies change, or never if no dependencies are defined.
  // If the state is preserved as the new react promises - the memorized
  // callback won't be re-evaluated, and the `reset` won't be issued.
  useMemo(() => {
    reset();
  }, deps || []);

  // If already triggered - do nothing.
  // Else, mark it as triggered and run the effect callback.
  useEffect(() => {
    if (triggered.current) {
      return;
    }
    triggered.current = true;

    return effect();
  }, deps);

  return reset;
}

export default usePersistentEffect;
