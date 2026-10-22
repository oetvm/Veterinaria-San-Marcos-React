import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function DetalleProducto({ productos, agregarAlCarrito }) {
  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');

  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    return (
      <main style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <h2>Producto no encontrado</h2>
        <p style={{ margin: '1rem 0', color: 'var(--text-muted)' }}>El producto que buscas no existe o fue eliminado.</p>
        <Link to="/productos" className="btn">Volver al Catálogo</Link>
      </main>
    );
  }

  const handleAgregar = () => {
    agregarAlCarrito(producto, cantidad);
    setMensaje(`¡Agregaste ${cantidad} unidad(es) al carrito!`);
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <main>
      <section className="detalle-container">
        <div className="detalle-imagen-box">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="detalle-info">
          <h2>{producto.nombre}</h2>
          <p className="especie-tag">Categoría: {producto.especie || 'General'}</p>
          <p className="precio-detalle">${producto.precio.toLocaleString()} CLP</p>
          <p className="descripcion-detalle">{producto.descripcion}</p>

          <div className="acciones-compra">
            <label htmlFor="cantidad">Cantidad:</label>
            <input 
              type="number" 
              id="cantidad"
              min="1" 
              max="99" 
              value={cantidad} 
              onChange={(e) => setCantidad(parseInt(e.target.value) || 1)} 
            />
            <button onClick={handleAgregar} className="btn">
              Agregar al Carrito
            </button>
          </div>

          {mensaje && <p className="mensaje-exito">{mensaje}</p>}

          <div style={{ marginTop: '2rem' }}>
            <Link to="/productos" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>
              ← Volver al Catálogo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}