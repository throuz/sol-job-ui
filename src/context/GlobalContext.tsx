import { createContext, PropsWithChildren, useReducer } from "react";
import {
  EStatus,
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
  status: EStatus.Nothing,
  platformAddress: "7VmTfGAKXbFCwjJsamN92X1kFobgPMdp9VbUT3LswGnW",
  expertAddress: "",
  clientAddress: "",
  caseAmount: 0,
  expertDeposit: 0,
  clientDeposit: 0,
};

const stateReducer = (state: IGlobalContext, action: IGlobalContextAction) => {
  switch (action.type) {
    case "status": {
      return {
        ...state,
        status: action.value,
      };
    }
    case "platformAddress": {
      return {
        ...state,
        platformAddress: action.value,
      };
    }
    case "expertAddress": {
      return {
        ...state,
        expertAddress: action.value,
      };
    }
    case "clientAddress": {
      return {
        ...state,
        clientAddress: action.value,
      };
    }
    case "caseAmount": {
      return {
        ...state,
        caseAmount: action.value,
      };
    }
    case "expertDeposit": {
      return {
        ...state,
        expertDeposit: action.value,
      };
    }
    case "clientDeposit": {
      return {
        ...state,
        clientDeposit: action.value,
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
