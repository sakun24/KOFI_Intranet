import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/landing/',  // Change this to your desired subdirectory
  plugins: [react()],
});



