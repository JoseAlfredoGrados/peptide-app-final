import React, { useState } from 'react';
import type { PredictionFormData } from '../types';

type PredictionFormProps = {
  onSubmit: (data: PredictionFormData) => void;
};

export const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PredictionFormData>({
    hla: '',
    peptide: '',
    mhc: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">HLA</label>
        <input
          type="text"
          name="hla"
          value={formData.hla}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Peptide</label>
        <input
          type="text"
          name="peptide"
          value={formData.peptide}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">MHC</label>
        <input
          type="text"
          name="mhc"
          value={formData.mhc}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Predecir
      </button>
    </form>
  );
};