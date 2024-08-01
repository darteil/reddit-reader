// TODO: understand the "kind" options
const KINDS = {
  t1: "Comment",
  t2: "RedditUser",
  t3: "Submission",
  t4: "PrivateMessage",
  t5: "Subreddit",
  t6: "Trophy",
  t8: "PromoCampaign",
  Listing: "Listing",
  more: "More",
  UserList: "UserList",
  KarmaList: "KarmaList",
  TrophyList: "TrophyList",
  subreddit_settings: "SubredditSettings",
  modaction: "ModAction",
  wikipage: "WikiPage",
  wikipagesettings: "WikiPageSettings",
  wikipagelisting: "WikiPageListing",
  LiveUpdateEvent: "LiveThread",
  LiveUpdate: "LiveUpdate",
  LabeledMulti: "MultiReddit",
  ModmailConversation: "ModmailConversation",
  ModmailConversationAuthor: "ModmailConversationAuthor",
};

export interface RedditContent<T> {
  kind: string;
  data: T;
}

export type Sort = "confidence" | "top" | "new" | "controversial" | "old" | "random" | "qa";
export type SubredditType =
  | "public"
  | "private"
  | "restricted"
  | "gold_restricted"
  | "gold_only"
  | "archived"
  | "employees_only";

export interface Image {
  url: string;
  width: number;
  height: number;
}

interface ImagePreview {
  source: Image;
  resolutions: Image[];
  variants: {
    obfuscated?: {
      source: Image;
      resolutions: Image[];
    };
    nsfw?: {
      source: Image;
      resolutions: Image[];
    };
    gif: {
      source: Image;
      resolutions: Image[];
    };
    mp4: {
      source: Image;
      resolutions: Image[];
    };
  };
  id: string;
}

export interface Video {
  bitrate_kbps: number;
  dash_url: string;
  duration: number;
  fallback_url: string;
  has_audio: boolean;
  height: number;
  hls_url: string;
  is_gif: boolean;
  scrubber_media_url: string;
  transcoding_status: string;
  width: number;
}

export interface Media {
  oembed?: {
    // The username of the uploader of the source media
    author_name?: string;
    // URL to the author's profile on the source website
    author_url?: string;
    description?: string;
    height: number;
    html: string;
    // Name of the source website, e.g. "gfycat", "YouTube"
    provider_name: string;
    // URL of the source website, e.g. "https://www.youtube.com"
    provider_url: string;

    thumbnail_height: number;
    thumbnail_url: string;
    thumbnail_width: number;
    // Name of the media on the content site, e.g. YouTube video title
    title: string;
    type: "video" | "rich";
    version: string;
    width: number;
  };
  reddit_video?: Video;
  type?: string;
}

export interface MediaMetadata {
  [key: string]: {
    e: string;
    id: string;
    m: string;
    p?: Array<{ x: number; y: number; u: string }>;
    s: {
      x: number;
      y: number;
      u?: string;
      gif?: string;
    };
    status: string;
    t: string;
  };
}

export interface MediaEmbed {
  // HTML string of the media, usually an iframe
  content?: string;
  height?: number;
  scrolling?: boolean;
  width?: number;
}

export interface SecureMediaEmbed extends MediaEmbed {
  media_domain_url?: string;
}

export interface RedditAward {
  award_sub_type: string;
  award_type: string;
  awardings_required_to_grant_benefits: null;

  coin_price: number;
  coin_reward: number;
  count: number;
  days_of_drip_extension: number;
  days_of_premium: number;
  description: string;
  end_date: null;
  giver_coin_reward: number;
  icon_format: string;
  icon_height: number;
  icon_url: string;
  icon_width: number;
  id: string;
  is_enabled: boolean;
  is_new: boolean;
  name: string;
  penny_donate: number;
  penny_price: number;
  resized_icons: Image[];
  resized_static_icons: Image[];
  start_date: null;
  static_icon_height: number;
  static_icon_url: string;
  static_icon_width: number;
  subreddit_coin_reward: number;

  // TODO: unknown types
  subreddit_id: any;
  tiers_by_required_awardings: any;
}

// TODO: create reddit user types
export interface RedditUser {}

export interface Gildings {
  // Number of Reddit Silver awarded
  gid_1: number;
  // Number of Reddit Gold awarded
  gid_2: number;
  // Number of Reddit Platinum awarded
  gid_3: number;
}

export interface RichTextFlair {
  // The string representation of the emoji
  a?: string;
  // The type of the flair entry
  e: "text" | "emoji";
  // URL of the emoji image
  u?: string;
  // The text content of a text flair
  t?: string;
}

export interface RedditPostData extends RedditContent<RedditPostData> {
  all_awardings: RedditAward[];
  allow_live_comments: boolean;
  approved_at_utc: number | null;
  approved_by: RedditUser | null;
  archived: boolean;
  author_cakeday?: boolean;
  author_flair_background_color: string | null;
  author_flair_css_class: string | null;
  author_flair_richtext: RichTextFlair[];
  author_flair_template_id: string | null;
  author_flair_text_color: string | null;
  author_flair_text: string | null;
  author_flair_type: "text" | "richtext";
  author_fullname: string;
  author_is_blocked: boolean;
  author_patreon_flair: boolean;
  author_premium: boolean;
  author: string;
  // TODO: unknown types
  awarders: any[];
  banned_at_utc: number | null;
  banned_by: string | null;
  can_gild: boolean;
  can_mod_post: boolean;
  category: string | null;
  clicked: boolean;
  content_categories: string[] | null;
  contest_mode: boolean;
  created_utc: number;
  created: number;
  crosspost_parent_list: RedditPostData[];
  // TODO: unknown types
  discussion_type: any;
  distinguished: string | null;
  domain: string;
  downs: number;
  edited: number | boolean;
  // TODO: unknown types
  // gallery_data: {};
  gilded: number;
  gildings: Gildings;
  hidden: boolean;
  hide_score: boolean;
  id: string;
  is_created_from_ads_ui: boolean;
  is_crosspostable: boolean;
  is_meta: boolean;
  is_original_content: boolean;
  is_reddit_media_domain: boolean;
  is_robot_indexable: boolean;
  is_self: boolean;
  is_video: boolean;
  likes: boolean | null;
  link_flair_background_color: string;
  link_flair_css_class: string | null;
  link_flair_richtext: RichTextFlair[];
  link_flair_template_id: string | null;
  link_flair_text: string | null;
  link_flair_text_color: "dark" | "light";
  link_flair_type: "text" | "richtext";
  locked: boolean;
  media: Media;
  media_embed: MediaEmbed;
  media_metadata: MediaMetadata;
  media_only: boolean;
  mod_note: string | null;
  mod_reason_by: string | null;
  mod_reason_title: string | null;
  mod_reports: string[];
  name: string;
  no_follow: boolean;
  num_comments: number;
  num_crossposts: number;
  num_reports: number | null;
  over_18: boolean;
  parent_whitelist_status: string;
  permalink: string;
  pinned: boolean;
  post_hint: string;
  preview: { enabled: boolean; images: ImagePreview[] };
  pwls: number;
  quarantine: boolean;

  // TODO: unknown types
  removal_reason: any;
  removed_by_category: any;
  removed_by: any;
  report_reasons: any;

  saved: boolean;
  score: number;
  secure_media: Media | null;
  secure_media_embed: SecureMediaEmbed;
  selftext: string;
  selftext_html: string | null;
  spam?: boolean;
  spoiler: boolean;
  send_replies: boolean;
  stickied: boolean;
  subreddit: string;
  subreddit_id: string;
  subreddit_name_prefixed: string;
  subreddit_subscribers: number;
  subreddit_type: SubredditType;
  suggested_sort: Sort | null;
  thumbnail: string;
  thumbnail_height: number | null;
  thumbnail_width: number | null;
  title: string;
  // TODO: unknown type
  top_awarded_type: any;
  total_awards_received: number;
  // TODO: unknown type
  treatment_tags: any[];
  ups: number;
  upvote_ratio: number;
  url: string;
  user_reports: string[];
  view_count: number | null;
  visited: boolean;
  whitelist_status: string;
  wls: number;
}

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
