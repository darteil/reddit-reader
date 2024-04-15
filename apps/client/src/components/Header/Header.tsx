import { Button, Menu } from "semantic-ui-react";
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
    <Menu fixed="top">
      <Menu.Item>
        <NavigationMenu />
      </Menu.Item>
      <Menu.Item>Menu example</Menu.Item>
      <Menu.Item position="right">
        <Button onClick={exit}>Logout</Button>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
