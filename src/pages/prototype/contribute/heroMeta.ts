/**
 * PROTOTYPE — throwaway. Hero registry, split out of heroes.tsx so that file
 * exports components only (react-refresh/only-export-components).
 */
import { FC } from 'react';
import { HeroBrand, HeroEditorial, HeroUtility } from './heroes';

export type HeroKey = '1' | '2' | '3';

export const HERO_NAMES: Record<HeroKey, string> = {
  '1': 'Utility (Ideas lineage)',
  '2': 'Brand (Home lineage)',
  '3': 'Editorial (JoinUs lineage)',
};

export const HEROES: Record<HeroKey, FC> = {
  '1': HeroUtility,
  '2': HeroBrand,
  '3': HeroEditorial,
};
