import { useEffect, useState } from "react";
import { Combobox, InputBase, useCombobox } from "@mantine/core";
import { getMySubreddits } from "api";
import useStore from "store";

const SubredditsSelect = () => {
  const [subreddits, setSubreddits] = useState<string[]>([]);
  const setCurrentSubreddit = useStore((state) => state.setCurrentSubreddit);
  const currentSubreddit = useStore((state) => state.currentSubreddit);
  const authorized = useStore((state) => state.authorized);

  useEffect(() => {
    const getSubs = async () => {
      const subs = await getMySubreddits();
      if (subs) setSubreddits(subs);
    };

    if (authorized) {
      getSubs();
    }
  }, [authorized]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = subreddits.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      width={300}
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(value) => {
        setCurrentSubreddit(value);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          maw={300}
          m={10}
          disabled={!authorized}
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
        >
          {(currentSubreddit === "all" && "All my subreddits") || currentSubreddit}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Option value="all">All my subreddits</Combobox.Option>
        <Combobox.Group label="My subreddits list">
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Group>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SubredditsSelect;
