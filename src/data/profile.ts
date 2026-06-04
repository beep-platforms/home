export interface SocialLink {
  readonly name: string;
  readonly url: string;
  readonly handle: string;
}

export interface EmailEntry {
  readonly label: string;
  readonly address: string;
}

export interface ProfileData {
  readonly name: string;
  readonly handle: string;
  readonly siteTitle: string;
  readonly tagline: string;
  readonly bio: readonly string[];
  readonly photoUrl: string;
  readonly photoAlt: string;
  readonly githubUsername: string;
  readonly resumeUrl: string;
  readonly emails: readonly EmailEntry[];
  readonly social: readonly SocialLink[];
  readonly featuredRepoNames: readonly string[];
}

export const profile: ProfileData = {
  name: "Arrington Walters",
  handle: "AW",
  siteTitle: "Skillcraft.Codes",
  tagline:
    "Sr. Systems Engineer at Tesla Energy. I work on the test, firmware, and observability infrastructure behind Powerwall and Megapack. This is where my professional and creative work lives.",
  bio: [
    "I help scale Tesla's disaster-relief program — coordinating where Tesla's portable batteries are deployed in response to hurricanes, floods, and other natural disasters.",
    "My core role is systems engineering across Powerwall and Megapack — owning end-to-end product behavior across firmware, hardware, and software.",
    "I grew up in Maryland, started my career in Nevada, and now live in San Francisco. Before Tesla I worked on forging and furnace optimization at an aerospace plant. I joined Tesla as a process engineer on the Powerwall line, moved into manufacturing firmware as the product family scaled, and now work in systems engineering.",
    "Outside of work I build hobby software, run a homelab, and print Gridfinity organizers, tabletop minis, and the occasional household fix on my Bambu. I bake, read fantasy, and stream occasionally on Twitch as conjura.",
  ],
  photoUrl: "/assets/redwoods_0.png",
  photoAlt: "Arrington Walters in the redwoods",
  githubUsername: "ArriW",
  resumeUrl: "https://registry.jsonresume.org/arriw/",
  emails: [
    { label: "personal", address: "arrington.walters@gmail.com" },
  ],
  social: [
    { name: "GitHub", url: "https://github.com/ArriW", handle: "ArriW" },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/arrington-walters-85b86ba8",
      handle: "arrington-walters",
    },
    { name: "Twitch", url: "https://www.twitch.tv/conjura", handle: "conjura" },
  ],
  featuredRepoNames: ["deckdeep", "betbug-releases", "skillcraft"],
};
