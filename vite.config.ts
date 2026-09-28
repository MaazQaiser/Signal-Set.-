import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Honour the port assigned by the harness; fall back to Vite's default.
    port: Number(process.env.PORT) || 5173,
  },
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
})
