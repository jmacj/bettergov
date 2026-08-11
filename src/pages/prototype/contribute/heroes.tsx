/**
 * PROTOTYPE — throwaway. Three hero treatments for variant C (/contribute).
 *
 * Each draws on a hero pattern that already exists in this codebase, so the
 * page reads as native rather than invented:
 *
 *   1 Utility   — Ideas / Projects lineage: light, left-aligned, breadcrumb,
 *                 icon beside the h1, a quiet mode strip underneath.
 *   2 Brand     — Home lineage: primary gradient, two columns, glass panel on
 *                 the right holding the lowest-commitment action.
 *   3 Editorial — JoinUs lineage, disciplined: the page's literal question as
 *                 an oversized headline, one accent CTA, no card.
 *
 * Copy here is the TUNED treatment — this page may be arrived at cold from a
 * search engine, so it carries context the other placements inherited from the
 * page above them.
 */
import {
  ArrowRightIcon,
  CodeIcon,
  DatabaseIcon,
  HeartHandshakeIcon,
  RocketIcon,
} from 'lucide-react';
import { SiDiscord } from '@icons-pack/react-simple-icons';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const MODES = [
  { icon: HeartHandshakeIcon, label: 'Join in' },
  { icon: DatabaseIcon, label: 'Fix data' },
  { icon: CodeIcon, label: 'Write code' },
  { icon: RocketIcon, label: 'Build your own' },
];

const Breadcrumb: FC = () => (
  <nav className='text-sm text-gray-500 mb-6'>
    <Link to='/' className='hover:text-primary-600'>
      Home
    </Link>
    <span className='mx-2'>/</span>
    <span className='text-gray-900'>Contribute</span>
  </nav>
);

/** 1 — Utility. Quietest option. Closest to /ideas and /projects. */
export const HeroUtility: FC = () => (
  <section className='bg-white border-b border-gray-200'>
    <div className='container mx-auto px-4 max-w-4xl py-10 md:py-14'>
      <Breadcrumb />
      <div className='flex items-start gap-4'>
        <div className='p-3 rounded-full bg-primary-50 text-primary-600 shrink-0'>
          <HeartHandshakeIcon className='h-7 w-7' />
        </div>
        <div>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
            Contribute to BetterGov.ph
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl'>
            BetterGov.ph is volunteer-led and open source. This page lists every
            current way in. Pick the first one that sounds like you.
          </p>
        </div>
      </div>

      <div className='flex flex-wrap gap-2 mt-8'>
        {MODES.map(mode => (
          <span
            key={mode.label}
            className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium'
          >
            <mode.icon className='h-4 w-4 text-primary-600' />
            {mode.label}
          </span>
        ))}
      </div>
    </div>
  </section>
);

/** 2 — Brand. Matches the front page's own hero, glass panel and all. */
export const HeroBrand: FC = () => (
  <section className='bg-linear-to-r from-primary-600 to-primary-700 text-white'>
    {/* max-w-4xl so the hero's left edge lines up with the list below it.
        The front page hero is full-container, but nothing sits under it. */}
    <div className='container mx-auto px-4 max-w-4xl py-12 md:py-20'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
        <div className='animate-fade-in'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight'>
            Contribute to BetterGov.ph
          </h1>
          <p className='text-lg text-blue-200 mb-6 max-w-lg'>
            Volunteer-led, open source, and always short of hands. Every current
            way in is on this page, ordered by how much it asks of you.
          </p>
          <div className='flex flex-wrap gap-2'>
            {MODES.map(mode => (
              <span
                key={mode.label}
                className='bg-white/10 text-white border border-white/20 py-2 px-4 rounded-xl text-sm'
              >
                {mode.label}
              </span>
            ))}
          </div>
        </div>

        <div className='bg-white/10 backdrop-blur-xs rounded-xl p-6 shadow-lg animate-slide-in'>
          <h2 className='text-2xl font-semibold mb-2'>
            Not sure where to fit?
          </h2>
          <p className='text-blue-100 mb-5'>
            Start in the Discord. It costs nothing, needs no technical skill,
            and everything else on this page starts there anyway.
          </p>
          <Link
            to='/discord'
            className='inline-flex items-center justify-center w-full px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-300 transition-all'
          >
            <SiDiscord className='h-5 w-5 mr-2' />
            Join the Discord
          </Link>
          <p className='text-blue-200 text-sm mt-4'>
            Already know what you want to do? The list below is ordered easiest
            first.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/** 3 — Editorial. Asks the page's literal question as the headline. */
export const HeroEditorial: FC = () => (
  <section className='bg-gray-900 text-white'>
    <div className='container mx-auto px-4 max-w-4xl py-16 md:py-24'>
      <h1 className='text-4xl md:text-6xl font-bold leading-[1.1] mb-6'>
        What is the best way to contribute{' '}
        <span className='text-yellow-300'>right now?</span>
      </h1>
      <p className='text-xl text-gray-300 max-w-2xl mb-8'>
        It depends on what you have. Five minutes, an evening, or an ongoing
        project of your own. All three are below, ordered by how much each one
        asks of you.
      </p>
      <div className='flex flex-col sm:flex-row gap-4'>
        <a
          href='#ways-to-help'
          className='inline-flex items-center justify-center px-7 py-3.5 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-300 transition-all'
        >
          See the list
          <ArrowRightIcon className='h-5 w-5 ml-2' />
        </a>
        <Link
          to='/join-us'
          className='inline-flex items-center justify-center px-7 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all'
        >
          New here? Start with what BetterGov is
        </Link>
      </div>
    </div>
  </section>
);
