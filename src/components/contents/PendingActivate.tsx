import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  useGlobalContext,
  useGlobalDispatchContext,
} from "../../context/hooks";
import { EStatus } from "../../context/types";
import useProgram from "../../hooks/useProgram";

const PendingActivate = () => {
  const { expertAddress, caseAmount, expertDeposit, clientDeposit } =
    useGlobalContext();
  const globalDispatch = useGlobalDispatchContext();
  const { clientActivateCase } = useProgram();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    toast.dismiss();
    toast.clearWaitingQueue();
    toast("Please activate case");
  }, []);

  return (
    <Container>
      <h1>Case List</h1>
      <CaseItem>
        <div>
          <div>Expert: {expertAddress.slice(0, 12)}...</div>
          <div>Case Amount: {caseAmount} SOL</div>
          <div>Expert Deposit: {expertDeposit} SOL</div>
          <div>Client Deposit: {clientDeposit} SOL</div>
        </div>
        <button
          disabled={isSubmitting}
          onClick={async () => {
            try {
              setIsSubmitting(true);
              await clientActivateCase();
              globalDispatch({ type: "status", value: EStatus.Activated });
              await Swal.fire("Activate success!");
              setIsSubmitting(false);
            } catch (error) {
              await Swal.fire(String(error));
              setIsSubmitting(false);
            }
          }}
        >
          {isSubmitting ? "Submitting..." : "Activate"}
        </button>
      </CaseItem>
    </Container>
  );
};

export default PendingActivate;

const Container = styled.div`
  padding: 20px;
`;

const CaseItem = styled.div`
  background: #512da8;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  button {
    font-size: 20px;
  }
`;
