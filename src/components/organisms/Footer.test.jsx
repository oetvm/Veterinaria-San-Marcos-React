import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Pruebas en Componente Footer', () => {
  it('Debe renderizar los textos informativos y el copyright de la veterinaria', () => {
    render(<Footer />);

    expect(screen.getByText(/veterinaria san marcos/i)).toBeInTheDocument();
    expect(screen.getByText(/rancagua/i)).toBeInTheDocument();
  });
});