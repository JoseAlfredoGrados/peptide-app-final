import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { predictPMHC } from '../services/predictionService';

// Mock the prediction service
vi.mock('../services/predictionService');

describe('App', () => {
  it('renders the main title', () => {
    render(<App />);
    expect(screen.getByText('Predicción p-MHC')).toBeInTheDocument();
  });

  it('submits form and displays results', async () => {
    const mockResults = [
      {
        hla: 'HLA-A*01:01',
        mhc: 'YFAMYQENMAHTDANTLYIIYRDY',
        peptide: 'LFGRDL',
        prediction: 0,
        score: 0.013288
      }
    ];
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (predictPMHC as any).mockResolvedValue(mockResults);

    render(<App />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Péptido/i), {
      target: { value: 'LFGRDL' }
    });
    fireEvent.change(screen.getByLabelText(/HLA/i), {
      target: { value: 'HLA-A*01:01' }
    });
    fireEvent.change(screen.getByLabelText(/MHC/i), {
      target: { value: 'YFAMYQENMAHTDANTLYIIYRDY' }
    });

    // Submit the form
    fireEvent.click(screen.getByText('Predecir'));

    // Wait for results to be displayed
    await waitFor(() => {
      const peptideText = screen.getByTestId('result_peptide').textContent;
      const mhcText = screen.getByTestId('result_mhc').textContent;
      const result_prediction = screen.getByTestId('result_prediction').textContent;
      const hlaText = screen.getByTestId('result_hla').textContent;

      expect(peptideText).toBe('LFGRDL');
      expect(mhcText).toBe('YFAMYQENMAHTDANTLYIIYRDY');
      expect(result_prediction).toBe('0');
      expect(hlaText).toBe('HLA-A*01:01');
    });
  });
});
