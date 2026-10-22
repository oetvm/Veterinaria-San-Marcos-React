import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Pruebas en Componente Button', () => {
  it('Debe renderizar correctamente el texto recibido como hijo', () => {
    render(<Button>Guardar Producto</Button>);
    expect(screen.getByText('Guardar Producto')).toBeInTheDocument();
  });

  it('Debe ejecutar la función onClick cuando el usuario hace clic', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Hacer Clic</Button>);
    
    const boton = screen.getByText('Hacer Clic');
    fireEvent.click(boton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});