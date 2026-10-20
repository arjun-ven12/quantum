import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({plugins:[react(),VitePWA({registerType:'autoUpdate',includeAssets:['favicon.svg'],manifest:{name:'Quantum Atlas',short_name:'Quantum Atlas',description:'Offline quantum computing learning laboratory',theme_color:'#07111f',background_color:'#07111f',display:'standalone',start_url:'/',icons:[{src:'/icon-192.png',sizes:'192x192',type:'image/png',purpose:'any maskable'},{src:'/icon-512.png',sizes:'512x512',type:'image/png',purpose:'any maskable'}]},workbox:{globPatterns:['**/*.{js,css,html,svg,woff2,pdf}'],navigateFallback:'/index.html'}})]});
