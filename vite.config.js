import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
    server: {
        host: true
    },
    preview: {
        port: 8080,
    },        
    build: {
        assetsInlineLimit: 0
    }
};

export default config;