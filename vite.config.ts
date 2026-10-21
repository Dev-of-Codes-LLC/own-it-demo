import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The episodes and the README use the preview build on port 4173.
// 5173, Vite's dev port, is often taken by another project.
export default defineConfig({
  plugins: [react()],
  preview: { port: 4173, strictPort: true },
});
