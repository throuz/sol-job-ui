import styled from "styled-components";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useProgram from "../hooks/useProgram";
import { IDL } from "../types/solva";

const ProgramPanel = () => {
  const {
    wallet,
    balance,
    dataAccount,
    expertCreateCase,
    expertCancelCase,
    clientActivateCase,
    platformForceCloseCaseForExpert,
    platformForceCloseCaseForClient,
    clientCompleteCase,
  } = useProgram();

  return (
    <Container>
      <a
        href={`https://explorer.solana.com/address/${IDL.metadata.address}?cluster=devnet`}
        target="_blank"
      >
        {IDL.metadata.address}
      </a>
      <div>
        wallet publicKey: {wallet ? wallet.publicKey.toString() : "no wallet"}
      </div>
      <div>wallet balance: {balance ? balance : "no wallet"}</div>
      <div>dataAccount publicKey: {dataAccount.publicKey.toString()}</div>
      <WalletMultiButton />
      <button
        onClick={() => {
          expertCreateCase();
        }}
      >
        expertCreateCase
      </button>
      <button
        onClick={() => {
          expertCancelCase();
        }}
      >
        expertCancelCase
      </button>
      <button
        onClick={() => {
          clientActivateCase();
        }}
      >
        clientActivateCase
      </button>
      <button
        onClick={() => {
          platformForceCloseCaseForExpert();
        }}
      >
        platformForceCloseCaseForExpert
      </button>
      <button
        onClick={() => {
          platformForceCloseCaseForClient();
        }}
      >
        platformForceCloseCaseForClient
      </button>
      <button
        onClick={() => {
          clientCompleteCase();
        }}
      >
        clientCompleteCase
      </button>
    </Container>
  );
};

export default ProgramPanel;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;
