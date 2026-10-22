import { Link } from 'react-router-dom';

export default function TarjetaProducto({ producto }) {
  return (
    <article className="tarjeta-producto">
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p className="precio">${producto.precio.toLocaleString()} CLP</p>
      <Link to={`/productos/${producto.id}`} className="btn">Ver Detalle</Link>
    </article>
  );
}