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
    define: Object.keys(env)
      .filter((key) => key.startsWith('VITE_'))
      .reduce((acc, key) => {
        acc[`process.env.${key}`] = JSON.stringify(env[key]);
        return acc;
      }, {} as Record<string, string>),
    // Server configuration for development
    server: {
      port: 3000, // You can specify a port
      open: true,   // Automatically open the app in the browser on server start
    },
    // Build configuration
    build: {
      outDir: 'dist', // Output directory for build files
      sourcemap: true, // Generate source maps for debugging
    },
  }
});
