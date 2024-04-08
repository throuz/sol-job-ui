import { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Swal from "sweetalert2";
import { web3 } from "@coral-xyz/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import PrimaryButton from "../components/PrimaryButton";
import useProgram, { IExpertCreateCaseParams } from "../hooks/useProgram";
import { useStoreDispatch } from "../store/hooks";
import { ECaseStatus } from "../store/types";
import { useNavigate } from "react-router-dom";

interface IValues {
  name: string;
  clientAddress: string;
  caseAmount: string;
  expertDeposit: string;
  clientDeposit: string;
}

type Actions = { key: keyof IValues; value: string };

const reducer = (state: IValues, action: Actions) => {
  return { ...state, [action.key]: action.value };
};

const initialState: IValues = {
  name: "",
  clientAddress: "",
  caseAmount: "",
  expertDeposit: "",
  clientDeposit: "",
};

const CreateCase = () => {
  const [values, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { expertCreateCase } = useProgram();
  const storeDispatch = useStoreDispatch();
  const wallet = useAnchorWallet();
  const navigate = useNavigate();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      setIsSubmitting(true);
      e.preventDefault();
      const dataAccount = web3.Keypair.generate();
      const params: IExpertCreateCaseParams = {
        dataAccount,
        platformAddress: "7VmTfGAKXbFCwjJsamN92X1kFobgPMdp9VbUT3LswGnW",
        clientAddress: values.clientAddress,
        caseAmount: Number(values.caseAmount),
        expertDeposit: Number(values.expertDeposit),
        clientDeposit: Number(values.clientDeposit),
      };
      await expertCreateCase(params);
      storeDispatch({
        type: "add_case",
        value: {
          name: values.name,
          status: ECaseStatus.Created,
          dataAccountAddress: dataAccount.publicKey.toString(),
          platformAddress: "7VmTfGAKXbFCwjJsamN92X1kFobgPMdp9VbUT3LswGnW",
          expertAddress: wallet?.publicKey.toString() ?? "",
          clientAddress: values.clientAddress,
          caseAmount: Number(values.caseAmount),
          expertDeposit: Number(values.expertDeposit),
          clientDeposit: Number(values.clientDeposit),
        },
      });
      await Swal.fire("Create success!");
      setIsSubmitting(false);
      navigate("/case-list");
    } catch (error) {
      await Swal.fire(String(error));
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    toast.dismiss();
    toast.clearWaitingQueue();
    toast("Please submit the form to create a case");
  }, []);

  return (
    <Container>
      <h1>Create Case</h1>
      <Form onSubmit={onSubmit}>
        <InputContainer>
          <label htmlFor="name">Case Name</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={(e) => {
              dispatch({ key: "name", value: e.currentTarget.value });
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
                key: "caseAmount",
                value: e.currentTarget.value,
              });
            }}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="expertDeposit">Expert Collateral</label>
          <Input
            type="number"
            id="expertDeposit"
            name="expertDeposit"
            value={values.expertDeposit}
            onChange={(e) => {
              dispatch({
                key: "expertDeposit",
                value: e.currentTarget.value,
              });
            }}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="clientAddress">Client Address</label>
          <Input
            type="text"
            id="clientAddress"
            name="clientAddress"
            value={values.clientAddress}
            onChange={(e) => {
              dispatch({ key: "clientAddress", value: e.currentTarget.value });
            }}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="clientDeposit">Client Collateral</label>
          <Input
            type="number"
            id="clientDeposit"
            name="clientDeposit"
            value={values.clientDeposit}
            onChange={(e) => {
              dispatch({
                key: "clientDeposit",
                value: e.currentTarget.value,
              });
            }}
          />
        </InputContainer>
        <PrimaryButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </PrimaryButton>
      </Form>
    </Container>
  );
};

export default CreateCase;

const Container = styled.div`
  padding: 30px;
`;

const Form = styled.form`
  margin: 0 auto;
  max-width: 540px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InputContainer = styled.div`
  text-align: left;
  font-size: 20px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 5px 10px;
  box-sizing: border-box;
`;
