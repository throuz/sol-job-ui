import { useContext } from "react";
import { StoreContext, StoreDispatchContext } from "./Store";

export const useStore = () => {
  return useContext(StoreContext);
};

export const useStoreDispatch = () => {
  return useContext(StoreDispatchContext);
};
