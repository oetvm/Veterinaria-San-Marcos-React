import Input from '../atoms/Input';
import Button from '../atoms/Button';

export default function FormularioProducto({
  idEditando,
  nombre, setNombre,
  precio, setPrecio,
  especie, setEspecie,
  descripcion, setDescripcion,
  handleImagenChange,
  preview,
  mensaje,
  handleSubmit,
  cancelarEdicion
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Input label="Nombre del Producto" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <Input label="Precio (CLP)" type="number" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
      
      <div className="campo">
        <label htmlFor="especie">Especie Destino:</label>
        <select id="especie" value={especie} onChange={(e) => setEspecie(e.target.value)}>
          <option value="Canino">Canino (Perros)</option>
          <option value="Felino">Felino (Gatos)</option>
          <option value="Exóticos">Aves / Conejos / Exóticos</option>
          <option value="Uso General">Uso General Clínico</option>
        </select>
      </div>

      <div className="campo">
        <label htmlFor="imagen">Imagen del Producto:</label>
        <input type="file" id="imagen" accept="image/*" onChange={handleImagenChange} />
      </div>

      {preview && (
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <img src={preview} alt="Vista previa" style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px' }} />
        </div>
      )}

      <Input label="Descripción del Producto" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

      {mensaje && <p style={{ color: mensaje.includes('Error') ? '#ef4444' : '#10b981', margin: '1rem 0' }}>{mensaje}</p>}
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button type="submit">{idEditando ? 'Guardar Cambios' : 'Agregar al Catálogo'}</Button>
        {idEditando && (
          <button type="button" onClick={cancelarEdicion} className="btn" style={{ backgroundColor: '#64748b' }}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}