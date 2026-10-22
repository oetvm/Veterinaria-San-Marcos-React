import TarjetaProducto from './molecules/TarjetaProducto';

export default function GaleriaProductos({ productos }) {
  return (
    <div className="catalogo-grid">
      {productos.map((producto) => (
        <TarjetaProducto key={producto.id} producto={producto} />
      ))}
    </div>
  );
}