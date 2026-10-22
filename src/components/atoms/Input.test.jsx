import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from './Input';

describe('Pruebas en Componente Input', () => {
  it('Debe renderizar la etiqueta asociada y emitir cambios al escribir', () => {
    const handleChange = vi.fn();
    render(
      <Input 
        label="Correo Electrónico" 
        id="correo" 
        type="email" 
        value="" 
        onChange={handleChange} 
      />
    );

    const input = screen.getByLabelText(/correo electrónico/i);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'test@duocuc.cl' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});