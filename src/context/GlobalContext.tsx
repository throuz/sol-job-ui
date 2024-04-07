import { createContext, PropsWithChildren, useReducer } from "react";
import {
  EContractStatus,
  IGlobalContext,
  IGlobalContextAction,
  IGlobalDispatchContext,
} from "./types";

export const GlobalContext = createContext<IGlobalContext>(
  null as unknown as IGlobalContext
);

export const GlobalDispatchContext = createContext<IGlobalDispatchContext>(
  null as unknown as IGlobalDispatchContext
);

const defaultState: IGlobalContext = {
  contractStatus: EContractStatus.Nothing,
};

const stateReducer = (state: IGlobalContext, action: IGlobalContextAction) => {
  switch (action.type) {
    case "contractStatus": {
      return {
        ...state,
        contractStatus: action.contractStatus,
      };
    }
    default: {
      return state;
    }
  }
};

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(stateReducer, defaultState);
  return (
    <GlobalContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalContext.Provider>
  );
};
