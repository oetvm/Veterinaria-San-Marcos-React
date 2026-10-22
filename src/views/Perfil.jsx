export default function Perfil() {
  const sesion = JSON.parse(localStorage.getItem('usuario_sesion') || '{}');

  return (
    <main>
      <section className="tarjeta-perfil">
        <h2>Mi Perfil de Usuario</h2>
        <div className="perfil-info">
          <p><strong>Nombre:</strong> {sesion.nombre || 'Usuario Registrado'}</p>
          <p><strong>Correo Electrónico:</strong> {sesion.correo || 'No especificado'}</p>
          <p><strong>Mascota Registrada:</strong> {sesion.mascota || 'Sin mascota registrada'}</p>
          <p>
            <strong>Rol de Cuenta:</strong>{' '}
            <span className={`badge-rol ${sesion.rol === 'admin' ? 'admin' : 'cliente'}`}>
              {sesion.rol || 'Cliente'}
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}