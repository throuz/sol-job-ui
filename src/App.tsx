import { useEffect, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import Header from "./components/Header";
import ProgramPanel from "./components/ProgramPanel";
import { GlobalProvider } from "./context/GlobalContext";
import "@solana/wallet-adapter-react-ui/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);

  useEffect(() => {
    toast("Please connect wallet");
  }, []);

  return (
    <GlobalProvider>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <ToastContainer position="bottom-center" />
            <Header />
            <ProgramPanel />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </GlobalProvider>
  );
}

export default App;
