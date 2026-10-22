import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe('Pruebas en Componente Header', () => {
  it('Debe renderizar los enlaces principales de navegación y el botón de tema', () => {
    render(
      <BrowserRouter>
        <Header 
          esModoOscuro={false} 
          toggleTema={() => {}} 
          usuarioSesion={null} 
          cerrarSesion={() => {}} 
        />
      </BrowserRouter>
    );

    expect(screen.getByText(/veterinaria san marcos/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /inicio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /productos/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /oscuro/i })).toBeInTheDocument();
  });
});