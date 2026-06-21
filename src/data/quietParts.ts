// Data for the "The Quiet Parts" video-series landing page (/the-quiet-parts).
// Headline stats each carry a source, per the series' evidence-first brand.
// Stats reconciled against the research dossiers in
// ~/stash/quiet-parts/episodes/*/research.md:
//   All four episodes reconciled against research (overstated/outdated/mis-
//   attributed figures corrected — e.g. GRADE ratings were NICE's, not York's).

export interface EpisodeStat {
  readonly value: string;
  readonly label: string;
  readonly source: string;
}

export type EpisodeStatus = "In production" | "Scripting" | "Coming soon";

export interface Episode {
  readonly number: string;
  readonly slug: string;
  readonly title: string;
  readonly kicker: string;
  readonly dek: string;
  readonly quietPart: string;
  readonly runtime: string;
  readonly stats: readonly EpisodeStat[];
  readonly status: EpisodeStatus;
}

export interface SeriesMeta {
  readonly title: string;
  readonly tagline: string;
  readonly intro: readonly string[];
  readonly releaseNote: string;
}

export const series: SeriesMeta = {
  title: "The Quiet Parts",
  tagline: "Where the evidence went when the institutions looked away.",
  intro: [
    "Four essays. One pattern. Across crime, a presidency, public health, and medicine, the same thing kept happening: an empirical question got turned into a moral test, the people who asked it got treated as bad actors — and the evidence forced the update anyway.",
    "The Quiet Parts is calm, sourced, and willing to concede the other side's best point. Every number on screen carries its source. We separate what's established from what's merely alleged. Then we say the quiet part out loud.",
  ],
  releaseNote: "Four episodes, releasing weekly. In production now.",
};

export const episodes: readonly Episode[] = [
  {
    number: "01",
    slug: "the-forfeit",
    title: "The Right Didn't Win — The Left Forfeited It",
    kicker: "Crime · Immigration · Inner cities",
    dek: "One side lied about the problem. The other has been mostly wrong about the cure. What actually happened to crime, the border, and the cities — and why being right about the diagnosis isn't the same as winning the argument.",
    quietPart:
      "When one side refuses to show up to an argument, the other wins it by default. That is not the same thing as being right.",
    runtime: "22–26 min",
    stats: [
      { value: "≈ +37%", label: "U.S. murder rate surge, 2019→2021 — the problem was real", source: "FBI / CDC" },
      { value: "≈ −20%", label: "2025 homicide drop — same cities, same officials", source: "Real-Time Crime Index" },
      { value: "33% higher", label: "murder rate in red states than blue, 2021–22", source: "Third Way · CDC WONDER" },
    ],
    status: "In production",
  },
  {
    number: "02",
    slug: "the-cover-up",
    title: "We Were Told He Was Sharp as Ever",
    kicker: "Media · Trust · 2024",
    dek: "For a year the footage was 'cheap fakes' and the president was 'sharp as ever' — until ninety minutes on a debate stage that could no longer be managed. The decline was the tragedy. The concealment was the scandal.",
    quietPart:
      "We were asked to disbelieve our own eyes for the good of the country. Credibility is a bank account you can overdraw.",
    runtime: "20–24 min",
    stats: [
      { value: "~50M", label: "watched the June 2024 debate", source: "Nielsen" },
      { value: "Feb 2024", label: "special counsel: a 'well-meaning, elderly man with a poor memory'", source: "Hur Report" },
      { value: "record low", label: "public trust in mass media", source: "Gallup" },
    ],
    status: "In production",
  },
  {
    number: "03",
    slug: "ten-thousand-years",
    title: "We Weren't Overweight for Ten Thousand Years",
    kicker: "Public health · Obesity",
    dek: "The gene pool hasn't meaningfully changed in fifty years. Obesity tripled anyway. So why did a wing of public health spend two decades building reasons to look away from the one lever ordinary people actually control?",
    quietPart:
      "The most effective obesity drug in history works by making people eat less — confirming the variable the messaging spent twenty years waving away.",
    runtime: "18–22 min",
    stats: [
      { value: "15% → 41%", label: "U.S. adult obesity, 1976–80 → 2021–23", source: "CDC · NHANES" },
      { value: "−15% to −23%", label: "weight loss on GLP-1 drugs — via appetite suppression", source: "NEJM · STEP / SURMOUNT" },
      { value: "39.9% → 37.0%", label: "first sustained U.S. obesity drop as GLP-1 use rose, 2022–25", source: "Gallup" },
    ],
    status: "In production",
  },
  {
    number: "04",
    slug: "outran-the-evidence",
    title: "We Outran the Evidence",
    kicker: "Medicine · Evidence",
    dek: "Adults get to decide about their own bodies — that was never the argument. The argument is about children, and whether the institutions we trusted told us the truth about a treatment model built on remarkably little evidence.",
    quietPart:
      "A field that punishes its own skeptics has stopped behaving like a science. Asking for the data before the needle is not cruelty — it is the most basic form of care.",
    runtime: "24–28 min",
    stats: [
      { value: "4 years", label: "Cass Review; eight commissioned systematic reviews", source: "NHS England, 2024" },
      { value: "1 of 50", label: "puberty-blocker studies rated high-quality — 'no conclusions can be drawn'", source: "Univ. of York · Arch. Dis. Child., 2024" },
      { value: "3 countries", label: "independently restricted blockers (England, Sweden, Finland)", source: "national health authorities" },
    ],
    status: "In production",
  },
];
