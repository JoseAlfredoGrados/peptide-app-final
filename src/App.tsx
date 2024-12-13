import React, { useState } from 'react';
import { PredictionForm } from './components/PredictionForm';
import { ResultsTable } from './components/ResultsTable';
import { predictPMHC } from './services/predictionService';
import type { PredictionResult, PredictionFormData } from './types';
import { Dna } from 'lucide-react';

function App() {
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: PredictionFormData) => {
    setLoading(true);
    try {
      const predictions = await predictPMHC(data);
      setResults(predictions);
    } catch (error) {
      console.error('Error al obtener predicciones:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Dna className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Predicción p-MHC
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <PredictionForm onSubmit={handleSubmit} />
            </div>
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : results.length > 0 ? (
                <ResultsTable results={results} />
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
                  No hay resultados disponibles
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;