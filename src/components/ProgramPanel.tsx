import styled from "styled-components";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useProgram from "../hooks/useProgram";
import { metadata } from "../idl/solva.json";

const ProgramPanel = () => {
  const {
    wallet,
    balance,
    dataAccount,
    expertCreateCase,
    expertCancelCase,
    clientActivateCase,
  } = useProgram();

  return (
    <Container>
      <a
        href={`https://explorer.solana.com/address/${metadata.address}?cluster=devnet`}
        target="_blank"
      >
        {metadata.address}
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
