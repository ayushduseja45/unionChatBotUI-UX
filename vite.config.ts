import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // If using React
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(), // If using React
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'My Vite PWA',
        short_name: 'VitePWA',
        description: 'My awesome PWA built with Vite',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: '/pwa-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      },
    }),
  ],
});
