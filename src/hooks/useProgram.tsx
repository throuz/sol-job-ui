import { web3 } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import useAnchorProgram from "./useAnchorProgram";
import useBalances from "./useBalances";
import { useGlobalContext } from "../context/hooks";

export interface IExpertCreateCaseValues {
  dataAccount: web3.Keypair;
  clientAddress: string;
  caseAmount: number;
  expertDeposit: number;
  clientDeposit: number;
}

const useProgram = () => {
  const program = useAnchorProgram();
  const wallet = useAnchorWallet();
  const {
    dataAccountAddress,
    platformAddress,
    expertAddress,
    clientAddress,
    clientDeposit,
  } = useGlobalContext();

  const SOL = anchor.web3.LAMPORTS_PER_SOL;

  const dataAccountPubKey = dataAccountAddress
    ? new PublicKey(dataAccountAddress)
    : undefined;
  const platformPubKey = platformAddress
    ? new PublicKey(platformAddress)
    : undefined;
  const expertPubKey = expertAddress ? new PublicKey(expertAddress) : undefined;
  const clientPubKey = clientAddress ? new PublicKey(clientAddress) : undefined;

  const { balances, refreshBalance } = useBalances({
    dataAccountPubKey,
    platformPubKey,
    expertPubKey,
    clientPubKey,
  });

  const expertCreateCase = async ({
    dataAccount,
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
          DA: dataAccountPubKey,
          expert: wallet.publicKey,
          dataAccount: dataAccountPubKey,
        })
        .rpc();
      await refreshBalance();
    }
  };

  const clientActivateCase = async () => {
    if (program && wallet) {
      await program.methods
        .clientActivateCase(new anchor.BN(clientDeposit * SOL))
        .accounts({
          DA: dataAccountPubKey,
          platform: platformPubKey,
          client: wallet.publicKey,
          dataAccount: dataAccountPubKey,
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
          DA: dataAccountPubKey,
          platform: platformPubKey,
          expert: expertPubKey,
          dataAccount: dataAccountPubKey,
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
          DA: dataAccountPubKey,
          platform: platformPubKey,
          client: clientPubKey,
          dataAccount: dataAccountPubKey,
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
          DA: dataAccountPubKey,
          platform: platformPubKey,
          expert: expertPubKey,
          client: wallet.publicKey,
          dataAccount: dataAccountPubKey,
        })
        .rpc();
      await refreshBalance();
    }
  };

  return {
    wallet,
    balances,
    expertCreateCase,
    expertCancelCase,
    clientActivateCase,
    platformForceCloseCaseForExpert,
    platformForceCloseCaseForClient,
    clientCompleteCase,
  };
};

export default useProgram;
