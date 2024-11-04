// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
//
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to Laravel backend
      '/api': {
        target: 'http://127.0.0.1:8000', // Your Laravel backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: '../public', // Adjust to where you want to output built files
  },
})
