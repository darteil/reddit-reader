import { useEffect, useState } from "react";
import { Text, Container, Button } from "@mantine/core";
import { getRedditAuthUrl } from "api";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
  const [authUrl, setAuthUrl] = useState("");

  const getUrl = async () => {
    const url = await getRedditAuthUrl();
    setAuthUrl(url);
  };

  useEffect(() => {
    getUrl();
  }, []);

  return (
    <div className={classes.root}>
      <Container fluid className={classes.wrapper}>
        <Text className={classes.text}>Reddit reader</Text>
        <div className={classes.controls}>
          <Button component="a" href={authUrl}>
            Login with reddit account
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
