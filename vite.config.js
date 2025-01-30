import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['dynamicvibellc.com'], // Add your allowed host
  },
  plugins: [react()],
})
