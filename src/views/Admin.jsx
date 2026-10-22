import { useState } from 'react';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

export default function Admin({ agregarProducto, eliminarProducto, editarProducto, productos }) {
  const [idEditando, setIdEditando] = useState(null);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [especie, setEspecie] = useState('Canino');
  const [preview, setPreview] = useState('');
  const [mensaje, setMensaje] = useState('');

  const regexSoloLetras = /^[a-zA-Za-eíóúÁÉÍÓÚñÑ\s]+$/;

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const cargarProductoParaEditar = (prod) => {
    setIdEditando(prod.id);
    setNombre(prod.nombre);
    setPrecio(prod.precio);
    setDescripcion(prod.descripcion);
    setEspecie(prod.especie || 'Canino');
    setPreview(prod.imagen);
    setMensaje('');
  };

  const cancelarEdicion = () => {
    setIdEditando(null);
    setNombre('');
    setPrecio('');
    setDescripcion('');
    setEspecie('Canino');
    setPreview('');
    setMensaje('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje('');

    if (!nombre.trim() || !precio || !descripcion.trim()) {
      setMensaje('Error: Complete todos los campos obligatorios.');
      return;
    }

    // Validar que el nombre del producto tenga texto válido (letras y espacios)
    if (!regexSoloLetras.test(nombre.trim())) {
      setMensaje('Error: El nombre del producto solo debe contener letras y espacios.');
      return;
    }

    if (idEditando) {
      editarProducto({
        id: idEditando,
        nombre: nombre.trim(),
        precio: parseFloat(precio),
        descripcion: descripcion.trim(),
        especie,
        imagen: preview || '/src/assets/img/producto1.avif'
      });
      setMensaje('¡Producto actualizado correctamente!');
    } else {
      agregarProducto({
        id: Date.now(),
        nombre: nombre.trim(),
        precio: parseFloat(precio),
        descripcion: descripcion.trim(),
        especie,
        imagen: preview || '/src/assets/img/producto1.avif'
      });
      setMensaje('¡Producto registrado con éxito en el catálogo!');
    }
    cancelarEdicion();
  };

  return (
    <main style={{ maxWidth: '850px', margin: '2rem auto' }}>
      <section className="form-container" style={{ maxWidth: '100%', marginBottom: '2rem' }}>
        <h2>{idEditando ? 'Panel de Control - Modificar Producto' : 'Panel de Control - Registro de Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <Input label="Nombre del Producto" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <Input label="Precio (CLP)" type="number" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          
          <div className="campo">
            <label htmlFor="especie">Especie Destino (Contexto Vet):</label>
            <select id="especie" value={especie} onChange={(e) => setEspecie(e.target.value)}>
              <option value="Canino">Canino (Perros)</option>
              <option value="Felino">Felino (Gatos)</option>
              <option value="Exóticos">Aves / Conejos / Exóticos</option>
              <option value="Uso General">Uso General Clínico</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="imagen">Imagen del Producto:</label>
            <input 
              type="file" 
              id="imagen" 
              accept="image/*" 
              onChange={handleImagenChange} 
            />
          </div>

          {preview && (
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Imagen actual / Vista previa:</p>
              <img src={preview} alt="Vista previa" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
            </div>
          )}

          <Input label="Descripción del Producto" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

          {mensaje && <p style={{ color: mensaje.includes('Error') ? '#ef4444' : '#10b981', margin: '1rem 0' }}>{mensaje}</p>}
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button type="submit">{idEditando ? 'Guardar Cambios' : 'Agregar al Catálogo'}</Button>
            {idEditando && (
              <button 
                type="button" 
                onClick={cancelarEdicion} 
                className="btn" 
                style={{ backgroundColor: '#64748b' }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Tabla de inventario */}
      <section className="tarjeta-panel">
        <h3 className="titulo-seccion">Gestión e Inventario de Productos</h3>
        <table className="tabla-adaptable">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Especie</th>
              <th style={{ textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>
                  <img src={prod.imagen} alt={prod.nombre} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                <td style={{ fontWeight: '600' }}>{prod.nombre}</td>
                <td>${prod.precio.toLocaleString()}</td>
                <td>{prod.especie}</td>
                <td style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button 
                      onClick={() => cargarProductoParaEditar(prod)} 
                      style={{ backgroundColor: '#0d828a', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => eliminarProducto(prod.id)} 
                      style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}