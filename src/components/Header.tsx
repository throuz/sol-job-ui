import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import logo from "../assets/logo.svg";

const Header = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [balance, setBalance] = useState<number>();

  useEffect(() => {
    if (wallet) {
      connection
        .getBalance(wallet.publicKey)
        .then((lamports) => setBalance(lamports / LAMPORTS_PER_SOL));
      connection.onAccountChange(
        wallet.publicKey,
        (updatedAccountInfo) => {
          setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
        },
        "confirmed"
      );
    }
  }, [connection, wallet]);

  return (
    <Container>
      <img src={logo} height={60} />
      <HeaderEnd>
        {wallet && <div>Balance: {balance} SOL</div>}
        <WalletMultiButton />
      </HeaderEnd>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderEnd = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;
