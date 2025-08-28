import React, { createContext, useReducer, useContext, Dispatch, ReactNode } from 'react';
import { RateCardState, Action } from '../types';
import { INITIAL_STATE } from '../constants';

const RateCardContext = createContext<{ state: RateCardState; dispatch: Dispatch<Action> } | undefined>(undefined);

const rateCardReducer = (state: RateCardState, action: Action): RateCardState => {
  switch (action.type) {
    case 'ADD_SERVICE':
      return { ...state, services: [...state.services, action.payload] };
    case 'UPDATE_SERVICE':
      return {
        ...state,
        services: state.services.map((service) =>
          service.id === action.payload.id ? action.payload : service
        ),
      };
    case 'DELETE_SERVICE':
      return {
        ...state,
        services: state.services.filter((service) => service.id !== action.payload),
      };
    case 'SET_BRAND_NAME':
      return { ...state, brandName: action.payload };
    case 'SET_LOGO':
      return { ...state, logoUrl: action.payload };
    case 'SET_THEME':
      return { ...state, themeId: action.payload };
    default:
      return state;
  }
};

export const RateCardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(rateCardReducer, INITIAL_STATE);

  return (
    <RateCardContext.Provider value={{ state, dispatch }}>
      {children}
    </RateCardContext.Provider>
  );
};

export const useRateCard = () => {
  const context = useContext(RateCardContext);
  if (context === undefined) {
    throw new Error('useRateCard must be used within a RateCardProvider');
  }
  return context;
};
