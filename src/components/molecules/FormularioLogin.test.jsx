import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormularioLogin from './FormularioLogin';

describe('Pruebas en Componente FormularioLogin', () => {
  it('Debe renderizar los campos de correo, contraseña y el botón de submit', () => {
    render(
      <FormularioLogin 
        correo="" 
        setCorreo={() => {}} 
        password="" 
        setPassword={() => {}} 
        error="" 
        handleSubmit={() => {}} 
      />
    );

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it('Debe mostrar el mensaje de error cuando se le pasa por props', () => {
    const mensajeError = 'Credenciales incorrectas. Si no tienes cuenta, debes registrarte.';
    render(
      <FormularioLogin 
        correo="" 
        setCorreo={() => {}} 
        password="" 
        setPassword={() => {}} 
        error={mensajeError} 
        handleSubmit={() => {}} 
      />
    );

    expect(screen.getByText(mensajeError)).toBeInTheDocument();
  });

  it('Debe llamar a la función handleSubmit cuando se envía el formulario', () => {
    const handleSubmitMock = vi.fn((e) => e.preventDefault());
    render(
      <FormularioLogin 
        correo="admin@veterinaria.cl" 
        setCorreo={() => {}} 
        password="admin123" 
        setPassword={() => {}} 
        error="" 
        handleSubmit={handleSubmitMock} 
      />
    );

    const botonSubmit = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(botonSubmit);

    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });
});