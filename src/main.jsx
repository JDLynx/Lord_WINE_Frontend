// Importa StrictMode para detectar errores y advertencias en desarrollo
import { StrictMode } from 'react'

// Importa createRoot para renderizar la app con el nuevo API de React 18+
import { createRoot } from 'react-dom/client'

// Importa BrowserRouter para manejar rutas desde React Router DOM
import { BrowserRouter } from "react-router-dom";

// Importa los estilos globales definidos en index.css
import './index.css'

// Importa el componente principal de la aplicación
import App from './App.jsx'

// Mensaje en consola para verificar que este archivo se ejecuta correctamente
console.log("El archivo main.jsx se está ejecutando correctamente");

// Renderiza la aplicación React dentro del div con id="root" del HTML
createRoot(document.getElementById("root")).render(
  <StrictMode>            {/* Habilita comprobaciones estrictas de React en desarrollo */}
    <BrowserRouter>       {/* Envolvemos App en BrowserRouter para usar rutas */}
      <App />             {/* Componente principal de toda la aplicación */}
    </BrowserRouter>
  </StrictMode>
);
