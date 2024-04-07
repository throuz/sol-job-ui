import { useContext } from "react";
import { GlobalContext, GlobalDispatchContext } from "./GlobalContext";

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const useGlobalDispatchContext = () => {
  return useContext(GlobalDispatchContext);
};
