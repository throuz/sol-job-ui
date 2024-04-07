import { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import useProgram, { IExpertCreateCaseValues } from "../../hooks/useProgram";
import { useGlobalDispatchContext } from "../../context/hooks";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { EStatus } from "../../context/types";
import Swal from "sweetalert2";
import { web3 } from "@coral-xyz/anchor";

interface IValues {
  clientAddress: string;
  caseAmount: string;
  expertDeposit: string;
  clientDeposit: string;
}

interface IClientAddressAction {
  type: "clientAddress";
  value: string;
}

interface ICaseAmountAction {
  type: "caseAmount";
  value: string;
}

interface IExpertDepositAction {
  type: "expertDeposit";
  value: string;
}

interface IClientDepositAction {
  type: "clientDeposit";
  value: string;
}

type Actions =
  | IClientAddressAction
  | ICaseAmountAction
  | IExpertDepositAction
  | IClientDepositAction;

const reducer = (state: IValues, action: Actions) => {
  switch (action.type) {
    case "clientAddress": {
      return { ...state, clientAddress: action.value };
    }
    case "caseAmount": {
      return { ...state, caseAmount: action.value };
    }
    case "expertDeposit": {
      return { ...state, expertDeposit: action.value };
    }
    case "clientDeposit": {
      return { ...state, clientDeposit: action.value };
    }
  }
};

const initialState: IValues = {
  clientAddress: "",
  caseAmount: "",
  expertDeposit: "",
  clientDeposit: "",
};

const Connected = () => {
  const [values, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { expertCreateCase } = useProgram();
  const globalDispatch = useGlobalDispatchContext();
  const wallet = useAnchorWallet();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      setIsSubmitting(true);
      e.preventDefault();
      const dataAccount = web3.Keypair.generate();
      const params: IExpertCreateCaseValues = {
        dataAccount,
        clientAddress: values.clientAddress,
        caseAmount: Number(values.caseAmount),
        expertDeposit: Number(values.expertDeposit),
        clientDeposit: Number(values.clientDeposit),
      };
      await expertCreateCase(params);
      globalDispatch({ type: "status", value: EStatus.Created });
      globalDispatch({
        type: "dataAccountAddress",
        value: dataAccount.publicKey.toString(),
      });
      globalDispatch({
        type: "expertAddress",
        value: wallet ? wallet.publicKey.toString() : "",
      });
      globalDispatch({ type: "clientAddress", value: values.clientAddress });
      globalDispatch({ type: "caseAmount", value: Number(values.caseAmount) });
      globalDispatch({
        type: "expertDeposit",
        value: Number(values.expertDeposit),
      });
      globalDispatch({
        type: "clientDeposit",
        value: Number(values.clientDeposit),
      });
      await Swal.fire("Create success!");
      setIsSubmitting(false);
    } catch (error) {
      await Swal.fire(String(error));
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    toast.dismiss();
    toast.clearWaitingQueue();
    toast("Please fill and submit the form");
  }, []);

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <h1>Create Case</h1>
        <InputContainer>
          <label htmlFor="clientAddress">Client Address</label>
          <Input
            type="text"
            id="clientAddress"
            name="clientAddress"
            value={values.clientAddress}
            onChange={(e) => {
              dispatch({ type: "clientAddress", value: e.currentTarget.value });
            }}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="caseAmount">Case Amount</label>
          <Input
            type="number"
            id="caseAmount"
            name="caseAmount"
            value={values.caseAmount}
            onChange={(e) => {
              dispatch({
                type: "caseAmount",
                value: e.currentTarget.value,
              });
            }}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="expertDeposit">Expert Deposit</label>
          <Input
            type="number"
            id="expertDeposit"
            name="expertDeposit"
            value={values.expertDeposit}
            onChange={(e) => {
              dispatch({
                type: "expertDeposit",
                value: e.currentTarget.value,
              });
            }}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="clientDeposit">Client Deposit</label>
          <Input
            type="number"
            id="clientDeposit"
            name="clientDeposit"
            value={values.clientDeposit}
            onChange={(e) => {
              dispatch({
                type: "clientDeposit",
                value: e.currentTarget.value,
              });
            }}
          />
        </InputContainer>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </Container>
  );
};

export default Connected;

const Container = styled.div`
  padding: 20px;
`;

const InputContainer = styled.div`
  text-align: left;
  font-size: 20px;
  margin: 10px;
  padding: 10px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 5px 10px;
  box-sizing: border-box;
`;
