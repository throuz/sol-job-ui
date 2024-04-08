import { web3 } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import useAnchorProgram from "./useAnchorProgram";

export interface IExpertCreateCaseParams {
  dataAccount: web3.Keypair;
  platformAddress: string;
  clientAddress: string;
  caseAmount: number;
  expertDeposit: number;
  clientDeposit: number;
}

export interface IExpertCancelCaseParams {
  dataAccountAddress: string;
}

export interface IClientActivateCaseParams {
  dataAccountAddress: string;
  platformAddress: string;
  clientDeposit: number;
}

export interface IPlatformForceCloseCaseForExpertParams {
  dataAccountAddress: string;
  platformAddress: string;
  expertAddress: string;
}

export interface IPlatformForceCloseCaseForClientParams {
  dataAccountAddress: string;
  platformAddress: string;
  clientAddress: string;
}

export interface IClientCompleteCaseParams {
  dataAccountAddress: string;
  platformAddress: string;
  expertAddress: string;
}

const useProgram = () => {
  const program = useAnchorProgram();
  const wallet = useAnchorWallet();

  const SOL = anchor.web3.LAMPORTS_PER_SOL;

  const expertCreateCase = async ({
    dataAccount,
    platformAddress,
    clientAddress,
    caseAmount,
    expertDeposit,
    clientDeposit,
  }: IExpertCreateCaseParams) => {
    if (program && wallet) {
      await program.methods
        .new(
          new PublicKey(clientAddress),
          new anchor.BN(caseAmount * SOL),
          new anchor.BN(expertDeposit * SOL),
          new anchor.BN(clientDeposit * SOL)
        )
        .accounts({
          platform: new PublicKey(platformAddress),
          dataAccount: dataAccount.publicKey,
        })
        .signers([dataAccount])
        .rpc();
    }
  };

  const expertCancelCase = async ({
    dataAccountAddress,
  }: IExpertCancelCaseParams) => {
    if (program && wallet) {
      await program.methods
        .expertCancelCase()
        .accounts({
          DA: new PublicKey(dataAccountAddress),
          expert: wallet.publicKey,
          dataAccount: new PublicKey(dataAccountAddress),
        })
        .rpc();
    }
  };

  const clientActivateCase = async ({
    clientDeposit,
    dataAccountAddress,
    platformAddress,
  }: IClientActivateCaseParams) => {
    if (program && wallet) {
      await program.methods
        .clientActivateCase(new anchor.BN(clientDeposit * SOL))
        .accounts({
          DA: new PublicKey(dataAccountAddress),
          platform: new PublicKey(platformAddress),
          client: wallet.publicKey,
          dataAccount: new PublicKey(dataAccountAddress),
        })
        .rpc();
    }
  };

  const platformForceCloseCaseForExpert = async ({
    dataAccountAddress,
    platformAddress,
    expertAddress,
  }: IPlatformForceCloseCaseForExpertParams) => {
    if (program && wallet) {
      await program.methods
        .platformForceCloseCaseForExpert()
        .accounts({
          DA: new PublicKey(dataAccountAddress),
          platform: new PublicKey(platformAddress),
          expert: new PublicKey(expertAddress),
          dataAccount: new PublicKey(dataAccountAddress),
        })
        .rpc();
    }
  };

  const platformForceCloseCaseForClient = async ({
    dataAccountAddress,
    platformAddress,
    clientAddress,
  }: IPlatformForceCloseCaseForClientParams) => {
    if (program && wallet) {
      await program.methods
        .platformForceCloseCaseForClient()
        .accounts({
          DA: new PublicKey(dataAccountAddress),
          platform: new PublicKey(platformAddress),
          client: new PublicKey(clientAddress),
          dataAccount: new PublicKey(dataAccountAddress),
        })
        .rpc();
    }
  };

  const clientCompleteCase = async ({
    dataAccountAddress,
    platformAddress,
    expertAddress,
  }: IClientCompleteCaseParams) => {
    if (program && wallet) {
      await program.methods
        .clientCompleteCase()
        .accounts({
          DA: new PublicKey(dataAccountAddress),
          platform: new PublicKey(platformAddress),
          expert: new PublicKey(expertAddress),
          client: wallet.publicKey,
          dataAccount: new PublicKey(dataAccountAddress),
        })
        .rpc();
    }
  };

  return {
    wallet,
    expertCreateCase,
    expertCancelCase,
    clientActivateCase,
    platformForceCloseCaseForExpert,
    platformForceCloseCaseForClient,
    clientCompleteCase,
  };
};

export default useProgram;
