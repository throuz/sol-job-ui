import { useMemo } from "react";
import Swal from "sweetalert2";
import { web3 } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import useAnchorProgram from "./useAnchorProgram";
import useBalance from "./useBalance";

const useProgram = () => {
  const program = useAnchorProgram();
  const wallet = useAnchorWallet();
  const { balance, refreshBalance } = useBalance();

  const dataAccount = useMemo(() => web3.Keypair.generate(), []);

  const SOL = anchor.web3.LAMPORTS_PER_SOL;

  const caseAmount = 0.01;
  const expertDeposit = 0.003;
  const clientDeposit = 0.002;
  const caseAmountLamports = new anchor.BN(caseAmount * SOL);
  const expertDepositLamports = new anchor.BN(expertDeposit * SOL);
  const clientDepositLamports = new anchor.BN(clientDeposit * SOL);

  const expertCreateCase = async () => {
    try {
      if (program && wallet) {
        await program.methods
          .new(
            new PublicKey("7VmTfGAKXbFCwjJsamN92X1kFobgPMdp9VbUT3LswGnW"),
            caseAmountLamports,
            expertDepositLamports,
            clientDepositLamports
          )
          .accounts({ dataAccount: dataAccount.publicKey })
          .signers([dataAccount])
          .rpc();
        await refreshBalance();
        await Swal.fire("Create success!");
      }
    } catch (error) {
      await Swal.fire(String(error));
    }
  };

  const expertCancelCase = async () => {
    try {
      if (program && wallet) {
        await program.methods
          .expertCancelCase()
          .accounts({
            signer: wallet.publicKey,
            dataAccount: dataAccount.publicKey,
          })
          .signers([])
          .rpc();
        await refreshBalance();
        await Swal.fire("Cancel success!");
      }
    } catch (error) {
      await Swal.fire(String(error));
    }
  };

  const clientActivateCase = async () => {
    try {
      if (program && wallet) {
        await program.methods
          .clientActivateCase(clientDepositLamports)
          .accounts({
            signer: wallet.publicKey,
            dataAccount: dataAccount.publicKey,
          })
          .signers([])
          .rpc();
        await refreshBalance();
        await Swal.fire("Activate success!");
      }
    } catch (error) {
      await Swal.fire(String(error));
    }
  };

  return {
    wallet,
    balance,
    dataAccount,
    expertCreateCase,
    expertCancelCase,
    clientActivateCase,
  };
};

export default useProgram;
