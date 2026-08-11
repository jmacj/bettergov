/**
 * PROTOTYPE — throwaway. See .claude/worktrees/… design record.
 *
 * Three variants of the "how do I contribute" page, switchable via
 * `?variant=A|B|C`, with a second `?copy=shared|tuned` axis, on the
 * throwaway route `/prototype/contribute`.
 *
 * The entry points below are the CONSTANT under test. Placement is the
 * variable. Content is deliberately identical across variants (shared copy)
 * so the maintainer's pick is interpretable — if copy differed too, we
 * couldn't tell whether they chose the placement or the wording.
 *
 * Ordering is by COMMITMENT, lowest first. That ranking needs no maintainer
 * input and cannot go stale, unlike ranking by "what the project needs most".
 *
 * Every destination here is an EXISTING entry point. This page is an index,
 * not a new surface — it duplicates no CTA and asserts no priority.
 */

export type Mode =
  | 'community'
  | 'report'
  | 'ideas'
  | 'code'
  | 'review'
  | 'project';

export interface EntryPoint {
  id: string;
  /** Ascending commitment. Drives display order. */
  commitment: 1 | 2 | 3 | 4 | 5;
  mode: Mode;
  modeLabel: string;
  /** "Is this you?" — the router's actual job. */
  who: string;
  action: string;
  href: string;
  /** Shown as a small muted note. Must be evergreen — no counts, no dates. */
  note?: string;
  external: boolean;
}

const REPO = 'https://github.com/bettergovph/bettergov';

export const ENTRY_POINTS: EntryPoint[] = [
  {
    id: 'discord',
    commitment: 1,
    mode: 'community',
    modeLabel: 'Community',
    who: 'You want to see what people are working on before committing to anything.',
    action: 'Join the Discord',
    href: '/discord',
    note: 'Everything else starts here. No technical skill needed.',
    external: false,
  },
  {
    id: 'report',
    commitment: 2,
    mode: 'report',
    modeLabel: 'Report',
    who: 'You spotted something wrong — a broken page, outdated info, a wrong number.',
    action: 'Open a bug report',
    href: `${REPO}/issues/new?template=bug_report.md`,
    note: 'No account beyond GitHub. Takes about two minutes.',
    external: true,
  },
  {
    id: 'ideas',
    commitment: 2,
    mode: 'ideas',
    modeLabel: 'Ideas',
    who: 'You have an idea for something BetterGov should build.',
    action: 'Share an idea',
    href: '/ideas',
    note: 'Goes to the team as a GitHub issue.',
    external: false,
  },
  {
    id: 'data',
    commitment: 3,
    mode: 'code',
    modeLabel: 'Data',
    who: 'You can fix or add government data — directories, hotlines, services.',
    action: 'Browse the data files',
    href: `${REPO}/tree/main/src/data`,
    note: 'Plain JSON. Edit on GitHub without cloning anything.',
    external: true,
  },
  {
    id: 'code',
    commitment: 4,
    mode: 'code',
    modeLabel: 'Code',
    who: 'You write code and want a scoped first task.',
    action: 'Find a good first issue',
    href: `${REPO}/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22`,
    note: 'Read CONTRIBUTING.md first — it covers setup and the PR flow.',
    external: true,
  },
  {
    id: 'review',
    commitment: 4,
    mode: 'review',
    modeLabel: 'Review',
    who: 'You can read code and give feedback — often more useful than writing more.',
    action: 'Review an open pull request',
    href: `${REPO}/pulls`,
    note: 'Reviews are the scarcest thing in most open-source projects.',
    external: true,
  },
  {
    id: 'sibling',
    commitment: 4,
    mode: 'project',
    modeLabel: 'Other projects',
    who: 'This repo is one of many. Another BetterGov project may fit you better.',
    action: 'Browse all BetterGov projects',
    href: '/projects',
    note: 'Each project has its own repository and its own open issues.',
    external: false,
  },
  {
    id: 'register',
    commitment: 5,
    mode: 'project',
    modeLabel: 'Your project',
    who: 'You are building your own civic tech project and want it listed here.',
    action: 'Ask about listing your project',
    href: '/discord',
    // Deliberately routes to a human: the registry (public/api/projects.json,
    // repoType: "community") is real and schema-enforced, but the submission
    // path is undocumented. Pointing at /projects would be a dead end — it
    // lists projects but never says how to get listed.
    note: 'Community projects are listed alongside the official ones.',
    external: false,
  },
];

/**
 * Per-variant copy overrides for the `?copy=tuned` axis.
 *
 * NOT sent to the maintainer in round one — held for the moment they say
 * "I like the placement but the wording is off". Shared copy is what ships in
 * the screenshots, so placement is the only variable.
 */
export interface Intro {
  eyebrow: string;
  heading: string;
  standfirst: string;
}

export const SHARED_INTRO: Intro = {
  eyebrow: 'Contribute',
  heading: 'Ways to help, from easiest to hardest',
  standfirst:
    'BetterGov is volunteer-built and open source. Every way in is listed below, ordered by how much it asks of you. Start anywhere.',
};

export const TUNED_INTRO: Record<'A' | 'B' | 'C', Intro> = {
  // Appended to the bottom of a long, high-energy page — the reader has
  // already been sold. Cut the pitch, get straight to the list.
  A: {
    eyebrow: 'Ready?',
    heading: 'Pick where to start',
    standfirst: 'Ordered by how much each one asks of you.',
  },
  // Sits directly under a trimmed hero. Needs a little framing, not a pitch.
  B: {
    eyebrow: 'Contribute',
    heading: 'Every way in, ordered by commitment',
    standfirst:
      'Start with the first one that sounds like you. Nothing here requires permission.',
  },
  // Standalone page. May arrive cold from a search engine, so it carries the
  // full context that the other two inherit from the page above them.
  C: {
    eyebrow: 'Contribute',
    heading: 'What is the best way to contribute right now?',
    standfirst:
      'BetterGov.ph is a volunteer-led, open-source civic tech project. Below is every current way in, ordered by how much it asks of you — pick the first one that sounds like you.',
  },
};
