import adapter from '@sveltejs/adapter-node'; // Importa l'adattatore per Node.js

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter(), // Configura l'adapter Node.js
        paths: {
            base: '/dragonball-quiz', // Usa il nome della tua repository
        }
    }
};

export default config;
