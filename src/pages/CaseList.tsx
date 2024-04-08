import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useStore, useStoreDispatch } from "../store/hooks";
import { ECaseStatus } from "../store/types";
import useProgram, {
  IClientActivateCaseParams,
  IClientCompleteCaseParams,
} from "../hooks/useProgram";
import PrimaryButton from "../components/PrimaryButton";

const CaseList = () => {
  const { expertAddressList, clientAddressList, caseList } = useStore();
  const storeDispatch = useStoreDispatch();
  const [caseInSubmitting, setCaseInSubmitting] = useState<string>("");
  const wallet = useAnchorWallet();
  const navigate = useNavigate();
  const { clientActivateCase, clientCompleteCase } = useProgram();

  const walletAddress = useMemo(() => {
    if (wallet) {
      return wallet.publicKey.toString();
    }
    return "";
  }, [wallet]);

  const isExpert = useMemo(() => {
    return expertAddressList.includes(walletAddress);
  }, [expertAddressList, walletAddress]);

  const isClient = useMemo(() => {
    return clientAddressList.includes(walletAddress);
  }, [clientAddressList, walletAddress]);

  const filteredCaseList = useMemo(() => {
    if (isExpert) {
      return caseList.filter((item) => item.expertAddress === walletAddress);
    }
    if (isClient) {
      return caseList.filter((item) => item.clientAddress === walletAddress);
    }
    return [];
  }, [caseList, isClient, isExpert, walletAddress]);

  const onActivateClick = async ({
    dataAccountAddress,
    platformAddress,
    clientDeposit,
  }: IClientActivateCaseParams) => {
    try {
      setCaseInSubmitting(dataAccountAddress);
      await clientActivateCase({
        dataAccountAddress,
        platformAddress,
        clientDeposit,
      });
      storeDispatch({
        type: "change_case_status",
        dataAccountAddress: dataAccountAddress,
        status: ECaseStatus.Activated,
      });
      await Swal.fire("Activate success!");
      setCaseInSubmitting("");
    } catch (error) {
      await Swal.fire(String(error));
      setCaseInSubmitting("");
    }
  };

  const onCompleteClick = async ({
    dataAccountAddress,
    platformAddress,
    expertAddress,
  }: IClientCompleteCaseParams) => {
    try {
      setCaseInSubmitting(dataAccountAddress);
      await clientCompleteCase({
        dataAccountAddress,
        platformAddress,
        expertAddress,
      });
      storeDispatch({
        type: "change_case_status",
        dataAccountAddress: dataAccountAddress,
        status: ECaseStatus.Completed,
      });
      await Swal.fire("Complete success!");
      setCaseInSubmitting("");
    } catch (error) {
      await Swal.fire(String(error));
      setCaseInSubmitting("");
    }
  };

  useEffect(() => {
    if (filteredCaseList.length === 0 && isExpert) {
      toast.dismiss();
      toast.clearWaitingQueue();
      toast("Please create a case");
    }
    if (filteredCaseList.length === 0 && isClient) {
      toast.dismiss();
      toast.clearWaitingQueue();
      toast("Please connect to talent wallet to create a case");
    }
    if (filteredCaseList.length > 0 && isExpert) {
      toast.dismiss();
      toast.clearWaitingQueue();
      toast("Please connect to client wallet to change case status");
    }
    if (filteredCaseList.length > 0 && isClient) {
      toast.dismiss();
      toast.clearWaitingQueue();
      toast("Please activate or complete case");
    }
  }, [filteredCaseList.length, isClient, isExpert]);

  return (
    <Container>
      {isExpert && (
        <PrimaryButton onClick={() => navigate("/create-case")}>
          Create Case
        </PrimaryButton>
      )}
      <h1>Case List</h1>
      <CaseItemListContainer>
        {filteredCaseList.length === 0 && <h3>No case</h3>}
        {filteredCaseList.map((item) => {
          const {
            name,
            status,
            dataAccountAddress,
            platformAddress,
            expertAddress,
            clientAddress,
            caseAmount,
            expertDeposit,
            clientDeposit,
          } = item;
          const statusTextMap: Record<ECaseStatus, string> = {
            [ECaseStatus.Created]: "Created",
            [ECaseStatus.Activated]: "Activated",
            [ECaseStatus.Completed]: "Closed",
          };
          const actionTextMap: Record<ECaseStatus, string> = {
            [ECaseStatus.Created]: "Activate",
            [ECaseStatus.Activated]: "Complete",
            [ECaseStatus.Completed]: "Closed",
          };
          const isSubmitting = dataAccountAddress === caseInSubmitting;
          const isClosed = status === ECaseStatus.Completed;
          return (
            <CaseItem>
              <div>
                <div>Case Name: {name}</div>
                <div>Status: {statusTextMap[status]}</div>
                <div>Case Amount: {caseAmount} SOL</div>
                <div>Expert: {expertAddress}</div>
                <div>Expert Collateral: {expertDeposit} SOL</div>
                <div>Client: {clientAddress}</div>
                <div>Client Collateral: {clientDeposit} SOL</div>
              </div>
              {isClient && (
                <PrimaryButton
                  disabled={isSubmitting || isClosed}
                  onClick={async () => {
                    if (status === ECaseStatus.Created) {
                      await onActivateClick({
                        dataAccountAddress,
                        platformAddress,
                        clientDeposit,
                      });
                    }
                    if (status === ECaseStatus.Activated) {
                      await onCompleteClick({
                        dataAccountAddress,
                        platformAddress,
                        expertAddress,
                      });
                    }
                  }}
                >
                  {isSubmitting ? "Submitting..." : actionTextMap[status]}
                </PrimaryButton>
              )}
            </CaseItem>
          );
        })}
      </CaseItemListContainer>
    </Container>
  );
};

export default CaseList;

const Container = styled.div`
  padding-top: 30px;
`;

const CaseItemListContainer = styled.div`
  margin: 0 auto;
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CaseItem = styled.div`
  background: #5c1d9c;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  button {
    font-size: 20px;
  }
`;
