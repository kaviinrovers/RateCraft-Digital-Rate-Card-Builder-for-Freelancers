import React from 'react';
import { useRateCard } from '../context/RateCardContext';
import { THEMES } from '../constants';

export const CustomizationPanel: React.FC = () => {
  const { state, dispatch } = useRateCard();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        dispatch({ type: 'SET_LOGO', payload: event.target?.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Customize Your Rate Card</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">Brand Name</label>
          <input type="text" id="brandName" value={state.brandName} onChange={(e) => dispatch({ type: 'SET_BRAND_NAME', payload: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Brand Logo</label>
          <div className="mt-1 flex items-center space-x-4">
            {state.logoUrl && <img src={state.logoUrl} alt="Brand Logo" className="h-12 w-12 object-contain rounded-md bg-gray-100 p-1" />}
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Theme</label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3">
            {THEMES.map(theme => (
              <button key={theme.id} onClick={() => dispatch({ type: 'SET_THEME', payload: theme.id })} className={`p-3 rounded-lg border-2 ${state.themeId === theme.id ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-200'}`}>
                <div className={`w-full h-8 rounded ${theme.colors.accent}`}></div>
                <span className="text-sm mt-2 block text-center text-gray-600">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
