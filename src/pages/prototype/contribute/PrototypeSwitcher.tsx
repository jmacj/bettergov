/** PROTOTYPE — throwaway. Floating variant switcher. Never renders in a production build. */
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { FC, useEffect } from 'react';

import { HeroKey } from './heroMeta';

export type VariantKey = 'A' | 'B' | 'C';
export type CopyKey = 'shared' | 'tuned';

interface Props {
  variants: readonly VariantKey[];
  current: VariantKey;
  name: string;
  copy: CopyKey;
  /** null when the current variant has no hero axis. */
  hero: HeroKey | null;
  heroName: string;
  onChange: (next: VariantKey) => void;
  onToggleCopy: (next: CopyKey) => void;
  onHeroChange: (next: HeroKey) => void;
}

const HEROES: readonly HeroKey[] = ['1', '2', '3'];

const isTypingTarget = (el: EventTarget | null) => {
  if (!(el instanceof HTMLElement)) return false;
  return (
    el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable
  );
};

export const PrototypeSwitcher: FC<Props> = ({
  variants,
  current,
  name,
  copy,
  hero,
  heroName,
  onChange,
  onToggleCopy,
  onHeroChange,
}) => {
  const index = variants.indexOf(current);
  const step = (delta: number) =>
    onChange(variants[(index + delta + variants.length) % variants.length]);

  const heroIndex = hero ? HEROES.indexOf(hero) : 0;
  const stepHero = (delta: number) =>
    onHeroChange(HEROES[(heroIndex + delta + HEROES.length) % HEROES.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      // Left/right cycles variants; with shift held it cycles the hero, so the
      // hero comparison can be driven without reaching for the mouse.
      if (e.key === 'ArrowLeft') (e.shiftKey ? stepHero : step)(-1);
      if (e.key === 'ArrowRight') (e.shiftKey ? stepHero : step)(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // A stray merge of this prototype must never show the bar to real users.
  if (import.meta.env.PROD) return null;

  return (
    <div
      data-prototype-bar
      className='fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-full bg-gray-900 text-white shadow-2xl ring-1 ring-white/20 px-2 py-1.5'
    >
      <button
        type='button'
        onClick={() => step(-1)}
        aria-label='Previous variant'
        className='p-2 rounded-full hover:bg-white/15'
      >
        <ChevronLeftIcon className='h-4 w-4' />
      </button>

      <span className='px-3 text-sm font-medium whitespace-nowrap tabular-nums'>
        {current} — {name}
      </span>

      <button
        type='button'
        onClick={() => step(1)}
        aria-label='Next variant'
        className='p-2 rounded-full hover:bg-white/15'
      >
        <ChevronRightIcon className='h-4 w-4' />
      </button>

      {hero && (
        <>
          <span className='mx-1 h-5 w-px bg-white/25' />
          <button
            type='button'
            onClick={() => stepHero(-1)}
            aria-label='Previous hero'
            className='p-2 rounded-full hover:bg-white/15'
          >
            <ChevronLeftIcon className='h-4 w-4' />
          </button>
          <span className='px-2 text-sm font-medium whitespace-nowrap'>
            hero {hero}: {heroName}
          </span>
          <button
            type='button'
            onClick={() => stepHero(1)}
            aria-label='Next hero'
            className='p-2 rounded-full hover:bg-white/15'
          >
            <ChevronRightIcon className='h-4 w-4' />
          </button>
        </>
      )}

      <span className='mx-1 h-5 w-px bg-white/25' />

      <button
        type='button'
        onClick={() => onToggleCopy(copy === 'shared' ? 'tuned' : 'shared')}
        className='px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 whitespace-nowrap'
        title='Copy treatment — shared copy is what gets sent; tuned is held for round two'
      >
        copy: {copy}
      </button>
    </div>
  );
};
