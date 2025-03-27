import { useEffect } from "react";
import useStore from "store";
import { getPosts, getPostsForUnauthorizedUser, login } from "api";
import { Header } from "components/Header";
import { Main } from "components/Main";

const App = () => {
  const authorized = useStore((state) => state.authorized);
  const setAuthorized = useStore((state) => state.setAuthorized);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");

    const setPosts = async () => {
      const data = await getPosts();
      if (data.length > 0) {
        console.log(data);
      }
    };

    if (authorized) {
      setPosts();
    } else if (code) {
      login(code).then(() => {
        setAuthorized(true);
        setPosts();
      });
    } else {
      getPostsForUnauthorizedUser();
    }
  }, []);

  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default App;
