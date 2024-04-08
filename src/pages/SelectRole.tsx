import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useStoreDispatch } from "../store/hooks";
import PrimaryButton from "../components/PrimaryButton";

const SelectRole = () => {
  const storeDispatch = useStoreDispatch();
  const wallet = useAnchorWallet();
  const navigate = useNavigate();

  const whoYouAreSwal = async () => {
    if (wallet) {
      const result = await Swal.fire({
        title: "Who you are?",
        showDenyButton: true,
        confirmButtonText: "Talent",
        confirmButtonColor: "#646cff",
        denyButtonText: "Client",
        denyButtonColor: "#646cff",
      });
      const walletPubKey = wallet.publicKey.toString();
      if (result.isConfirmed) {
        storeDispatch({ type: "add_expertAddressList", value: walletPubKey });
        navigate("/case-list");
      }
      if (result.isDenied) {
        storeDispatch({ type: "add_clientAddressList", value: walletPubKey });
        navigate("/case-list");
      }
    }
  };

  useEffect(() => {
    toast.dismiss();
    toast.clearWaitingQueue();
    toast("Please select Role");
  }, []);

  return (
    <Container>
      <PrimaryButton
        onClick={async () => {
          await whoYouAreSwal();
        }}
      >
        Select who you are
      </PrimaryButton>
    </Container>
  );
};

export default SelectRole;

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
