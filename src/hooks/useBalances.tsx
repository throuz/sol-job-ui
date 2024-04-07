/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import * as anchor from "@coral-xyz/anchor";
import { useConnection } from "@solana/wallet-adapter-react";

interface IUseBalancesProps {
  dataAccountPubKey: anchor.web3.PublicKey | undefined;
  platformPubKey: anchor.web3.PublicKey | undefined;
  expertPubKey: anchor.web3.PublicKey | undefined;
  clientPubKey: anchor.web3.PublicKey | undefined;
}

interface IBalances {
  dataAccountBalance: number;
  platformAccountBalance: number;
  expertAccountBalance: number;
  clientAccountBalance: number;
}

const useBalances = ({
  dataAccountPubKey,
  platformPubKey,
  expertPubKey,
  clientPubKey,
}: IUseBalancesProps) => {
  const { connection } = useConnection();
  const [balances, setBalances] = useState<IBalances>();

  const refreshBalance = async () => {
    const getBalance = async (publicKey: anchor.web3.PublicKey | undefined) => {
      if (publicKey === undefined) {
        return 0;
      }
      const SOL = anchor.web3.LAMPORTS_PER_SOL;
      const balance = await connection.getBalance(publicKey);
      return balance / SOL;
    };
    const dataAccountBalance = await getBalance(dataAccountPubKey);
    const platformAccountBalance = await getBalance(platformPubKey);
    const expertAccountBalance = await getBalance(expertPubKey);
    const clientAccountBalance = await getBalance(clientPubKey);
    setBalances({
      dataAccountBalance,
      platformAccountBalance,
      expertAccountBalance,
      clientAccountBalance,
    });
  };

  useEffect(() => {
    refreshBalance();
  }, []);

  return { balances, refreshBalance };
};

export default useBalances;
