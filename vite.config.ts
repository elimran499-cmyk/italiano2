import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    build: {
      // Channel logos are dozens of small files; inlining them as base64 buried
      // ~84KB gzip of artwork inside the JS chunk instead of letting the browser
      // cache them as images.
      assetsInlineLimit: 1024,
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // Bind all interfaces so the site is reachable from other devices on the LAN.
      host: true,
      port: 3000,
      // Accept the Mac's Bonjour/mDNS name, e.g. MacBook-Pro-de-MacBook-3.local:3000
      allowedHosts: ['.local'],
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      host: true,
      // Separate port from the dev server so both can run at once.
      port: 4173,
      allowedHosts: ['.local'],
    },
  };
});
