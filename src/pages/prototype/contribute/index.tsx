/**
 * PROTOTYPE — throwaway route: /prototype/contribute
 *
 * Three variants of the "how do I contribute" page, switchable via
 * `?variant=A|B|C`, with a second `?copy=shared|tuned` axis.
 *
 * Send set: A, B, C on shared copy (3 screenshots). Tuned copy is built but
 * held back — one variable at a time, or the maintainer's pick tells us
 * nothing about placement.
 */
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { CopyKey, PrototypeSwitcher, VariantKey } from './PrototypeSwitcher';
import { SHARED_INTRO, TUNED_INTRO } from './entryPoints';
import { VARIANT_NAMES, VariantA, VariantB, VariantC } from './variants';

const VARIANTS = ['A', 'B', 'C'] as const;

const isVariant = (v: string | null): v is VariantKey =>
  v === 'A' || v === 'B' || v === 'C';

const ContributePrototype: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const raw = searchParams.get('variant');
  const variant: VariantKey = isVariant(raw) ? raw : 'A';
  const copy: CopyKey =
    searchParams.get('copy') === 'tuned' ? 'tuned' : 'shared';

  const intro = copy === 'tuned' ? TUNED_INTRO[variant] : SHARED_INTRO;

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>PROTOTYPE — Contribute | BetterGov.ph</title>
        <meta name='robots' content='noindex' />
      </Helmet>

      {variant === 'A' && <VariantA intro={intro} />}
      {variant === 'B' && <VariantB intro={intro} />}
      {variant === 'C' && <VariantC intro={intro} />}

      <PrototypeSwitcher
        variants={VARIANTS}
        current={variant}
        name={VARIANT_NAMES[variant]}
        copy={copy}
        onChange={next => setParam('variant', next)}
        onToggleCopy={next => setParam('copy', next)}
      />
    </>
  );
};

export default ContributePrototype;
