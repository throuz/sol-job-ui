import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Swal from "sweetalert2";
import { useGlobalDispatchContext } from "../../store/hooks";
import { EStatus } from "../../store/types";

const Nothing = () => {
  const wallet = useAnchorWallet();
  const globalDispatch = useGlobalDispatchContext();

  const whoYouAreSwal = useCallback(async () => {
    toast.dismiss();
    toast.clearWaitingQueue();
    toast("Please select Talent");
    const result = await Swal.fire({
      title: "Who you are?",
      showDenyButton: true,
      confirmButtonText: "Talent",
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
      {wallet ? (
        <button
          onClick={async () => {
            await whoYouAreSwal();
          }}
        >
          Select who you are
        </button>
      ) : (
        <h1>Please connect wallet</h1>
      )}
    </Container>
  );
};

export default Nothing;

const Container = styled.div`
  margin-top: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
