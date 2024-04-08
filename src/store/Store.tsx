import { createContext, PropsWithChildren, useReducer } from "react";
import {
  IStoreContext,
  IStoreContextAction,
  IStoreDispatchContext,
} from "./types";

export const StoreContext = createContext<IStoreContext>(
  null as unknown as IStoreContext
);

export const StoreDispatchContext = createContext<IStoreDispatchContext>(
  null as unknown as IStoreDispatchContext
);

const defaultState: IStoreContext = {
  expertAddressList: [],
  clientAddressList: [],
  caseList: [],
};

const stateReducer = (state: IStoreContext, action: IStoreContextAction) => {
  switch (action.type) {
    case "add_expertAddressList": {
      return {
        ...state,
        expertAddressList: [...state.expertAddressList, action.value],
      };
    }
    case "add_clientAddressList": {
      return {
        ...state,
        clientAddressList: [...state.clientAddressList, action.value],
      };
    }
    case "add_case": {
      return {
        ...state,
        caseList: [...state.caseList, action.value],
      };
    }
    default: {
      return state;
    }
  }
};

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(stateReducer, defaultState);
  return (
    <StoreContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
};
