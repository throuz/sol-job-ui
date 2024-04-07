import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Swal from "sweetalert2";
import { useGlobalDispatchContext } from "../../context/hooks";
import { EStatus } from "../../context/types";

const Nothing = () => {
  const wallet = useAnchorWallet();
  const globalDispatch = useGlobalDispatchContext();

  const whoYouAreSwal = useCallback(async () => {
    toast.dismiss();
    toast.clearWaitingQueue();
    toast("Please select Expert");
    const result = await Swal.fire({
      title: "Who you are?",
      showDenyButton: true,
      confirmButtonText: "Expert",
      confirmButtonColor: "#646cff",
      denyButtonText: "Client",
      denyButtonColor: "#646cff",
    });
    if (result.isConfirmed) {
      globalDispatch({
        type: "status",
        value: EStatus.Connected,
      });
    }
  }, [globalDispatch]);

  useEffect(() => {
    (async () => {
      if (wallet) {
        await whoYouAreSwal();
      } else {
        toast.dismiss();
        toast.clearWaitingQueue();
        toast("Please connect Wallet");
      }
    })();
  }, [wallet, whoYouAreSwal]);

  return (
    <Container>
      <button
        onClick={async () => {
          await whoYouAreSwal();
        }}
      >
        Select who you are
      </button>
    </Container>
  );
};

export default Nothing;

const Container = styled.div`
  padding-top: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
