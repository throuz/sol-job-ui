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

  const platformPubKey = new PublicKey(
    "7VmTfGAKXbFCwjJsamN92X1kFobgPMdp9VbUT3LswGnW"
  );
  const expertPubKey = new PublicKey(
    "7mpVpgw8XZjsDYZ1hL5uAS4HBc1REohRjWcWSLMdZw74"
  );
  const clientPubKey = new PublicKey(
    "GZmPu1axjQ2KRii1ihoywHC38hCqJkX2TQ48cwHtvfTd"
  );

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
            platformPubKey,
            clientPubKey,
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
            DA: dataAccount.publicKey,
            expert: wallet.publicKey,
            dataAccount: dataAccount.publicKey,
          })
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
            DA: dataAccount.publicKey,
            client: wallet.publicKey,
            dataAccount: dataAccount.publicKey,
          })
          .rpc();
        await refreshBalance();
        await Swal.fire("Activate success!");
      }
    } catch (error) {
      await Swal.fire(String(error));
    }
  };

  const clientCompleteCase = async () => {
    try {
      if (program && wallet) {
        await program.methods
          .clientCompleteCase()
          .accounts({
            DA: dataAccount.publicKey,
            platform: platformPubKey,
            expert: expertPubKey,
            client: wallet.publicKey,
            dataAccount: dataAccount.publicKey,
          })
          .rpc();
        await refreshBalance();
        await Swal.fire("Complete success!");
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
    clientCompleteCase,
  };
};

export default useProgram;
