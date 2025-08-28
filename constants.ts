import { Theme, RateCardState } from './types';

export const THEMES: Theme[] = [
  {
    id: 'light-indigo',
    name: 'Light Indigo',
    colors: {
      primary: 'text-indigo-600',
      secondary: 'text-gray-700',
      background: 'bg-gray-50',
      cardBackground: 'bg-white',
      text: 'text-gray-900',
      textSecondary: 'text-gray-500',
      accent: 'bg-indigo-600',
      accentText: 'text-white',
    },
  },
  {
    id: 'dark-slate',
    name: 'Dark Slate',
    colors: {
      primary: 'text-slate-100',
      secondary: 'text-slate-400',
      background: 'bg-slate-900',
      cardBackground: 'bg-slate-800',
      text: 'text-slate-100',
      textSecondary: 'text-slate-400',
      accent: 'bg-slate-600',
      accentText: 'text-white',
    },
  },
  {
    id: 'pastel-teal',
    name: 'Pastel Teal',
    colors: {
      primary: 'text-teal-700',
      secondary: 'text-gray-600',
      background: 'bg-teal-50',
      cardBackground: 'bg-white',
      text: 'text-gray-800',
      textSecondary: 'text-gray-500',
      accent: 'bg-teal-500',
      accentText: 'text-white',
    },
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    colors: {
      primary: 'text-rose-900',
      secondary: 'text-stone-600',
      background: 'bg-rose-50',
      cardBackground: 'bg-white',
      text: 'text-stone-800',
      textSecondary: 'text-stone-500',
      accent: 'bg-rose-500',
      accentText: 'text-white',
    },
  },
];

export const INITIAL_STATE: RateCardState = {
  brandName: 'Your Brand Name',
  logoUrl: null,
  services: [
    { id: '1', name: 'Web Design', price: 50000, description: 'Responsive website design with modern UI/UX.' },
    { id: '2', name: 'Frontend Development', price: 75000, description: 'Building the client-side of your application.' },
    { id: '3', name: 'API Integration', price: 30000 },
  ],
  themeId: 'light-indigo',
};
