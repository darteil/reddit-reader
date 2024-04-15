import { logout } from "api";
import useStore from "store";
import { Header } from "../Header";

const Wrapper = () => {
  const setAuthorized = useStore((state) => state.setAuthorized);

  const exit = () => {
    logout();
    setAuthorized(false);
  };

  return (
    <>
      <Header />
    </>
  );
};

export default Wrapper;
