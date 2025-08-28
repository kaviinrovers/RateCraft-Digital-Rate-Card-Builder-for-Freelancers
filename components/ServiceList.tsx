import React from 'react';
import { Service } from '../types';
import { useRateCard } from '../context/RateCardContext';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';

interface ServiceListProps {
  onEdit: (service: Service) => void;
}

export const ServiceList: React.FC<ServiceListProps> = ({ onEdit }) => {
  const { state, dispatch } = useRateCard();
  const { services } = state;

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      dispatch({ type: 'DELETE_SERVICE', payload: id });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
       <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Services</h2>
      <div className="space-y-4">
        {services.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No services added yet. Add one using the form above!</p>
        ) : (
          services.map((service) => (
            <div key={service.id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center transition-shadow hover:shadow-sm">
              <div>
                <h3 className="font-semibold text-gray-800">{service.name}</h3>
                <p className="text-indigo-600 font-medium">₹{service.price.toLocaleString('en-IN')}</p>
                {service.description && <p className="text-sm text-gray-500 mt-1">{service.description}</p>}
              </div>
              <div className="flex space-x-2">
                <button onClick={() => onEdit(service)} className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors">
                  <EditIcon className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(service.id)} className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-100 transition-colors">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
