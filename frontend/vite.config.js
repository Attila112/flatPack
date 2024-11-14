// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'
// //
// // // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // Proxy API requests to Laravel backend
//       '/api': {
//         target: 'http://127.0.0.1:8000', // Your Laravel backend URL
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   },
//   build: {
//     outDir: '../public', // Adjust to where you want to output built files
//   },
// })

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // Proxy API requests to Laravel backend
//       '/server': {
//         target: 'http://backend:8000/', // Your Laravel backend URL
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/server/, ''),
//       },
//     },
//   },
//   build: {
//     outDir: '../public', // Adjust to where you want to output built files
//   },
// })
export default {
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow access from any network interface
    target: 'http://backend:8000', // Your Laravel backend URL
    port: 5173, // Ensure this matches the port you're using
    watch: {
      usePolling: true, // Helps with file watching inside Docker
    },
  },
};