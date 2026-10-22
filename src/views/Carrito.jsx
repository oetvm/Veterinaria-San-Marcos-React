import { Link } from 'react-router-dom';

export default function Carrito({ carrito, actualizarCantidadCarrito, eliminarDelCarrito, vaciarCarrito }) {
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <main>
      <section className="tarjeta-panel">
        <h2 className="titulo-seccion">Resumen de Carrito de Compras</h2>
        
        {carrito.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              El carrito de compras está actualmente vacío.
            </p>
            <Link to="/productos" className="btn">
              Ir al Catálogo de Productos
            </Link>
          </div>
        ) : (
          <>
            <table className="tabla-adaptable">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio Unitario</th>
                  <th style={{ textAlign: 'center' }}>Cantidad</th>
                  <th style={{ textAlign: 'right' }}>Subtotal</th>
                  <th style={{ textAlign: 'center' }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: '600' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={item.imagen} alt={item.nombre} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        <span>{item.nombre}</span>
                      </div>
                    </td>
                    <td>${item.precio.toLocaleString()} CLP</td>
                    <td style={{ textAlign: 'center' }}>
                      <input 
                        type="number" 
                        min="1" 
                        max="99"
                        value={item.cantidad} 
                        onChange={(e) => actualizarCantidadCarrito(item.id, parseInt(e.target.value) || 1)}
                        style={{ width: '55px', padding: '0.3rem', textAlign: 'center', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                      />
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                      ${(item.precio * item.cantidad).toLocaleString()} CLP
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        onClick={() => eliminarDelCarrito(item.id)}
                        style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                      >
                        Quitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <button 
                onClick={vaciarCarrito} 
                className="btn" 
                style={{ backgroundColor: '#64748b' }}
              >
                Vaciar Carrito
              </button>

              <div style={{ textAlign: 'right' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)' }} className="texto-destacado">
                  Total a Pagar: ${total.toLocaleString()} CLP
                </h3>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}