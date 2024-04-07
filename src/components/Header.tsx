import styled from "styled-components";
import logo from "../assets/logo.svg";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Header = () => {
  return (
    <Container>
      <img src={logo} height={60} />
      <WalletMultiButton />
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
