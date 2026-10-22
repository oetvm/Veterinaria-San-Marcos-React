import TarjetaProducto from '../components/molecules/TarjetaProducto';

export default function Productos({ productos }) {
  return (
    <main>
      <h2>Catálogo de Productos y Medicamentos</h2>
      <div className="catalogo-grid">
        {productos.map(p => (
          <TarjetaProducto key={p.id} producto={p} />
        ))}
      </div>
    </main>
  );
}