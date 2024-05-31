interface ISubreddit {
  data: {
    display_name_prefixed: string;
  };
}

export interface IMySubreddits {
  data: {
    children: ISubreddit[];
  };
}
