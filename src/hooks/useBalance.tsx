import { useCallback, useEffect, useState } from "react";
import * as anchor from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

const useBalance = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [balance, setBalance] = useState<number>();

  const refreshBalance = useCallback(async () => {
    if (wallet) {
      const lamports = await connection.getBalance(wallet.publicKey);
      setBalance(lamports / anchor.web3.LAMPORTS_PER_SOL);
    } else {
      setBalance(undefined);
    }
  }, [connection, wallet]);

  useEffect(() => {
    refreshBalance();
  }, [refreshBalance]);

  return { balance, refreshBalance };
};

export default useBalance;
