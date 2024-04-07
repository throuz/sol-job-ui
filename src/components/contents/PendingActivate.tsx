import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  useGlobalContext,
  useGlobalDispatchContext,
} from "../../context/hooks";
import { EStatus } from "../../context/types";
import Swal from "sweetalert2";

const PendingActivate = () => {
  const wallet = useAnchorWallet();
  const { clientAddress } = useGlobalContext();
  const globalDispatch = useGlobalDispatchContext();

  useEffect(() => {
    toast.dismiss();
    toast.clearWaitingQueue();
    toast("Please disconnect and connect client wallet");
  }, []);

  return <Container>PendingActivate</Container>;
};

export default PendingActivate;

const Container = styled.div`
  margin-top: 50%;
  padding: 20px;
`;
