import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const dominiosPermitidos = ['@veterinaria.cl', '@gmail.com', '@duocuc.cl'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!correo || !password) {
      setError('Por favor complete todos los campos.');
      return;
    }

    // Validar dominio del correo
    const esDominioValido = dominiosPermitidos.some((dominio) =>
      correo.toLowerCase().endsWith(dominio)
    );

    if (!esDominioValido) {
      setError('El correo debe pertenecer a uno de los dominios permitidos (@veterinaria.cl, @gmail.com, @duocuc.cl).');
      return;
    }

    // 1. Obtener usuarios registrados localmente
    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios_registrados') || '[]');

    // 2. Verificar contra usuario administrador por defecto o usuarios guardados
    let usuarioEncontrado = null;

    if (correo.toLowerCase() === 'admin@veterinaria.cl' && password === 'admin123') {
      usuarioEncontrado = {
        id: 1,
        nombre: 'Administrador San Marcos',
        correo: 'admin@veterinaria.cl',
        rol: 'admin',
        mascota: 'Mascota Clínica'
      };
    } else {
      usuarioEncontrado = usuariosExistentes.find(
        (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.password === password
      );
    }

    if (!usuarioEncontrado) {
      setError('Credenciales incorrectas. Si no tienes cuenta, debes registrarte.');
      return;
    }

    // Guardar sesión activa y redirigir según el rol
    localStorage.setItem('usuario_sesion', JSON.stringify(usuarioEncontrado));
    
    if (usuarioEncontrado.rol === 'admin') {
      navigate('/admin');
    } else {
      navigate('/perfil');
    }
  };

  return (
    <main>
      <section className="form-container">
        <h2>Iniciar Sesión</h2>
        
        {/* Bloque de credenciales para pruebas con contraste adaptado */}
        <div style={{
          backgroundColor: '#e6f4f1',
          borderLeft: '4px solid #0d828a',
          padding: '0.8rem 1rem',
          borderRadius: '6px',
          marginBottom: '1.5rem',
          fontSize: '0.875rem',
          color: '#1e293b' // Forzamos texto oscuro visible en modo claro y oscuro
          }}>
          <strong style={{ color: '#0f4c5c', display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem' }}>
            Credenciales de Prueba (Admin):
          </strong>
          <span><strong style={{ color: '#334155' }}>Correo:</strong> admin@veterinaria.cl</span><br />
          <span><strong style={{ color: '#334155' }}>Contraseña:</strong> admin123</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="correo">Correo Electrónico:</label>
            <input 
              type="email" 
              id="correo" 
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)} 
              placeholder="correo@veterinaria.cl"
            />
          </div>

          <div className="campo">
            <label htmlFor="password">Contraseña:</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>
            Iniciar Sesión
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          ¿No tienes una cuenta?{' '}
          <Link to="/registro" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
            Regístrate aquí
          </Link>
        </p>
      </section>
    </main>
  );
}