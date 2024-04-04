import { useEffect, useState } from "react";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import idlFile from "../idl/solva.json";
import { Solva } from "../types/solva";

const useAnchorProgram = (): Program<Solva> | null => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<Program<Solva> | null>(null);

  const idl = idlFile as Solva;

  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet, {});
      const programInstance = new Program(idl, idl.metadata.address, provider);
      setProgram(programInstance);
    }
  }, [wallet, connection, idl]);

  return program;
};

export default useAnchorProgram;
