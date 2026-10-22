import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mascota, setMascota] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const dominiosPermitidos = ['@veterinaria.cl', '@gmail.com', '@duocuc.cl'];
  // Permite solo letras (incluye acentos, ñ/Ñ y espacios)
  const regexSoloLetras = /^[a-zA-Za-eíóúÁÉÍÓÚñÑ\s]+$/;

  const handleRegistro = (e) => {
    e.preventDefault();
    setError('');

    if (!nombre.trim() || !correo.trim() || !password) {
      setError('Por favor complete todos los campos obligatorios.');
      return;
    }

    // Validar que el nombre contenga solo letras
    if (!regexSoloLetras.test(nombre.trim())) {
      setError('El nombre completo solo debe contener letras y espacios, sin números ni símbolos.');
      return;
    }

    // Validar dominios permitidos
    const esDominioValido = dominiosPermitidos.some((dominio) =>
      correo.toLowerCase().endsWith(dominio)
    );

    if (!esDominioValido) {
      setError('El correo debe pertenecer a uno de los dominios permitidos (@veterinaria.cl, @gmail.com, @duocuc.cl).');
      return;
    }

    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios_registrados') || '[]');

    // Validar que no esté duplicado
    const existe = usuariosExistentes.some((u) => u.correo.toLowerCase() === correo.toLowerCase());
    if (existe || correo.toLowerCase() === 'admin@veterinaria.cl') {
      setError('Este correo electrónico ya se encuentra registrado.');
      return;
    }

    // Definir rol según el correo
    const esAdmin = correo.toLowerCase().includes('admin') || correo.toLowerCase().endsWith('@veterinaria.cl');

    const nuevoUsuario = {
      id: Date.now(),
      nombre: nombre.trim(),
      correo: correo.trim(),
      mascota: mascota.trim() || 'Sin mascota registrada',
      password,
      rol: esAdmin ? 'admin' : 'cliente'
    };

    usuariosExistentes.push(nuevoUsuario);
    localStorage.setItem('usuarios_registrados', JSON.stringify(usuariosExistentes));
    localStorage.setItem('usuario_sesion', JSON.stringify(nuevoUsuario));

    navigate(nuevoUsuario.rol === 'admin' ? '/admin' : '/perfil');
  };

  return (
    <main>
      <section className="form-container">
        <h2>Crear Cuenta</h2>
        
        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem', textAlign: 'center' }}>
          Dominios admitidos: <strong>@veterinaria.cl</strong>, <strong>@gmail.com</strong>, <strong>@duocuc.cl</strong>
        </p>

        <form onSubmit={handleRegistro}>
          <div className="campo">
            <label htmlFor="nombre">Nombre Completo:</label>
            <input 
              type="text" 
              id="nombre" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div className="campo">
            <label htmlFor="correo">Correo Electrónico:</label>
            <input 
              type="email" 
              id="correo" 
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)} 
              placeholder="ejemplo@duocuc.cl"
            />
          </div>

          <div className="campo">
            <label htmlFor="mascota">Nombre de tu Mascota (Opcional):</label>
            <input 
              type="text" 
              id="mascota" 
              value={mascota} 
              onChange={(e) => setMascota(e.target.value)} 
              placeholder="Ej: Cachupín"
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
            Registrarse
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
            Inicia sesión aquí
          </Link>
        </p>
      </section>
    </main>
  );
}