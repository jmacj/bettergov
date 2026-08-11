/** PROTOTYPE — throwaway. Floating variant switcher. Never renders in a production build. */
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { FC, useEffect } from 'react';

export type VariantKey = 'A' | 'B' | 'C';
export type CopyKey = 'shared' | 'tuned';

interface Props {
  variants: readonly VariantKey[];
  current: VariantKey;
  name: string;
  copy: CopyKey;
  onChange: (next: VariantKey) => void;
  onToggleCopy: (next: CopyKey) => void;
}

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
  onChange,
  onToggleCopy,
}) => {
  const index = variants.indexOf(current);
  const step = (delta: number) =>
    onChange(variants[(index + delta + variants.length) % variants.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
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
