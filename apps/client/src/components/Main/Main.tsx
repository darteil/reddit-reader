import { logout } from "api";
import useStore from "store";

const Main = () => {
  const setAuthorized = useStore((state) => state.setAuthorized);

  const exit = () => {
    logout();
    setAuthorized(false);
  };

  return <div className="main"></div>;
};

export default Main;
