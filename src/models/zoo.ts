import createZustandStore from '.';

export enum ZooAction {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  SET = 'SET',
}

type DispatchArgs =
  | {
      type: ZooAction.INCREASE;
    }
  | {
      type: ZooAction.DECREASE;
    }
  | {
      type: ZooAction.SET;
      payload: number;
    };

interface State {
  zoo: {
    bear: number;
  };
}

const reducer = (state: State, arg: DispatchArgs) => {
  switch (arg.type) {
    case ZooAction.INCREASE:
      state.zoo.bear += 1;
      break;

    case ZooAction.DECREASE:
      state.zoo.bear -= 1;
      break;

    case ZooAction.SET:
      state.zoo.bear = arg.payload;
      break;
  }
};

export const { store, getState, useStore, useDispatch } = createZustandStore<State, DispatchArgs>({
  initialState: { zoo: { bear: 0 } },
  reducer,
});

export async function fetchAndSetBear() {
  const bearCount = await fetchBearCount();
  store.setState((state) => {
    state.zoo.bear = bearCount;
  });

  return bearCount;
}

function fetchBearCount() {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(100), 2000);
  });
}
