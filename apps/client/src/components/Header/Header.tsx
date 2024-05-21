import { NavigationMenu } from "../NavigationMenu";
import useStore from "store";
import { logout } from "api";

const Header = () => {
  const setAuthorized = useStore((store) => store.setAuthorized);

  const exit = () => {
    logout();
    setAuthorized(false);
  };

  return (
    <div>
      <p>Header</p>
    </div>
  );
};

export default Header;
