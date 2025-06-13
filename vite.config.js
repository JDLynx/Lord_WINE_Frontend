// Importa la función defineConfig de Vite para definir la configuración del proyecto
import { defineConfig } from 'vite'

// Plugin para compilar proyectos de React usando SWC (más rápido que Babel)
import react from '@vitejs/plugin-react-swc'

// Plugin oficial de TailwindCSS para que funcione correctamente con Vite
import tailwindcss from '@tailwindcss/vite'

// Exporta la configuración de Vite usando defineConfig
export default defineConfig(
{
  // Array de plugins que Vite utilizará
  plugins: [
    react(),       // Soporte para React con SWC
    tailwindcss()  // Integración de TailwindCSS con el build de Vite
  ],
})