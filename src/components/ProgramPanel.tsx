import styled from "styled-components";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useProgram from "../hooks/useProgram";

const ProgramPanel = () => {
  const { value, getLatestValue, flipValue } = useProgram();

  return (
    <Container>
      <a
        href="https://explorer.solana.com/address/59iDUfJYQGN2SBVB6aAvD6vPgKVbu9kxntkKrZ1cWKo8?cluster=devnet"
        target="_blank"
      >
        59iDUfJYQGN2SBVB6aAvD6vPgKVbu9kxntkKrZ1cWKo8
      </a>
      <WalletMultiButton />
      <button
        onClick={() => {
          getLatestValue();
        }}
      >
        getLatestValue
      </button>
      <button
        onClick={() => {
          flipValue();
        }}
      >
        Flip
      </button>
      <div>value: {String(value)}</div>
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
