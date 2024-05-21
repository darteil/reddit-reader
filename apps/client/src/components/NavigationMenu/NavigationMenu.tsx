import React from "react";
import { getMySubreddits } from "api";
import { useEffect, useState } from "react";

const options = ["r/subreddit", "r/subreddit2", "r/subreddit3"];

const NavigationMenu = () => {
  // TODO: fix as type
  const [sub, setSub] = useState<string>(options[2] as string);
  const [subList, setSubList] = useState<string[]>(options);

  useEffect(() => {
    const getSub = async () => {
      const subs = await getMySubreddits();
      if (subs) {
        // setSubList(subs);
        // setSub(subs[0]);
        console.log(subs);
      }
    };

    // getSub();
  }, []);

  return (
    <div>
      <p>Navigation</p>
    </div>
  );
};

export default NavigationMenu;
