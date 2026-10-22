# Plan de Pruebas Unitarias

**Nombre del Estudiante:** Diego  
<br />

**Componente / Módulo Principal:** Atoms (Button, Input), Molecules (FormularioLogin, FormularioProducto), Organisms (Header, Footer).  
<br />

**Fecha:** 21-10-2026

| ID | Componente<br />*(describe)* | Caso de Prueba<br />*(it / test)* | Preparación<br />*(Arrange: props, mocks)* | Acción<br />*(Act: fireEvent, render)* | Resultado Esperado<br />*(Assert: expect)* | Estado<br />*(Pasa / Falla)* |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | Átomo (Button) | Renderiza texto de botón | Prop `children="Guardar Producto"` | `render(<Button>Guardar Producto</Button>)` | El botón contiene el texto exacto | Pasa |
| **02** | Átomo (Button) | Evento de clic en botón | Mock handler `vi.fn()` en `onClick` | `fireEvent.click(boton)` | Llama a la función handler 1 vez | Pasa |
| **03** | Átomo (Input) | Emite cambios al escribir | Prop `label="Correo Electrónico"` y handler `onChange` | `fireEvent.change` con `'test@duocuc.cl'` | El handler `onChange` es ejecutado | Pasa |
| **04** | Molécula (FormularioLogin) | Renderiza campos y botón submit | Props de estado inicial y handlers vacíos | `render(<FormularioLogin />)` | Muestra inputs de correo, clave y botón submit | Pasa |
| **05** | Molécula (FormularioLogin) | Muestra mensaje de error | Prop `error="Credenciales incorrectas..."` | `render(<FormularioLogin error={...} />)` | Renderiza el texto de error en pantalla | Pasa |
| **06** | Molécula (FormularioLogin) | Envía formulario con éxito | Mock `vi.fn()` para `handleSubmit` | `fireEvent.click` en botón submit | Ejecuta la función `handleSubmit` 1 vez | Pasa |
| **07** | Molécula (FormularioProducto) | Renderiza campos e input de especie | Props iniciales con `idEditando={null}` | `render(<FormularioProducto />)` | Despliega campos de nombre, precio y especie vet | Pasa |
| **08** | Molécula (FormularioProducto) | Botón cancelar según modo edición | Render inicial con `idEditando={null}` vs `idEditando={123}` | `rerender(<FormularioProducto idEditando={123} />)` | Muestra el botón 'Cancelar' solo al editar | Pasa |
| **09** | Organismo (Header) | Enlaces principales y botón de tema | `BrowserRouter`, props de tema y sesión vacía | `render(<Header />)` | Muestra marca, links de nav y botón 'Oscuro' | Pasa |
| **10** | Organismo (Footer) | Textos de copyright y comuna | Ninguna (componente sin props obligatorias) | `render(<Footer />)` | Despliega 'Veterinaria San Marcos' y 'Rancagua' | Pasa |