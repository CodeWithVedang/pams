import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'LifeTrack Health App',
        short_name: 'LifeTrack',
        description: 'Advanced habit tracking and personal activity monitoring.',
        theme_color: '#3b82f6',
        icons: [
          {
            src: 'https://ui-avatars.com/api/?name=LT&background=3b82f6&color=fff&size=192',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://ui-avatars.com/api/?name=LT&background=3b82f6&color=fff&size=512',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
  ],
})
