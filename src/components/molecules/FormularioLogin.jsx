export default function FormularioLogin({ correo, setCorreo, password, setPassword, error, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="campo">
        <label htmlFor="correo">Correo Electrónico:</label>
        <input 
          type="email" 
          id="correo" 
          value={correo} 
          onChange={(e) => setCorreo(e.target.value)} 
          placeholder="correo@ejemplo.com"
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
  );
}