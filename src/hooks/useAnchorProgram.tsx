import { useEffect, useState } from "react";
import { AnchorProvider, Program, setProvider } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { IDL, Solva } from "../types/solva";

const useAnchorProgram = (): Program<Solva> | null => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<Program<Solva> | null>(null);

  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet, {});
      setProvider(provider);
      const programInstance = new Program(IDL, IDL.metadata.address, provider);
      setProgram(programInstance);
    }
  }, [connection, wallet]);

  return program;
};

export default useAnchorProgram;
