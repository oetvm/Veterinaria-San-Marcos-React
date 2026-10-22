import { Link } from 'react-router-dom';

// Importamos los archivos multimedia dinámicamente
import imagenInicio from '../assets/img/banner.png';
import videoPresentacion from '../assets/img/veterinaria.mp4';

export default function Home() {
  return (
    <main>
      {/* Sección de Presentación e Imagen Principal */}
      <section className="presentacion">
        <h2>Bienvenidos a Nuestra Clínica</h2>
        <p>
          Desde 2009 ofreciendo atención médica de calidad para perros, gatos, conejos y aves.
        </p>
        <img 
          src={imagenInicio} 
          alt="Veterinaria San Marcos - Cuidado Integral" 
        />
        <Link to="/productos" className="btn">
          Ver Catálogo de Productos
        </Link>
      </section>

      {/* Sección del Video Corporativo / Informativo */}
      <section className="video-seccion">
        <h3 className="titulo-seccion">Conoce Nuestras Instalaciones y Servicios</h3>
        <p className="leyenda-video">
          Te invitamos a ver cómo cuidamos a tus mascotas en la Clínica Veterinaria San Marcos.
        </p>
        <div className="video-contenedor">
          <video controls poster={imagenInicio}>
            <source src={videoPresentacion} type="video/mp4" />
            Tu navegador no soporta la reproducción de video HTML5.
          </video>
        </div>
      </section>
    </main>
  );
}