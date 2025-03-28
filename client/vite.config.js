import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        // This is the port that the Vite dev server will run on
        port: 3000,
        open: true,
        proxy: {
            '/graphql': {
                // This is the target URL for the proxy
                // You can change this to your backend server URL, the python server port
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
            },
        }
    },
});
