import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { immer } from 'zustand/middleware/immer';
import { Draft } from 'immer';

interface DispatchAction<T> {
  dispatch: (args: T) => void;
}

function createZustandStore<State, DispatchArgs>({
  initialState,
  reducer,
  subscribers,
}: {
  initialState: State;
  reducer: (state: Draft<State>, args: DispatchArgs) => void;
  subscribers?: Partial<Record<keyof State, (value: State[keyof State], previousValue: State[keyof State]) => void>>;
}) {
  const store = create(
    immer<State & DispatchAction<DispatchArgs>>((set) => ({
      ...initialState,
      dispatch: (args) => set((state) => reducer(state, args)),
    })),
  );

  for (const key of Object.keys(subscribers ?? {}) as Array<keyof State>) {
    const subscriber = subscribers?.[key];
    if (subscriber) {
      store.subscribe((state, prevState) => subscriber?.(state[key], prevState[key]));
    }
  }

  function getState(key: keyof State) {
    return store.getState()[key];
  }

  function useStore<T>(fn: (state: State) => T) {
    return store(useShallow(fn));
  }

  function useDispatch() {
    const dispatch = store((store) => store.dispatch);
    return (args: DispatchArgs) => dispatch(args);
  }

  return {
    store,
    getState: getState,
    useStore: useStore,
    useDispatch,
  };
}

export default createZustandStore;
