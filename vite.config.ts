/// <reference types="node" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      // Expose environment variables to the client.
      // This makes `process.env.API_KEY` available in the code.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    // Server configuration for development
    server: {
      port: 3000, // You can specify a port
      open: true, // Automatically open the app in the browser on server start
    },
    // Build configuration
    build: {
      outDir: 'dist', // Output directory for build files
      sourcemap: true, // Generate source maps for debugging
    },
  };
});
