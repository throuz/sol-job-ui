import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useGlobalContext, useGlobalDispatchContext } from "../../store/hooks";
import { EStatus } from "../../store/types";
import Swal from "sweetalert2";

const Created = () => {
  const wallet = useAnchorWallet();
  const { clientAddress } = useGlobalContext();
  const globalDispatch = useGlobalDispatchContext();

  useEffect(() => {
    toast.dismiss();
    toast.clearWaitingQueue();
    toast("Please disconnect and connect client wallet");
  }, []);

  return (
    <Container>
      <h1>Case Created!</h1>
      <h2>wait for client activate...</h2>
      <button
        onClick={() => {
          if (wallet && wallet.publicKey.toString() === clientAddress) {
            globalDispatch({ type: "status", value: EStatus.PendingActivate });
          } else {
            toast.dismiss();
            toast.clearWaitingQueue();
            toast("Please disconnect and connect client wallet");
            Swal.fire("Please disconnect and connect client wallet");
          }
        }}
      >
        go to client page
      </button>
    </Container>
  );
};

export default Created;

const Container = styled.div`
  margin-top: 15%;
  padding: 20px;
`;
