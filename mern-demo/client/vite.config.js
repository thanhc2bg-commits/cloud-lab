import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load biến môi trường từ Render hoặc file .env
  const env = loadEnv(mode, process.cwd(), '');
  
  // Lấy URL backend từ biến môi trường, nếu không có mới fallback về http://backend:5000
  const target = env.VITE_API_URL || 'http://backend:5000';

  return {
    plugins: [react()],
    server: {
      host: true,
      allowedHosts: true,
      proxy: {
        '/api': {
          target: target,
          changeOrigin: true,
          secure: false,
        }
      }
    },
    preview: {
      host: true,
      allowedHosts: true,
      proxy: {
        '/api': {
          target: target,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})