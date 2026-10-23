import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    site: 'https://coatl.in',
    output: 'static',
    compressHTML: true,
    build: {
        inlineStylesheets: 'auto',
        assets: '_astro',
    },
    markdown: {
        shikiConfig: {
            theme: 'one-dark-pro'
        }
    },
    integrations: [mdx()],
    vite: {
        plugins: [tailwindcss() as any],
        build: {
            cssCodeSplit: true,
            sourcemap: false,
            reportCompressedSize: false,
            assetsInlineLimit: 4096,
            chunkSizeWarningLimit: 500,
        },
    }
});
