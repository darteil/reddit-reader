import { Button } from "@mantine/core";
import useStore from "store";
import { useState, useEffect } from "react";
import { logout, getRedditAuthUrl } from "api";
import SubredditsSelect from "./SubredditsSelect";
import classes from "./Header.module.css";

const Header = () => {
  const authorized = useStore((state) => state.authorized);
  const setAuthorized = useStore((store) => store.setAuthorized);
  const [authUrl, setAuthUrl] = useState("");

  const exit = () => {
    logout();
    setAuthorized(false);
  };

  const getUrl = async () => {
    const url = await getRedditAuthUrl();
    setAuthUrl(url);
  };

  useEffect(() => {
    if (authorized === false) {
      getUrl();
    }
  }, [authorized]);

  return (
    <div className={classes.header}>
      <SubredditsSelect />
      {authorized ? (
        <Button m={10} variant="filled" onClick={exit}>
          Logout
        </Button>
      ) : (
        <Button component="a" href={authUrl} m={10} variant="filled">
          Login with reddit account
        </Button>
      )}
    </div>
  );
};

export default Header;
