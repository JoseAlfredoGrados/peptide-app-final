import React from 'react';
import type { PredictionResult } from '../types';

interface ResultsTableProps {
  results: PredictionResult[];
}

export function ResultsTable({ results }: ResultsTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HLA</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MHC</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Péptido</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Predicción</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((result, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" data-testid="result_hla">{result.hla}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" data-testid="result_mhc">{result.mhc}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" data-testid="result_peptide">{result.peptide}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" data-testid="result_prediction">{result.prediction}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" data-testid={"result_score_" + (index+1)}>{result.score.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}