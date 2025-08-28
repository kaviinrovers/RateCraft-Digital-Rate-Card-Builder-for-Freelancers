import React, { useState, useRef } from 'react';
import { Service } from '../types';
import { ServiceForm } from './ServiceForm';
import { ServiceList } from './ServiceList';
import { CustomizationPanel } from './CustomizationPanel';
import { RateCardPreview } from './RateCardPreview';

// TypeScript declarations for global libraries from index.html
declare const html2canvas: any;
declare const jspdf: any;

export const BuilderPage: React.FC<{onBack: () => void}> = ({onBack}) => {
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleEdit = (service: Service) => {
    setServiceToEdit(service);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDoneEditing = () => {
    setServiceToEdit(null);
  }

  const handleExportPDF = () => {
    if (!previewRef.current) return;
    setIsExporting(true);

    html2canvas(previewRef.current, { scale: 2 }).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = jspdf;
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('rate-card.pdf');
      setIsExporting(false);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <button onClick={onBack} className="text-indigo-600 hover:text-indigo-800 mb-2">&larr; Back to Home</button>
          <h1 className="text-4xl font-bold text-gray-900">Rate Card Builder</h1>
          <p className="mt-2 text-lg text-gray-600">Create and customize your professional rate card below.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column: Controls */}
          <div className="lg:col-span-2 space-y-8">
            <CustomizationPanel />
            <ServiceForm serviceToEdit={serviceToEdit} onDone={handleDoneEditing} />
            <ServiceList onEdit={handleEdit} />
          </div>

          {/* Right Column: Preview and Actions */}
          <div className="lg:col-span-3">
             <div className="sticky top-8">
              <div className="flex justify-end gap-4 mb-4">
                <button 
                  onClick={handleExportPDF} 
                  disabled={isExporting} 
                  className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors"
                >
                  {isExporting ? 'Exporting...' : 'Export as PDF'}
                </button>
                <button 
                  disabled 
                  className="px-6 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
                  title="Coming Soon!"
                >
                  Generate Share Link
                </button>
              </div>
              <RateCardPreview previewRef={previewRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
