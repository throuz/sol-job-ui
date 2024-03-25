import { useAnchorWallet } from "@solana/wallet-adapter-react";
import useAnchorProgram from "./useAnchorProgram";
import { useMemo, useState } from "react";
import { web3 } from "@coral-xyz/anchor";

const useProgram = () => {
  const [isSigned, setIsSigned] = useState(false);
  const [value, setValue] = useState();
  const program = useAnchorProgram();
  const wallet = useAnchorWallet();

  const dataAccount = useMemo(() => web3.Keypair.generate(), []);

  const sign = async () => {
    if (!isSigned && program && wallet) {
      await program.methods
        .new()
        .accounts({ dataAccount: dataAccount.publicKey })
        .signers([dataAccount])
        .rpc();
      setIsSigned(true);
    }
  };

  const getLatestValue = async () => {
    await sign();
    if (program) {
      const value = await program.methods
        .get()
        .accounts({ dataAccount: dataAccount.publicKey })
        .view();
      setValue(value);
    }
  };

  const flipValue = async () => {
    await sign();
    if (program) {
      await program.methods
        .flip()
        .accounts({ dataAccount: dataAccount.publicKey })
        .rpc();
    }
  };

  return { value, sign, getLatestValue, flipValue };
};

export default useProgram;
