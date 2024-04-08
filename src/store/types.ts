import { Dispatch } from "react";

export enum ECaseStatus {
  Created,
  Activated,
  Completed,
}

export interface Case {
  status: ECaseStatus;
  dataAccountAddress: string;
  platformAddress: string;
  expertAddress: string;
  clientAddress: string;
  caseAmount: number;
  expertDeposit: number;
  clientDeposit: number;
}

export interface IStoreContext {
  expertAddressList: Array<string>;
  clientAddressList: Array<string>;
  caseList: Array<Case>;
}

interface IAddExpertAddressListAction {
  type: "add_expertAddressList";
  value: string;
}

interface IAddClientAddressListAction {
  type: "add_clientAddressList";
  value: string;
}

interface IAddCaseAction {
  type: "add_case";
  value: Case;
}

export type IStoreContextAction =
  | IAddExpertAddressListAction
  | IAddClientAddressListAction
  | IAddCaseAction;

export type IStoreDispatchContext = Dispatch<IStoreContextAction>;
