import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormularioProducto from './FormularioProducto';

describe('Pruebas en Componente FormularioProducto', () => {
  it('Debe renderizar los inputs de producto y la selección de especie veterinaria', () => {
    render(
      <FormularioProducto 
        idEditando={null}
        nombre="" setNombre={() => {}}
        precio="" setPrecio={() => {}}
        especie="Canino" setEspecie={() => {}}
        descripcion="" setDescripcion={() => {}}
        handleImagenChange={() => {}}
        preview=""
        mensaje=""
        handleSubmit={() => {}}
        cancelarEdicion={() => {}}
      />
    );

    expect(screen.getByLabelText(/nombre del producto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/precio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/especie destino/i)).toBeInTheDocument();
  });

  it('Debe mostrar el botón de Cancelar únicamente cuando se está editando un producto', () => {
    const { rerender } = render(
      <FormularioProducto 
        idEditando={null}
        nombre="" setNombre={() => {}}
        precio="" setPrecio={() => {}}
        especie="Canino" setEspecie={() => {}}
        descripcion="" setDescripcion={() => {}}
        handleImagenChange={() => {}}
        preview=""
        mensaje=""
        handleSubmit={() => {}}
        cancelarEdicion={() => {}}
      />
    );

    // En modo creación no debe estar
    expect(screen.queryByText(/cancelar/i)).not.toBeInTheDocument();

    // En modo edición (con ID) debe aparecer
    rerender(
      <FormularioProducto 
        idEditando={123}
        nombre="Alimento Perro 15kg" setNombre={() => {}}
        precio="45990" setPrecio={() => {}}
        especie="Canino" setEspecie={() => {}}
        descripcion="Alimento super premium" setDescripcion={() => {}}
        handleImagenChange={() => {}}
        preview=""
        mensaje=""
        handleSubmit={() => {}}
        cancelarEdicion={() => {}}
      />
    );

    expect(screen.getByText(/cancelar/i)).toBeInTheDocument();
  });
});