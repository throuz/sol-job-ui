import styled from "styled-components";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useProgram from "../hooks/useProgram";
import { metadata } from "../idl/solva.json";

const ProgramPanel = () => {
  const { wallet, dataAccount, createCase, activateCase } = useProgram();

  return (
    <Container>
      <a
        href={`https://explorer.solana.com/address/${metadata.address}?cluster=devnet`}
        target="_blank"
      >
        {metadata.address}
      </a>
      <div>wallet publicKey: {wallet ? wallet.publicKey.toString() : "no wallet"}</div>
      <div>dataAccount publicKey: {dataAccount.publicKey.toString()}</div>
      <WalletMultiButton />
      <button
        onClick={() => {
          createCase();
        }}
      >
        createCase
      </button>
      <button
        onClick={() => {
          activateCase();
        }}
      >
        activateCase
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
