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

/**
 * A single action. The card cannot be one big link, because rows with a second
 * channel would then need a link inside a link, which is invalid HTML and
 * rendered as a detached line floating between the cards.
 */
const Action: FC<{
  action: string;
  href: string;
  external: boolean;
  primary?: boolean;
}> = ({ action, href, external, primary = false }) => {
  const className = primary
    ? 'group inline-flex items-center gap-1.5 text-primary-600 font-semibold hover:gap-2.5 transition-all'
    : 'inline-flex items-center text-sm text-gray-500 hover:text-primary-600 underline underline-offset-2';

  const icon =
    primary &&
    (external ? (
      <ExternalLinkIcon className='h-4 w-4' />
    ) : (
      <ArrowRightIcon className='h-4 w-4' />
    ));

  return external ? (
    <a href={href} target='_blank' rel='noreferrer' className={className}>
      {action}
      {icon}
    </a>
  ) : (
    <Link to={href} className={className}>
      {action}
      {icon}
    </Link>
  );
};

const Row: FC<{ entry: EntryPoint }> = ({ entry }) => (
  <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-5 bg-white border border-gray-200 rounded-xl hover:border-primary-400 hover:shadow-sm transition-all'>
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
      {entry.note && <p className='text-sm text-gray-500 mt-1'>{entry.note}</p>}
    </div>

    <div className='shrink-0 flex flex-col sm:items-end gap-1'>
      <Action
        action={entry.action}
        href={entry.href}
        external={entry.external}
        primary
      />
      {entry.alt && (
        <Action
          action={entry.alt.action}
          href={entry.alt.href}
          external={entry.alt.external}
        />
      )}
    </div>
  </div>
);

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
