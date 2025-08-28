import React, { useMemo } from 'react';
import { useRateCard } from '../context/RateCardContext';
import { THEMES } from '../constants';

interface RateCardPreviewProps {
  previewRef: React.RefObject<HTMLDivElement>;
}

export const RateCardPreview: React.FC<RateCardPreviewProps> = ({ previewRef }) => {
  const { state } = useRateCard();
  const { brandName, logoUrl, services, themeId } = state;

  const theme = useMemo(() => THEMES.find(t => t.id === themeId) || THEMES[0], [themeId]);
  const total = useMemo(() => services.reduce((acc, service) => acc + service.price, 0), [services]);

  return (
    <div ref={previewRef} className={`p-8 md:p-12 shadow-lg rounded-lg ${theme.colors.background} transition-colors duration-300`}>
      <div className={`p-8 md:p-10 ${theme.colors.cardBackground} rounded-md shadow-inner`}>
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className={`text-4xl font-bold ${theme.colors.primary}`}>{brandName}</h1>
            <p className={`mt-1 text-lg ${theme.colors.textSecondary}`}>Rate Card</p>
          </div>
          {logoUrl && <img src={logoUrl} alt="Brand Logo" className="h-16 w-auto object-contain mt-4 sm:mt-0" />}
        </header>

        {/* Services Table */}
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                <thead>
                  <tr>
                    <th scope="col" className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold ${theme.colors.text} sm:pl-0`}>Service</th>
                    <th scope="col" className={`px-3 py-3.5 text-right text-sm font-semibold ${theme.colors.text}`}>Price</th>
                  </tr>
                </thead>
                <tbody className={`divide-y divide-gray-200 dark:divide-gray-700`}>
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td className="py-4 pl-4 pr-3 text-sm sm:pl-0">
                        <div className={`font-medium ${theme.colors.text}`}>{service.name}</div>
                        {service.description && <div className={`mt-1 ${theme.colors.textSecondary}`}>{service.description}</div>}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm text-right ${theme.colors.textSecondary}`}>₹{service.price.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer with Total */}
        <footer className={`mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center`}>
            <div>
                <p className={`text-sm ${theme.colors.textSecondary}`}>Total</p>
                <p className={`text-3xl font-bold ${theme.colors.primary}`}>₹{total.toLocaleString('en-IN')}</p>
            </div>
        </footer>
      </div>
    </div>
  );
};
