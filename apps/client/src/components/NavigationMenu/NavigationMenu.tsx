import React from "react";
import { getMySubreddits } from "api";
import { useEffect, useState } from "react";
import { Dropdown, Input } from "semantic-ui-react";

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
    <Dropdown text={sub} button labeled icon="align justify" className="primary icon">
      <Dropdown.Menu>
        <Input
          icon="search"
          iconPosition="left"
          className="search"
          onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => e.stopPropagation()}
        />
        <Dropdown.Divider />
        <Dropdown.Header content="subreddits" />
        <Dropdown.Menu scrolling>
          {subList.map((option, index) => (
            <Dropdown.Item key={`${index}-${option}`} text={option} onClick={() => setSub(option)} />
          ))}
        </Dropdown.Menu>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavigationMenu;
