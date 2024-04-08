import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Layout from "./components/Layout";
import CaseList from "./pages/CaseList";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import SelectRole from "./pages/SelectRole";

const AppRouter = () => {
  const wallet = useAnchorWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (wallet === undefined) {
      navigate("/");
    }
  }, [navigate, wallet]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/case-list" element={<CaseList />} />
        <Route path="/*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
