import { useState, useEffect } from "react";
import { Text } from "@mantine/core";
import useStore from "store";
import { getPosts, login, logout, getRedditAuthUrl } from "api";
import { Wrapper } from "../Wrapper";

const App = () => {
  const [authUrl, setAuthUrl] = useState("");
  const [subreddits, setSubreddits] = useState<string[]>([]);
  const authorized = useStore((state) => state.authorized);
  const setAuthorized = useStore((state) => state.setAuthorized);

  useEffect(() => {
    if (authorized) {
      getPosts();
      return;
    }

    const getUrl = async () => {
      const url = await getRedditAuthUrl();
      setAuthUrl(url);
    };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");

    if (code) {
      login(code).then(() => {
        getPosts();
      });
    } else {
      getUrl();
    }
  }, []);

  return (
    <div>
      {!authorized && (
        <>
          <Text size="xl">Text example...</Text>
          <a style={{ fontSize: 20 }} href={authUrl}>
            login
          </a>
        </>
      )}
      {authorized && <Wrapper />}
    </div>
  );
};

export default App;
