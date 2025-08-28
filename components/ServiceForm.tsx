import React, { useState, useEffect } from 'react';
import { Service } from '../types';
import { useRateCard } from '../context/RateCardContext';
import { PlusIcon } from './icons/PlusIcon';

interface ServiceFormProps {
  serviceToEdit: Service | null;
  onDone: () => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({ serviceToEdit, onDone }) => {
  const { dispatch } = useRateCard();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (serviceToEdit) {
      setName(serviceToEdit.name);
      setPrice(serviceToEdit.price.toString());
      setDescription(serviceToEdit.description || '');
    } else {
      setName('');
      setPrice('');
      setDescription('');
    }
  }, [serviceToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const newService: Service = {
      id: serviceToEdit ? serviceToEdit.id : new Date().toISOString(),
      name,
      price: parseFloat(price),
      description,
    };

    if (serviceToEdit) {
      dispatch({ type: 'UPDATE_SERVICE', payload: newService });
    } else {
      dispatch({ type: 'ADD_SERVICE', payload: newService });
    }
    onDone();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{serviceToEdit ? 'Edit Service' : 'Add a Service'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Service Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., Logo Design" required />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., 10000" required />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Describe the service in a few words..."></textarea>
        </div>
        <div className="flex justify-end space-x-3">
            {serviceToEdit && <button type="button" onClick={onDone} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>}
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <PlusIcon className="w-5 h-5 mr-2 -ml-1" />
                {serviceToEdit ? 'Update Service' : 'Add Service'}
            </button>
        </div>
      </form>
    </div>
  );
};
