import { useMemo } from "react";
import { web3 } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import useAnchorProgram from "./useAnchorProgram";
import useBalances from "./useBalances";

export interface IExpertCreateCaseValues {
  clientAddress: string;
  caseAmount: number;
  expertDeposit: number;
  clientDeposit: number;
}

export interface IClientActivateCaseValues {
  clientDeposit: number;
}

const useProgram = () => {
  const program = useAnchorProgram();
  const wallet = useAnchorWallet();

  const SOL = anchor.web3.LAMPORTS_PER_SOL;

  const dataAccount = useMemo(() => web3.Keypair.generate(), []);

  const platformPubKey = new PublicKey(
    "7VmTfGAKXbFCwjJsamN92X1kFobgPMdp9VbUT3LswGnW"
  );
  const expertPubKey = new PublicKey(
    "7mpVpgw8XZjsDYZ1hL5uAS4HBc1REohRjWcWSLMdZw74"
  );
  const clientPubKey = new PublicKey(
    "GZmPu1axjQ2KRii1ihoywHC38hCqJkX2TQ48cwHtvfTd"
  );

  const { balances, refreshBalance } = useBalances({
    dataAccountPubKey: dataAccount.publicKey,
    platformPubKey,
    expertPubKey,
    clientPubKey,
  });

  const expertCreateCase = async ({
    clientAddress,
    caseAmount,
    expertDeposit,
    clientDeposit,
  }: IExpertCreateCaseValues) => {
    if (program && wallet) {
      await program.methods
        .new(
          new PublicKey(clientAddress),
          new anchor.BN(caseAmount * SOL),
          new anchor.BN(expertDeposit * SOL),
          new anchor.BN(clientDeposit * SOL)
        )
        .accounts({
          platform: platformPubKey,
          dataAccount: dataAccount.publicKey,
        })
        .signers([dataAccount])
        .rpc();
      await refreshBalance();
    }
  };

  const expertCancelCase = async () => {
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
    }
  };

  const clientActivateCase = async ({
    clientDeposit,
  }: IClientActivateCaseValues) => {
    if (program && wallet) {
      await program.methods
        .clientActivateCase(new anchor.BN(clientDeposit * SOL))
        .accounts({
          DA: dataAccount.publicKey,
          platform: platformPubKey,
          client: wallet.publicKey,
          dataAccount: dataAccount.publicKey,
        })
        .rpc();
      await refreshBalance();
    }
  };

  const platformForceCloseCaseForExpert = async () => {
    if (program && wallet) {
      await program.methods
        .platformForceCloseCaseForExpert()
        .accounts({
          DA: dataAccount.publicKey,
          platform: platformPubKey,
          expert: expertPubKey,
          dataAccount: dataAccount.publicKey,
        })
        .rpc();
      await refreshBalance();
    }
  };

  const platformForceCloseCaseForClient = async () => {
    if (program && wallet) {
      await program.methods
        .platformForceCloseCaseForClient()
        .accounts({
          DA: dataAccount.publicKey,
          platform: platformPubKey,
          client: clientPubKey,
          dataAccount: dataAccount.publicKey,
        })
        .rpc();
      await refreshBalance();
    }
  };

  const clientCompleteCase = async () => {
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
    }
  };

  return {
    wallet,
    balances,
    dataAccount,
    expertCreateCase,
    expertCancelCase,
    clientActivateCase,
    platformForceCloseCaseForExpert,
    platformForceCloseCaseForClient,
    clientCompleteCase,
  };
};

export default useProgram;
