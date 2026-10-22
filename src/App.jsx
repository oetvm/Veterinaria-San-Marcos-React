import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';

import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';

import Home from './views/Home';
import Productos from './views/Productos';
import DetalleProducto from './views/DetalleProducto';
import Login from './views/Login';
import Registro from './views/Registro';
import Admin from './views/Admin';
import Carrito from './views/Carrito';
import Perfil from './views/Perfil';
import NotFound from './views/NotFound';

export default function App() {
  // Estado para el modo oscuro con persistencia en localStorage
  const [modoOscuro, setModoOscuro] = useState(() => {
    return localStorage.getItem('tema_oscuro') === 'true';
  });

  const toggleModoOscuro = () => {
    setModoOscuro(prev => {
      const nuevoEstado = !prev;
      localStorage.setItem('tema_oscuro', nuevoEstado);
      return nuevoEstado;
    });
  };

  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Alimento Super Premium Perro 15kg', descripcion: 'Nutrición balanceada para perros adultos.', precio: 45990, especie: 'Canino', imagen: '/src/assets/img/producto1.avif' },
    { id: 2, nombre: 'Alimento Especial Gato Esterilizado', descripcion: 'Fórmula control de peso para gatos adultos.', precio: 28500, especie: 'Felino', imagen: '/src/assets/img/producto2.png' },
    { id: 3, nombre: 'Pipeta Antiparasitaria Canino/Felino', descripcion: 'Protección contra pulgas y garrapatas por 30 días.', precio: 8990, especie: 'Uso General', imagen: '/src/assets/img/producto3.jpg' }
  ]);

  const [carrito, setCarrito] = useState([]);

  // CRUD Productos (Admin)
  const agregarProducto = (nuevo) => setProductos([nuevo, ...productos]);
  const eliminarProducto = (id) => setProductos(productos.filter(p => p.id !== id));
  const editarProducto = (productoEditado) => {
    setProductos(productos.map(p => (p.id === productoEditado.id ? productoEditado : p)));
  };

  // Funciones del Carrito
  const agregarAlCarrito = (producto, cantidad) => {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad }]);
    }
  };

  const actualizarCantidadCarrito = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    setCarrito(
      carrito.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  // Rutas Protegidas
  const RutaAdmin = ({ children }) => {
    const sesionGuardada = localStorage.getItem('usuario_sesion');
    const usuario = sesionGuardada ? JSON.parse(sesionGuardada) : null;
    if (!usuario) return <Navigate to="/login" replace />;
    if (usuario.rol !== 'admin') return <Navigate to="/perfil" replace />;
    return children;
  };

  const RutaAutenticada = ({ children }) => {
    const sesion = localStorage.getItem('usuario_sesion');
    return sesion ? children : <Navigate to="/login" replace />;
  };

  // Layout principal que contiene Header y Footer
  const MainLayout = () => (
    <>
      <Header modoOscuro={modoOscuro} toggleModoOscuro={toggleModoOscuro} />
      <Outlet />
      <Footer />
    </>
  );

  return (
    <div className={modoOscuro ? 'dark-theme' : ''} id="root">
      <BrowserRouter>
        <Routes>
          {/* Rutas normales con Header y Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos productos={productos} />} />
            <Route path="/productos/:id" element={<DetalleProducto productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route 
              path="/carrito" 
              element={
                <Carrito 
                  carrito={carrito} 
                  actualizarCantidadCarrito={actualizarCantidadCarrito}
                  eliminarDelCarrito={eliminarDelCarrito}
                  vaciarCarrito={vaciarCarrito} 
                />
              } 
            />
            <Route 
              path="/admin" 
              element={
                <RutaAdmin>
                  <Admin 
                    agregarProducto={agregarProducto} 
                    eliminarProducto={eliminarProducto} 
                    editarProducto={editarProducto}
                    productos={productos} 
                  />
                </RutaAdmin>
              } 
            />
            <Route path="/perfil" element={<RutaAutenticada><Perfil /></RutaAutenticada>} />
          </Route>

          {/* Ruta 404 fuera de MainLayout (pantalla totalmente en blanco sin Header/Footer) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}