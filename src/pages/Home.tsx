import { useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/hooks";

const Home = () => {
  const { expertAddressList, clientAddressList } = useStore();
  const wallet = useAnchorWallet();
  const navigate = useNavigate();

  useEffect(() => {
    toast.dismiss();
    toast.clearWaitingQueue();
    toast("Please connect Wallet");
  }, []);

  useEffect(() => {
    if (wallet) {
      const walletPubKey = wallet.publicKey.toString();
      if (
        expertAddressList.includes(walletPubKey) ||
        clientAddressList.includes(walletPubKey)
      ) {
        navigate("case-list");
      } else {
        navigate("select-role");
      }
    }
  }, [clientAddressList, expertAddressList, navigate, wallet]);

  return (
    <Container>
      <div>
        <h1>Welcome to Solva!</h1>
        <h2>
          Solva links clients with skilled experts transparently and securely.
        </h2>
        <h3>Please connect your wallet to explore Solva.</h3>
      </div>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
