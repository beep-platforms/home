// The Pala Rifle guide's film room: Grubby tutorials mapped to curriculum
// phases. Video IDs are curated from verified search results only (Aug 2026
// pass: 82 candidates, 24 survived ID re-verification). `start`/`end`
// (seconds) scope an embed to a clip; entries without them embed the full
// video — scripts/grubby-transcriber.py mines transcripts for the missing
// spans (run it somewhere youtube.com is reachable, paste the spans here;
// scripts/film-room-clips.json is the ready-made input).

export type GuidePhase =
  | "cockpit"
  | "build-order"
  | "creeping"
  | "fight-micro"
  | "matchups"
  | "mastery"
  | "archmage-graduation";

export interface FilmClip {
  readonly videoId: string;
  readonly title: string;
  readonly topic: string;
  readonly phase: GuidePhase;
  readonly start?: number;
  readonly end?: number;
  readonly spanLabel?: string;
}

export const filmRoom: readonly FilmClip[] = [
  // Phase 0 — the cockpit
  {
    videoId: "Gfn7gmS8eeg",
    title: "Getting Started: Why, How and Where to Play (Beginner's Guide #1)",
    topic:
      "Series opener of Grubby's 2026 beginner series — setup and where to play (W3Champions).",
    phase: "cockpit",
  },
  {
    videoId: "QGwAUV4bdIw",
    title: "Interface: Hotkeys and Control Groups (Beginner's Guide #2)",
    topic:
      "The core control-scheme lesson — hotkey setup and control groups, straight from the source of this guide's Phase 0.",
    phase: "cockpit",
  },
  {
    videoId: "XHSwTMD1Zxk",
    title: "Economy: Gold, Lumber and Upkeep (Beginner's Guide #3)",
    topic:
      "How income and the upkeep tax shape army-size decisions — the theory behind the 50-food discipline gate.",
    phase: "cockpit",
  },
  {
    videoId: "hTzu5i4F3lU",
    title: "Heroes: XP, Abilities and Spells (Beginner's Guide #4)",
    topic:
      "Hero XP and leveling — the reason creeping exists, and the foundation for the level-3 timing gates.",
    phase: "cockpit",
  },

  // Phase 1 — the script
  {
    videoId: "V1MyCsxwFxU",
    title: "NEW Human Beginner's Guide",
    topic:
      "The canonical Human rifle-caster build order, step by step — the Bloody Beginner build this curriculum's chassis comes from.",
    phase: "build-order",
  },
  {
    videoId: "Du7w2TQOesU",
    title: "Human Guide — From Theory to Practice",
    topic:
      "The same build applied in real games — what the script looks like when an opponent is shooting at it.",
    phase: "build-order",
  },
  {
    videoId: "XL3rpBSeEQM",
    title: "The Easiest Beginner Build for the \"Easiest\" Warcraft 3 Race",
    topic:
      "Grubby's 2025 low-mechanics Human build — a simpler on-ramp if the full script feels heavy.",
    phase: "build-order",
  },
  {
    videoId: "OD8CElxqFzA",
    title: "Human Base Layout Tutorial",
    topic:
      "Building placement for defense and worker safety. Older patch, but the placement principles carry.",
    phase: "build-order",
  },
  {
    videoId: "1AzS8Erf3go",
    title: "Grubby Refines Guzu's Pala Rifle Strategy (Coaching)",
    topic:
      "Coaching VOD on this guide's exact strategy — build refinement, timings, and when Pala Rifle works.",
    phase: "build-order",
  },

  // Phase 2 — the map
  {
    videoId: "YMUTzguoT3o",
    title: "Early Game: Creeping and Build Orders (Beginner's Guide #6)",
    topic:
      "The most current early-game walkthrough — creeping safely while holding a build order together.",
    phase: "creeping",
  },
  {
    videoId: "jWnalz1L0bM",
    title: "The Importance of Creeping",
    topic:
      "Why creeping decides games — the foundation video for camp selection and route thinking.",
    phase: "creeping",
  },
  {
    videoId: "k-gCz2MLW8o",
    title: "Planning Your Route with Creep Orders",
    topic:
      "Route planning and camp order — including how to pull camps so the whole camp attacks at once. The camp-pulling reference.",
    phase: "creeping",
  },
  {
    videoId: "KB2XoveGeYA",
    title: "Planning Late Game Creep Routes",
    topic:
      "Extending route planning past the opening — where the XP lives in longer games.",
    phase: "creeping",
  },

  // Phase 3 — the fight
  {
    videoId: "5Fesan4GNVc",
    title: "How to Micro Better?",
    topic:
      "The decisions behind unit control — Grubby's core micro-improvement lesson, not a speed lecture.",
    phase: "fight-micro",
  },
  {
    videoId: "kSuBzZ2DSvE",
    title: "Short Game with Micro & Macro Guide",
    topic:
      "A short annotated game — the fight fundamentals and the macro loop applied live.",
    phase: "fight-micro",
  },
  {
    videoId: "rD1hmcFzp0U",
    title: "Micro Tips to Harstem (Coaching #6)",
    topic:
      "Coaching VOD — Orc-framed, but the focus-fire and positioning principles transfer straight to the rifle ball.",
    phase: "fight-micro",
  },

  // Phase 4 — the opponents
  {
    videoId: "rkD3c-qLOXs",
    title: "Army: Countering Units; Damage & Armor Types (Beginner's Guide #5)",
    topic:
      "The damage-vs-armor table — the knowledge that turns a scout into a plan.",
    phase: "matchups",
  },
  {
    videoId: "snMLlE7pXbc",
    title: "Undead Bloody Beginner Guide",
    topic:
      "Know your enemy: what ladder Undead opponents are building at you in the home matchup.",
    phase: "matchups",
  },
  {
    videoId: "0-zQThzPwTc",
    title: "Orc Bloody Beginner Guide",
    topic: "Know your enemy: the standard beginner Orc plan you'll queue into.",
    phase: "matchups",
  },
  {
    videoId: "l_3HljSUjjc",
    title: "Night Elf Bloody Beginner Guide",
    topic:
      "Know your enemy: the Night Elf side of the matchup where the Paladin shell struggles.",
    phase: "matchups",
  },

  // Phase 5 — the bar
  {
    videoId: "8iW1a9lfGdo",
    title: "Ultimate Human Guide: Beginner & Intermediate",
    topic:
      "Grubby's most recent comprehensive Human guide — the capstone watch for climbing past the beginner shell.",
    phase: "mastery",
  },
  {
    videoId: "e5xTD-H9D-g",
    title: "60 APM Game and Then 600 APM Game — The Difference",
    topic:
      "Exactly what extra actions buy — and how much is winnable on decisions alone. The plateau-diagnosis argument, on tape.",
    phase: "mastery",
  },

  // Phase 6 — graduation
  {
    videoId: "4dQ96VI0bBM",
    title: "WC3 Hero Spotlight: The Archmage",
    topic:
      "The Archmage's abilities, skilling, and role — the primer for the graduation hero.",
    phase: "archmage-graduation",
  },
  {
    videoId: "4fwM2GGzq9k",
    title: "Rush to Level 3 Archmage — Tower Rush and Spam Elementals",
    topic:
      "Applied Archmage leveling: racing to level 3 and leaning on Water Elementals for camps.",
    phase: "archmage-graduation",
  },
];
