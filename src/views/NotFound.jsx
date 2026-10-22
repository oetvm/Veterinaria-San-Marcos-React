import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 99999,
      textAlign: 'center',
      padding: '1rem'
    }}>
      <h2 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '1rem' }}>
        404 - Página No Encontrada
      </h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
        La ruta especificada no existe.
      </p>
      <Link to="/" className="btn">
        Volver al Inicio
      </Link>
    </div>
  );
}