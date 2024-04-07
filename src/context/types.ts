import { Dispatch } from "react";

export enum EContractStatus {
  Nothing,
  Connected,
  Created,
  Activated,
  Completed,
}

export interface IGlobalContext {
  contractStatus: EContractStatus;
}

interface IContractStatusAction {
  type: "contractStatus";
  contractStatus: EContractStatus;
}

export type IGlobalContextAction = IContractStatusAction;

export type IGlobalDispatchContext = Dispatch<IGlobalContextAction>;
