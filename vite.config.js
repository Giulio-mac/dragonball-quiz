import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import adapter from '@sveltejs/adapter-node'; // Cambia l'adattatore a Node

export default defineConfig({
    plugins: [sveltekit()],
    kit: {
        adapter: adapter(), // Usa l'adattatore Node.js
        paths: {
            base: '/dragonball-quiz', // Mantieni il nome della tua repository
        },
        prerender: {
            default: true // Questo può rimanere se vuoi prerenderizzare tutto
        }
    }
});
