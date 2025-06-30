import { defineConfig } from 'vite';


// https://vitejs.dev/config
export default defineConfig(async () => {
    const vue = (await import('@vitejs/plugin-vue')).default
    const tailwindcss = (await import('@tailwindcss/vite')).default
    return {
        plugins: [
            vue(),
            tailwindcss(),
        ]
    }
});
