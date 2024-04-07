import { useGlobalContext } from "../context/hooks";
import { EStatus } from "../context/types";
import Connected from "./contents/Connected";
import Created from "./contents/Created";
import Nothing from "./contents/Nothing";

const Content = () => {
  const { status } = useGlobalContext();

  return (
    <>
      {status === EStatus.Nothing && <Nothing />}
      {status === EStatus.Connected && <Connected />}
      {status === EStatus.Created && <Created />}
    </>
  );
};

export default Content;
