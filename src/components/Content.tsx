import { useGlobalContext } from "../context/hooks";
import { EContractStatus } from "../context/types";
import Connected from "./contents/Connected";
import Nothing from "./contents/Nothing";

const Content = () => {
  const { contractStatus } = useGlobalContext();

  return (
    <>
      {contractStatus === EContractStatus.Nothing && <Nothing />}
      {contractStatus === EContractStatus.Connected && <Connected />}
    </>
  );
};

export default Content;
