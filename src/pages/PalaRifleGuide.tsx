import { useEffect, useState } from "react";
import { filmRoom, type FilmClip, type GuidePhase } from "../data/filmRoom";

// Gate checkboxes persist in localStorage so the guide works as a training
// tracker across visits. All GateList instances share one key; toggle()
// read-merge-writes so two lists never clobber each other's boxes.
const STORAGE_KEY = "wc3-pala-rifle-gates-v1";

function loadGates(): Record<string, boolean> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function PalaRifleGuide() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
      setProgress(pct);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <article className="min-h-screen bg-zinc-950 font-serif text-zinc-200 antialiased">
      <div
        className="fixed inset-x-0 top-0 z-20 h-0.5 origin-left bg-amber-400"
        style={{ transform: `scaleX(${progress / 100})` }}
        aria-hidden
      />

      <header className="sticky top-0 z-10 border-b border-zinc-900/80 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <a
            href="/"
            className="font-mono text-sm text-zinc-400 transition hover:text-amber-400"
          >
            ← skillcraft.codes
          </a>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">
            Guide · Warcraft III
          </span>
        </div>
      </header>

      <Hero />
      <Body />

      <footer className="border-t border-zinc-900 px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500">
            About this guide
          </p>
          <p className="mt-3 text-base leading-relaxed text-zinc-400">
            Synthesized August 2026 from Liquipedia build-order and patch
            pages, WC3 Gym's Paladin Rifle and Rifle Caster guides (plus both
            of its play-against-it counter-guides), warcraft3.info's Pala
            Rifle coverage, and Grubby's 2025–26 coaching content — then
            fact-checked against the 2.0.x patch notes. Stable mechanics
            (upkeep, militia timer, TP rules) are solid; patch-sensitive spell
            values are quoted from patch notes and worth verifying in-client.
            No ladder win-rates are quoted anywhere because none could be
            verified.
          </p>
          <p className="mt-8 font-mono text-xs text-zinc-600">
            <a href="/" className="text-zinc-400 transition hover:text-amber-400">
              Back to skillcraft.codes
            </a>
          </p>
        </div>
      </footer>
    </article>
  );
}

function Hero() {
  return (
    <section className="border-b border-zinc-900 px-6 pb-20 pt-24 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400">
          The Human Curriculum
        </p>
        <h1 className="mt-6 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-zinc-50 sm:text-6xl md:text-7xl">
          Pala Rifle to <span className="italic text-amber-300">mastery</span> —
          and what comes after
        </h1>
        <p className="mt-8 max-w-2xl font-serif text-xl leading-relaxed text-zinc-300 sm:text-2xl">
          A five-phase training plan for Human's Paladin–Riflemen strategy:
          drills, measurable exit gates, a plateau diagnosis, and the
          graduation path to Archmage standard.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          <span className="text-zinc-300">By Arrington Walters</span>
          <span className="text-zinc-700">·</span>
          <span>August 4, 2026</span>
          <span className="text-zinc-700">·</span>
          <span>Patch 2.0.4 · W3Champions</span>
        </div>
      </div>
    </section>
  );
}

function Body() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto flex max-w-2xl flex-col gap-10">
        <Lede />
        <ByTheNumbers />

        <PhaseSection index="Phase 0" title="The cockpit: lock the hands first">
          <p>
            Reforged's hotkey landscape is genuinely messy — patch 2.0.3 locked
            grid remapping and broke community quickcast configs before they
            were re-patched. Two rules keep you safe: keep your bindings in the{" "}
            <strong className="font-semibold text-zinc-50">
              W3Champions launcher's hotkey manager
            </strong>{" "}
            (the only low-friction tool that also remaps inventory — vanilla
            inventory is hardcoded to numpad 7, 8, 4, 5, 1, 2), and never
            change bindings mid-phase.
          </p>
          <ControlGroupTable />
          <p>
            The macro loop is the one habit that outranks every other:{" "}
            <Key>Backspace</Key> jumps home, queue a peasant or rifle,{" "}
            <Key>F1</Key> snaps back to the army. Run it every thirty in-game
            seconds until it runs itself. <Key>Tab</Key> cycles subgroups
            inside a mixed control group; <Key>F8</Key> grabs idle workers;{" "}
            <Key>Shift</Key> queues creep routes and item pickups.
          </p>
          <DrillBox>
            Ten minutes before every session: one opening rep while narrating
            targets out loud, then two minutes of pure loop reps. You're done
            when your eyes never drop to the keyboard.
          </DrillBox>
        </PhaseSection>

        <PhaseSection index="Phase 1" title="The script: run the build cold">
          <p>
            The definition of the build, per Liquipedia:{" "}
            <strong className="font-semibold text-zinc-50">
              Paladin first, Riflemen immediately, zero Footmen.
            </strong>{" "}
            Humans start with 150 lumber and the Altar goes down at once —
            total tier-1 lumber spend lands around 210, which is why farms
            feel tight the whole tier. In landmark form:
          </p>
          <BuildOrderTable />
          <p className="text-base text-zinc-400">
            Numbers per the 2.0.x patch notes (rifle 205g/30l, 535 HP, 1.4s
            attack cooldown since 2.0.4; Holy Light cooldown 5.5s; Devotion
            2/3.5/5). Record one clean game as your{" "}
            <em className="italic">reference replay</em> — every future rep is
            graded against it, ±15 seconds per landmark.
          </p>
          <DrillBox>
            The community's stated AI ladder: beat Easy, then Normal{" "}
            <em className="italic">regularly</em>, then Insane. Keep the
            script on screen (the wc3gymnasium overlay) until memorized, then
            take it away.
          </DrillBox>
          <GateList
            gates={[
              {
                id: "p1-blind",
                text: "Five consecutive AI games executing the opening blind, each landmark within ±15s of the reference replay.",
              },
              {
                id: "p1-upkeep",
                text: "Upkeep discipline: never drift idly past 50 food (No Upkeep = 10g/trip; 51–80 = 7g; 81+ = 4g). Break upkeep deliberately, never accidentally.",
              },
              {
                id: "p1-idle",
                text: "Idle-worker button dark at every checkpoint; no Barracks gap in the tier-1→2 window.",
              },
              {
                id: "p1-float",
                text: "Float ceilings: gold under ~300–500, lumber under ~200 through tiers 1–2 (wc3v.com's Idle Resources grade is the objective check).",
              },
            ]}
          />
        </PhaseSection>

        <PhaseSection index="Phase 2" title="The map: creeping, militia, and a fixed pool">
          <p>
            Restrict yourself to three or four maps so creep routes amortize
            across every game — Last Refuge, Tidehunters, Northern Isles,
            Autumn Leaves. Plan each route once (Coff Creeps), shift-queue it
            in game, creep green → orange → red. The goal that matters:{" "}
            <strong className="font-semibold text-zinc-50">
              Paladin level 3 by your tier-2 timing
            </strong>{" "}
            — the push trigger depends on it.
          </p>
          <p>
            Militia is this build's Swiss-army knife. Call to Arms converts
            nearby peasants for exactly 45 seconds (armor 3 since 2.0.2) —
            pull <em className="italic">lumber</em> peasants, not gold, and
            send them back before the timer expires them into walking corpses.
            And because the build has no Footman,{" "}
            <strong className="font-semibold text-zinc-50">
              scout with a militia
            </strong>{" "}
            — once early, and again before the tier-2 push so the push has a
            target, not a hope.
          </p>
          <PullQuote>
            The Paladin never fights without a Town Portal. Replacement: 350
            gold. He is invulnerable while channeling it.
          </PullQuote>
          <GateList
            gates={[
              {
                id: "p2-routes",
                text: "One memorized creep route per pool map, shift-queued without pausing.",
              },
              {
                id: "p2-lvl3",
                text: "Paladin hits level 3 by the tier-2 timing in four of five games.",
              },
              {
                id: "p2-militia",
                text: "Zero games in a five-game review where peasants die mid-militia to counter-harass — and zero games where a safe militia window went unused.",
              },
              {
                id: "p2-scout",
                text: "Every replay shows a scout before the tier-2 push, and you can name the opponent's tech from it.",
              },
            ]}
          />
        </PhaseSection>

        <PhaseSection index="Phase 3" title="The fight: the rifle-ball micro package">
          <p>
            Riflemen are the ideal focus-fire unit — short attack animation,
            effectively instant damage — and the worst unit to let melee
            touch: medium armor takes +50% from normal attacks. Everything
            in the fight follows from those two facts.
          </p>
          <ul className="ml-0 flex flex-col gap-3 border-l-2 border-amber-400/40 pl-6 text-zinc-300">
            <li>
              <strong className="font-semibold text-zinc-50">Formation:</strong>{" "}
              heroes and Breakers in front, rifles in an arc behind on Hold
              Position, Priests mixed into the line. Paladin center-back where
              Holy Light covers the arc; Blood Mage rear — he is the
              Sleep-and-snipe target.
            </li>
            <li>
              <strong className="font-semibold text-zinc-50">
                Focus fire without overkill:
              </strong>{" "}
              one target at a time; switch before the current one dies so no
              volley lands on a corpse. Dispellers first, then casters, then
              light-armor fliers (piercing does 200% to light).
            </li>
            <li>
              <strong className="font-semibold text-zinc-50">
                Holy Light decisions:
              </strong>{" "}
              heal the focused rifle before it drops critical; never spend it
              on a near-full target; against Undead it flips into a nuke. The
              graduate move is Banish → Holy Light — banished units take +66%
              from spells <em className="italic">and</em> +66% from heals, so
              it amplifies both directions.
            </li>
            <li>
              <strong className="font-semibold text-zinc-50">
                Retreat discipline:
              </strong>{" "}
              the hero exits at a pre-agreed HP floor (~40–50% against
              burst); the TP fires <em className="italic">before</em> the
              surround completes. A dead Paladin forfeits the entire timing —
              revive time scales with level.
            </li>
          </ul>
          <DrillBox>
            Insane AI is the micro gym — it hero-snipes, so it drills hero
            dancing, injured-rifle pullback, and spell-first sequencing under
            real pressure. Then slow-motion replay review: count overkill
            volleys per fight. Mastery is zero or one.
          </DrillBox>
          <GateList
            gates={[
              {
                id: "p3-overkill",
                text: "At most one overkill volley per engagement across a three-game review.",
              },
              {
                id: "p3-hl",
                text: "~0 rifle deaths while Holy Light sat off cooldown; no casts on near-full targets.",
              },
              {
                id: "p3-hero",
                text: "Hero deaths in single digits per ten games, and zero deaths with an unused TP in inventory.",
              },
              {
                id: "p3-arc",
                text: "Fights start with the arc formed and heroes in front — check the first frame of each engagement.",
              },
            ]}
          />
        </PhaseSection>

        <PhaseSection index="Phase 4" title="The opponents: same chassis, different plans">
          <p>
            You know a matchup when the first scout answers three questions:
            what are they teching, what will they punish me with, and which of
            my branches answers it. Know what they see, too — your tell is{" "}
            <strong className="font-semibold text-zinc-50">
              no Footmen plus a very early Blacksmith
            </strong>
            , visible to an acolyte or wisp by minute two.
          </p>
          <MatchupBlock race="vs Undead" verdict="home turf — genuinely meta">
            The engine: Blood Mage siphons the Death Knight, feeds the
            Paladin; Holy Light nukes undead; Banish-then-Holy-Light bursts
            fiends. Expect every prepared answer: fast tier-3 Ghoul Frenzy
            with Lich third (level-2 Frost Nova is the rifle-killer), ghouls
            piled two or three per rifleman, Dreadlord Sleep on your Blood
            Mage, Destroyers eating Banish. Branch rules: they expand early →
            Mortars, break it before you're outmassed; they turtle → Workshop
            siege; you're ahead → your own expansion, Gryphons late.
          </MatchupBlock>
          <MatchupBlock race="vs Orc" verdict="strong, with a nerf-thread history">
            Ladder Orcs still die to the standard script. The prepared ones
            open Far Seer — never Blademaster into a rifle ball — then mass
            Grunts, Raider Ensnare, Spirit Link to smear your focus fire. An
            Arcane Tower in the main is mandatory. The danger point is tier-3
            Taurens: you're in trouble unless Gryphons arrive, so plan the
            switch before it's forced.
          </MatchupBlock>
          <MatchupBlock race="vs Night Elf" verdict="honest talk: wrong shell">
            Paladin-first sustain is considered hard-countered here — Mana
            Burn attacks the engine, and a one-base build loses the economy
            race. Losses in this matchup are expected during training; don't
            let them trigger a premature switch. The Human rifle answer vs NE
            is the Archmage rifle rush — that build is the Phase 6 bridge.
          </MatchupBlock>
          <MatchupBlock race="Mirror" verdict="rifle-caster is the underdog">
            Explicitly weak into Defend Footmen (50% piercing reduction plus
            25% deflect since 2.0.2) and Breaker fronts. The mirror's standard
            is Archmage plus Footmen into Priest–Breaker — another Phase 6
            unlock. Until then: force fights before Defend clumps, snipe
            Breakers first.
          </MatchupBlock>
          <GateList
            gates={[
              {
                id: "p4-read",
                text: "In five straight ladder games you named the opponent's plan at first scout — and the replay shows your branch answering it.",
              },
              {
                id: "p4-ud",
                text: "Positive record over your last ten Undead games at current MMR.",
              },
              {
                id: "p4-branch",
                text: "Each branch executed at least once on ladder: Mortar expo-break, Breaker front, tier-2 expansion, Gryphon switch.",
              },
            ]}
          />
        </PhaseSection>

        <PhaseSection index="Phase 5" title="The bar: mastery, measured">
          <p>
            Ladder loop: every loss through wc3v.com (it letter-grades Macro,
            Production, Item Economy, and Idle Resources against an
            auto-matched pro game, and detects your creep route); one replay a
            week to the WC3 Gym Discord for human eyes; monthly, re-run your
            reference-replay comparison, because entropy creeps in. W3Champions
            starts everyone at 1500 MMR against a veteran playerbase — early
            records lie, so trust the grades, not the win rate.
          </p>
          <p>
            The diagnosis that answers{" "}
            <em className="italic">"should I switch guides?"</em> comes in two
            rows:
          </p>
          <DiagnosisTable />
          <PullQuote>
            Decision quality, not speed, is the constraint — pros win at 60–90
            APM. Switching builds never fixes a mechanics plateau.
          </PullQuote>
          <GateList
            gates={[
              {
                id: "p5-grades",
                text: "wc3v grades A/B on Macro, Production, and Idle Resources across your last five ladder games.",
              },
              {
                id: "p5-branches",
                text: "You pick the correct branch per scout without post-hoc regret in review.",
              },
              {
                id: "p5-plateau",
                text: "Your losses fit the strategy-plateau row, not the mechanics row, for two consecutive weeks.",
              },
            ]}
          />
        </PhaseSection>

        <PhaseSection index="Phase 6" title="Graduation: Archmage standard, tavern side-arc">
          <p>
            Archmage-first is the <em className="italic">current</em> default
            Human opening in all four matchups — not a retired classic. It's
            the growth path because it exercises everything Pala Rifle
            deliberately doesn't: the race's expansion identity, creep-route
            economics, harass defense, real multitasking. Your Paladin doesn't
            retire — he becomes the third hero against Undead — and the whole
            rifle ball carries over intact. Learn it as a bridge:
          </p>
          <ol className="ml-0 flex list-decimal flex-col gap-3 pl-10 text-zinc-300 marker:font-mono marker:text-sm marker:text-amber-400">
            <li>
              <strong className="font-semibold text-zinc-50">
                One-base AM rifle-caster
              </strong>{" "}
              — the smallest step: same ball, swap Paladin → Archmage (Water
              Elemental + Brilliance, always) with Mountain King second, Storm
              Bolt first. 10/18 AM · 24/24 Keep · 24/30 first rifle · 27/30
              Sanctum.
            </li>
            <li>
              <strong className="font-semibold text-zinc-50">
                Militia creeping in isolation
              </strong>{" "}
              — hero pops → bell five lumber peasants → creep the camp between
              main and natural with the Water Elemental tanking → queue
              replacement peasants.
            </li>
            <li>
              <strong className="font-semibold text-zinc-50">
                One-creep-camp-into-expansion
              </strong>{" "}
              — the modern standard, and the real graduation exam: creep that
              in-between camp, drop the expansion Town Hall at 210 wood and
              power-build it, tower when the militia revert.
            </li>
            <li>
              <strong className="font-semibold text-zinc-50">
                Expansion defense, routes, casters, branches
              </strong>{" "}
              — Arcane Towers at both bases, level 3 by tier 2, Priests →
              Sorceresses → Breakers (Master Trainings research in 60 seconds
              now), then the per-matchup follow-ups.
            </li>
          </ol>
          <p>
            And the tavern question — a first hero who replaces the Paladin
            but keeps the rifle-ball playstyle. Any tavern hero costs gold
            plus 135 lumber and arrives later, offset by the Tavern's
            instant-revive. Ranked for this exact ask:
          </p>
          <TavernTable />
          <p>
            The recommendation: Archmage is the curriculum, tavern heroes are
            electives. Slot Dark Ranger experiments into vs-NE games — where
            the Paladin shell is weakest and her meta case is strongest — and
            keep Alchemist for the fun "plays most like my build" nights.
            Don't let either delay bridge step 3; the expansion pattern is
            what actually raises the ceiling.
          </p>
        </PhaseSection>

        <PhaseSection index="Tonight" title="The session script">
          <ol className="ml-0 flex list-decimal flex-col gap-3 pl-10 text-zinc-300 marker:font-mono marker:text-sm marker:text-amber-400">
            <li>
              <strong className="font-semibold text-zinc-50">Warmup, 10 min:</strong>{" "}
              the Phase 0 drill — one narrated opening rep, two minutes of
              macro-loop reps.
            </li>
            <li>
              <strong className="font-semibold text-zinc-50">Placement, 5 min:</strong>{" "}
              find your first unchecked gate above. That phase is tonight's
              focus. The boxes save.
            </li>
            <li>
              <strong className="font-semibold text-zinc-50">Reps, 30–40 min:</strong>{" "}
              two AI games drilling that gate, then two or three ladder games
              on the fixed map pool trying to pass it. One build, every game.
            </li>
            <li>
              <strong className="font-semibold text-zinc-50">Review, 10 min:</strong>{" "}
              worst loss into wc3v; read the grades against tonight's gate
              only. Check the box, or write down the one number that failed.
            </li>
            <li>
              <strong className="font-semibold text-zinc-50">Archmage nights:</strong>{" "}
              two AI reps of bridge step 1, then one ladder game. Expect it to
              feel worse than the Paladin for a week. That's the point.
            </li>
          </ol>
        </PhaseSection>

        <FilmRoom />
      </div>
    </div>
  );
}

const PHASE_GROUPS: readonly { key: GuidePhase; title: string }[] = [
  { key: "cockpit", title: "Phase 0 · The cockpit" },
  { key: "build-order", title: "Phase 1 · The script" },
  { key: "creeping", title: "Phase 2 · The map" },
  { key: "fight-micro", title: "Phase 3 · The fight" },
  { key: "matchups", title: "Phase 4 · The opponents" },
  { key: "mastery", title: "Phase 5 · The bar" },
  { key: "archmage-graduation", title: "Phase 6 · Graduation" },
];

function FilmRoom() {
  return (
    <PhaseSection index="Film room" title="Grubby's tape, phase by phase">
      <p>
        Nobody has taught more of this curriculum on camera than Grubby. Each
        clip below is mapped to the phase it serves — watch the one attached
        to the gate you're currently failing, not all of them at once. Clips
        load only when you press play (nothing is fetched from YouTube until
        then); entries with a time span jump straight to the relevant moment.
      </p>
      {PHASE_GROUPS.map((group) => {
        const clips = filmRoom.filter((c) => c.phase === group.key);
        if (clips.length === 0) return null;
        return (
          <div key={group.key} className="flex flex-col gap-3">
            <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500">
              {group.title}
            </p>
            {clips.map((clip) => (
              <ClipCard key={`${clip.videoId}-${clip.start ?? 0}`} clip={clip} />
            ))}
          </div>
        );
      })}
    </PhaseSection>
  );
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

interface ClipCardProps {
  readonly clip: FilmClip;
}

function ClipCard({ clip }: ClipCardProps) {
  const [playing, setPlaying] = useState(false);

  const params = new URLSearchParams({ rel: "0", autoplay: "1" });
  if (clip.start !== undefined) params.set("start", String(clip.start));
  if (clip.end !== undefined) params.set("end", String(clip.end));
  const embedUrl = `https://www.youtube-nocookie.com/embed/${clip.videoId}?${params.toString()}`;
  const watchUrl =
    clip.start !== undefined
      ? `https://www.youtube.com/watch?v=${clip.videoId}&t=${clip.start}s`
      : `https://www.youtube.com/watch?v=${clip.videoId}`;

  const spanChip =
    clip.start !== undefined && clip.end !== undefined
      ? `${formatTime(clip.start)}–${formatTime(clip.end)}`
      : clip.start !== undefined
        ? `from ${formatTime(clip.start)}`
        : "full video";

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
      {playing ? (
        <iframe
          className="aspect-video w-full rounded-md border-0"
          src={embedUrl}
          title={clip.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : null}
      <div className={`flex items-start gap-4 ${playing ? "mt-3" : ""}`}>
        {playing ? null : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${clip.title}`}
            className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-amber-400/40 text-amber-300 transition hover:border-amber-400 hover:bg-amber-400/10"
          >
            <span aria-hidden className="translate-x-px text-sm">▶</span>
          </button>
        )}
        <div className="min-w-0">
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-serif text-lg font-medium leading-snug text-zinc-100">
              {clip.title}
            </span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-amber-400">
              {clip.spanLabel ? `${clip.spanLabel} · ` : ""}
              {spanChip}
            </span>
          </p>
          <p className="mt-1 text-base leading-relaxed text-zinc-400">
            {clip.topic}{" "}
            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap font-mono text-xs text-zinc-500 underline-offset-2 transition hover:text-amber-400 hover:underline"
            >
              watch on YouTube ↗
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function Lede() {
  return (
    <p className="font-serif text-lg leading-[1.7] text-zinc-200 first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:font-medium first-letter:leading-[0.85] first-letter:text-amber-300 sm:text-xl">
      Paladin plus Riflemen is not training wheels. It's a live,
      twice-nerfed, complained-about meta strategy — genuinely meta against
      Undead, strong across the ladder, and simple enough to hold in one
      head while the rest of the game gets learned around it. That makes it
      the ideal first build to take all the way: one strategy, every game,
      until the losses stop being about execution. This is the curriculum
      for doing that — five phases, each with drills and exit gates you can
      verify from a replay, then a graduation decision made on evidence
      instead of frustration.
    </p>
  );
}

function ByTheNumbers() {
  const stats = [
    { value: "5", label: "phases to the bar" },
    { value: "45s", label: "militia timer" },
    { value: "50", label: "food, the no-upkeep line" },
    { value: "1500", label: "W3C starting MMR" },
  ];

  return (
    <aside className="my-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-start gap-1 bg-zinc-950 px-5 py-4"
        >
          <span className="font-serif text-3xl font-medium text-zinc-100 sm:text-4xl">
            {stat.value}
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-zinc-500">
            {stat.label}
          </span>
        </div>
      ))}
    </aside>
  );
}

interface PhaseSectionProps {
  readonly index: string;
  readonly title: string;
  readonly children: React.ReactNode;
}

function PhaseSection({ index, title, children }: PhaseSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className="mt-6">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-amber-400">
          {index}
        </p>
        <h2 className="mt-2 font-serif text-2xl font-medium text-zinc-50 sm:text-3xl">
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-5 text-lg leading-[1.75] text-zinc-300 sm:text-[1.15rem]">
        {children}
      </div>
    </section>
  );
}

interface PullQuoteProps {
  readonly children: React.ReactNode;
}

function PullQuote({ children }: PullQuoteProps) {
  return (
    <blockquote className="my-4 border-l-2 border-amber-400 pl-6 font-serif text-2xl italic leading-snug text-zinc-100 sm:text-3xl">
      {children}
    </blockquote>
  );
}

interface DrillBoxProps {
  readonly children: React.ReactNode;
}

function DrillBox({ children }: DrillBoxProps) {
  return (
    <aside className="rounded-lg border border-amber-400/25 bg-amber-400/[0.04] px-5 py-4">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-amber-400">
        Drill
      </p>
      <p className="mt-2 text-base leading-relaxed text-zinc-300">{children}</p>
    </aside>
  );
}

interface KeyProps {
  readonly children: string;
}

function Key({ children }: KeyProps) {
  return (
    <kbd className="rounded border border-zinc-700 border-b-2 bg-zinc-900 px-1.5 py-0.5 font-mono text-[0.8rem] text-zinc-200">
      {children}
    </kbd>
  );
}

interface Gate {
  readonly id: string;
  readonly text: string;
}

interface GateListProps {
  readonly gates: readonly Gate[];
}

function GateList({ gates }: GateListProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>(loadGates);

  function toggle(id: string, value: boolean) {
    setChecked((prev) => ({ ...prev, [id]: value }));
    try {
      const merged = loadGates();
      merged[id] = value;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
      // Private-mode storage failures just lose persistence.
    }
  }

  return (
    <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/[0.04] px-5 py-4">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-emerald-300">
        Exit gates
      </p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {gates.map((gate) => (
          <li key={gate.id}>
            <label className="flex cursor-pointer items-baseline gap-3 text-base leading-relaxed text-zinc-300">
              <input
                type="checkbox"
                checked={checked[gate.id] ?? false}
                onChange={(e) => toggle(gate.id, e.target.checked)}
                className="translate-y-0.5 accent-emerald-400"
              />
              <span>{gate.text}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ControlGroupTable() {
  const rows = [
    ["1 / 2 / 3", "Paladin + rifles · second hero + casters · overflow. Groups 1–3 are “things I focus-fire with.” Cap is 12 per group."],
    ["4 / 5+", "Arcane Tower · Barracks · Sanctum/Workshop · 8 Altar · 9 Town Hall."],
    ["F1–F3", "Select heroes; double-tap F1 centers the camera on the Paladin."],
  ] as const;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-base">
        <tbody>
          {rows.map(([keys, what]) => (
            <tr key={keys} className="border-b border-zinc-800/80">
              <td className="whitespace-nowrap py-2.5 pr-6 align-top font-mono text-sm text-amber-300">
                {keys}
              </td>
              <td className="py-2.5 leading-relaxed text-zinc-300">{what}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BuildOrderTable() {
  const rows = [
    ["5/12", "Four peasants to gold, one builds the Altar; queue peasants continuously."],
    ["6/12", "Next peasant: Farm; split ~2 to lumber early."],
    ["early T1", "Blacksmith early — the build's signature and its scouting tell — then Barracks."],
    ["Altar done", "Paladin (5 food, free TP scroll). Holy Light first, Devotion Aura second."],
    ["Rax done", "Riflemen continuously, 3 food each — keep farms ahead of the queue."],
    ["2–3 rifles", "Tech Keep. Stay on one Barracks."],
    ["Tier 2", "Blood Mage second (Banish + Siphon Mana) · Long Rifles (+200 range) · Arcane Tower · Sanctum for Priests."],
    ["Pala 3 + BM 2", "The timing push. If it doesn't end the game: Breakers, Mortars vs turtles, or expand when ahead."],
  ] as const;

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/40 px-5 py-3">
      <table className="w-full text-base">
        <tbody>
          {rows.map(([landmark, action]) => (
            <tr
              key={landmark}
              className="border-b border-zinc-800/80 last:border-b-0"
            >
              <td className="whitespace-nowrap py-2.5 pr-6 align-top font-mono text-sm text-amber-300">
                {landmark}
              </td>
              <td className="py-2.5 leading-relaxed text-zinc-300">{action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface MatchupBlockProps {
  readonly race: string;
  readonly verdict: string;
  readonly children: React.ReactNode;
}

function MatchupBlock({ race, verdict, children }: MatchupBlockProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-5 py-4">
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-serif text-xl font-medium text-zinc-50">
          {race}
        </span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-amber-400">
          {verdict}
        </span>
      </p>
      <p className="mt-2 text-base leading-relaxed text-zinc-300">{children}</p>
    </div>
  );
}

function DiagnosisTable() {
  const rows = [
    {
      signal:
        "Losing with wc3v grades below A/B on Production or Idle Resources; timings drifting; hero level 3 late; overkill volleys frequent.",
      diagnosis: "Mechanics plateau",
      action: "Stay. The build has more to teach; switching resets context without fixing the bottleneck.",
    },
    {
      signal:
        "Execution clean, but losses come from being scouted and countered — the documented answers decide games, and both canonical transitions get answered too.",
      diagnosis: "Strategy plateau",
      action: "The build is the ceiling. Graduate.",
    },
  ] as const;

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/40 px-5 py-3">
      <table className="w-full text-base">
        <thead>
          <tr className="border-b border-zinc-700 text-left font-mono text-[0.65rem] uppercase tracking-[0.15em] text-zinc-500">
            <th className="py-2 pr-4 font-medium">Signal</th>
            <th className="py-2 pr-4 font-medium">Diagnosis</th>
            <th className="py-2 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.diagnosis}
              className="border-b border-zinc-800/80 align-top last:border-b-0"
            >
              <td className="py-2.5 pr-4 leading-relaxed text-zinc-300">
                {row.signal}
              </td>
              <td className="whitespace-nowrap py-2.5 pr-4 font-serif font-medium text-zinc-50">
                {row.diagnosis}
              </td>
              <td className="py-2.5 leading-relaxed text-zinc-300">
                {row.action}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TavernTable() {
  const rows = [
    {
      hero: "Dark Ranger",
      verdict:
        "Best current-meta case. Since 2.0.2 Life Drain transfers drained HP to a friendly unit — a Holy-Light-like sustain verb, channeled. Silence shuts down caster armies; ranged, stands in the ball. Try her first, vs Night Elf.",
    },
    {
      hero: "Goblin Alchemist",
      verdict:
        "Most Paladin-like ability-for-ability: Healing Spray sustains the ball, Acid Bomb shreds armor for the volleys, Transmute prints gold. Off-meta — a ladder surprise, not a pro staple.",
    },
    {
      hero: "Naga Sea Witch",
      verdict:
        "Zero sustain, perfect muscle-memory transfer — Frost Arrows at level 1 make her a rifleman with a slow. Real Human pro precedent vs Night Elf. Priests must carry the healing.",
    },
    {
      hero: "Pandaren Brewmaster",
      verdict:
        "The literal “Tavern brawler,” buffed in 2.0.3/2.0.4 — but he replaces the Paladin's front line, not his healing. A fat evasive body with Drunken Haze protecting the ball. Playable spice; fringe as first hero.",
    },
  ] as const;

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/40 px-5 py-3">
      <table className="w-full text-base">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.hero}
              className="border-b border-zinc-800/80 align-top last:border-b-0"
            >
              <td className="whitespace-nowrap py-2.5 pr-5 font-mono text-sm text-amber-300">
                {i + 1}
              </td>
              <td className="whitespace-nowrap py-2.5 pr-5 font-serif font-medium text-zinc-50">
                {row.hero}
              </td>
              <td className="py-2.5 leading-relaxed text-zinc-300">
                {row.verdict}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
