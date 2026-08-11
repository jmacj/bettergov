/** PROTOTYPE — throwaway. The entry-point index, shared by all three variants. */
import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ENTRY_POINTS, EntryPoint, Intro } from './entryPoints';

const COMMITMENT_LABEL: Record<number, string> = {
  1: 'Minutes',
  2: 'Minutes',
  3: 'An hour',
  4: 'An evening',
  5: 'Ongoing',
};

const Row: FC<{ entry: EntryPoint }> = ({ entry }) => {
  const inner = (
    <>
      <div className='flex-1'>
        <div className='flex items-center gap-2 mb-1'>
          <span className='text-xs font-semibold uppercase tracking-wide text-primary-600'>
            {entry.modeLabel}
          </span>
          <span className='text-xs text-gray-400'>
            · {COMMITMENT_LABEL[entry.commitment]}
          </span>
        </div>
        <p className='text-gray-900 font-medium leading-snug'>{entry.who}</p>
        {entry.note && (
          <p className='text-sm text-gray-500 mt-1'>{entry.note}</p>
        )}
      </div>
      <div className='shrink-0 inline-flex items-center gap-1.5 text-primary-600 font-semibold group-hover:gap-2.5 transition-all'>
        {entry.action}
        {entry.external ? (
          <ExternalLinkIcon className='h-4 w-4' />
        ) : (
          <ArrowRightIcon className='h-4 w-4' />
        )}
      </div>
    </>
  );

  const className =
    'group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-5 bg-white border border-gray-200 rounded-xl hover:border-primary-400 hover:shadow-sm transition-all';

  return entry.external ? (
    <a href={entry.href} target='_blank' rel='noreferrer' className={className}>
      {inner}
    </a>
  ) : (
    <Link to={entry.href} className={className}>
      {inner}
    </Link>
  );
};

export const ContributeRouter: FC<{ intro: Intro }> = ({ intro }) => (
  <div className='container mx-auto px-4 max-w-4xl'>
    <div className='mb-8'>
      <p className='text-sm font-bold uppercase tracking-wider text-primary-600 mb-2'>
        {intro.eyebrow}
      </p>
      <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
        {intro.heading}
      </h2>
      <p className='text-lg text-gray-600 max-w-2xl'>{intro.standfirst}</p>
    </div>

    <div className='flex flex-col gap-3'>
      {ENTRY_POINTS.map(entry => (
        <Row key={entry.id} entry={entry} />
      ))}
    </div>

    <p className='text-sm text-gray-500 mt-8'>
      Not sure which one fits? Ask in the{' '}
      <Link to='/discord' className='text-primary-600 underline'>
        Discord
      </Link>
      .
    </p>
  </div>
);
