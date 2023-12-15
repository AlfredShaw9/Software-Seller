import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // externals: { "react-native": true },
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
//   resolve: {
//     alias: {
//         'react-native$': 'react-native-web'
//     }
// }
})
