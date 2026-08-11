/**
 * PROTOTYPE — throwaway. Three placements of the same entry-point index.
 *
 * The variants disagree about WHERE the answer lives, not what it says.
 * That is deliberate: content is held constant so the maintainer's pick is
 * interpretable. See entryPoints.ts.
 */
import { ArrowRightIcon, UsersIcon } from 'lucide-react';
import { SiDiscord } from '@icons-pack/react-simple-icons';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import JoinUs from '../../JoinUs';
import { ContributeRouter } from './ContributeRouter';
import { Intro } from './entryPoints';

export interface VariantProps {
  intro: Intro;
}

export const VARIANT_NAMES = {
  A: 'Appended to /join-us',
  B: '/join-us rebuilt around it',
  C: 'New /contribute page',
} as const;

/**
 * Variant A — /join-us kept exactly as it is, index appended at the bottom.
 *
 * The least invasive option, and the one the design record predicts is
 * weakest: the answer sits below the entire existing page, so the reader has
 * to get through the full pitch before finding out what to actually do.
 */
export const VariantA: FC<VariantProps> = ({ intro }) => (
  <>
    <JoinUs />
    <section className='py-16 md:py-20 bg-gray-50 border-t border-gray-200'>
      <ContributeRouter intro={intro} />
    </section>
  </>
);

/**
 * Variant B — /join-us hero trimmed to a compact band; the index becomes the
 * page's main body. The mission, "What We Provide" and "WE'RE DONE WAITING"
 * sections are dropped.
 */
export const VariantB: FC<VariantProps> = ({ intro }) => (
  <div className='min-h-screen bg-gray-50'>
    <section className='bg-linear-to-r from-primary-600 via-blue-700 to-purple-700 text-white'>
      <div className='container mx-auto px-4 py-10 md:py-12'>
        <div className='max-w-4xl mx-auto flex items-center gap-4'>
          <div className='p-3 bg-white/20 rounded-full backdrop-blur-sm shrink-0'>
            <UsersIcon className='h-7 w-7 text-white' />
          </div>
          <div>
            <h1 className='text-2xl md:text-3xl font-bold'>
              Join the #CivicTech Revolution
            </h1>
            <p className='text-blue-100 mt-1'>
              BetterGov.ph is volunteer-led and open source. Here is how to take
              part.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className='py-12 md:py-16'>
      <ContributeRouter intro={intro} />
    </section>

    <section className='pb-16'>
      <div className='container mx-auto px-4 max-w-4xl'>
        <div className='rounded-2xl bg-linear-to-r from-primary-600 to-blue-600 p-8 text-center'>
          <h2 className='text-2xl font-bold text-white mb-2'>
            Rather talk to a human first?
          </h2>
          <p className='text-blue-100 mb-6'>
            The Discord is where everything else starts.
          </p>
          <Link
            to='/discord'
            className='inline-flex items-center justify-center px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-300 transition-all'
          >
            <SiDiscord className='h-5 w-5 mr-2' />
            Join the Discord
          </Link>
        </div>
      </div>
    </section>
  </div>
);

/**
 * Variant C — a standalone /contribute page. /join-us keeps its recruitment
 * job untouched; this page does the routing job only.
 *
 * Two different jobs: /join-us turns a stranger into someone interested,
 * /contribute turns someone interested into a first contribution.
 */
export const VariantC: FC<VariantProps> = ({ intro }) => (
  <div className='min-h-screen bg-gray-50'>
    <section className='bg-white border-b border-gray-200'>
      <div className='container mx-auto px-4 max-w-4xl py-12 md:py-16'>
        <nav className='text-sm text-gray-500 mb-6'>
          <Link to='/' className='hover:text-primary-600'>
            Home
          </Link>
          <span className='mx-2'>/</span>
          <span className='text-gray-900'>Contribute</span>
        </nav>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight'>
          Contribute to BetterGov.ph
        </h1>
        <p className='text-xl text-gray-600 max-w-2xl'>
          Volunteer-led, open source, and always short of hands. Every current
          way in is on this page.
        </p>
        <Link
          to='/join-us'
          className='inline-flex items-center gap-1.5 mt-6 text-primary-600 font-semibold hover:gap-2.5 transition-all'
        >
          New here? Read what BetterGov is first
          <ArrowRightIcon className='h-4 w-4' />
        </Link>
      </div>
    </section>

    <section className='py-12 md:py-16'>
      <ContributeRouter intro={intro} />
    </section>
  </div>
);
