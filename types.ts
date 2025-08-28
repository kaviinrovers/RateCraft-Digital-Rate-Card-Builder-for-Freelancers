export interface Service {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    cardBackground: string;
    text: string;
    textSecondary: string;
    accent: string;
    accentText: string;
  };
}

export interface RateCardState {
  brandName: string;
  logoUrl: string | null;
  services: Service[];
  themeId: string;
}

export type Action =
  | { type: 'ADD_SERVICE'; payload: Service }
  | { type: 'UPDATE_SERVICE'; payload: Service }
  | { type: 'DELETE_SERVICE'; payload: string }
  | { type: 'SET_BRAND_NAME'; payload: string }
  | { type: 'SET_LOGO'; payload: string | null }
  | { type: 'SET_THEME'; payload: string };
