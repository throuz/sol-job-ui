import { Dispatch } from "react";

export enum EStatus {
  Nothing,
  Connected,
  Created,
  PendingActivate,
  Activated,
  Completed,
}

export interface IGlobalContext {
  status: EStatus;
  dataAccountAddress: string;
  platformAddress: string;
  expertAddress: string;
  clientAddress: string;
  caseAmount: number;
  expertDeposit: number;
  clientDeposit: number;
}

interface IStatusAction {
  type: "status";
  value: EStatus;
}

interface IDataAccountAddressAction {
  type: "dataAccountAddress";
  value: string;
}

interface IPlatformAddressAction {
  type: "platformAddress";
  value: string;
}

interface IExpertAddressAction {
  type: "expertAddress";
  value: string;
}

interface IClientAddressAction {
  type: "clientAddress";
  value: string;
}

interface ICaseAmountAction {
  type: "caseAmount";
  value: number;
}

interface IExpertDepositAction {
  type: "expertDeposit";
  value: number;
}

interface IClientDepositAction {
  type: "clientDeposit";
  value: number;
}

export type IGlobalContextAction =
  | IStatusAction
  | IDataAccountAddressAction
  | IPlatformAddressAction
  | IExpertAddressAction
  | IClientAddressAction
  | ICaseAmountAction
  | IExpertDepositAction
  | IClientDepositAction;

export type IGlobalDispatchContext = Dispatch<IGlobalContextAction>;
