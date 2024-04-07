import { useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Swal from "sweetalert2";
import { useGlobalDispatchContext } from "../../context/hooks";
import { EContractStatus } from "../../context/types";

const Connected = () => {
  const wallet = useAnchorWallet();
  const globalDispatch = useGlobalDispatchContext();

  useEffect(() => {
    toast("Please fill the form");
  }, []);

  return <Container>Connected</Container>;
};

export default Connected;

const Container = styled.div``;
