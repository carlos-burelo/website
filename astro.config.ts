import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    site: 'https://twwk.cc',
    output: 'static',
    compressHTML: true,
    prefetch: {
        prefetchAll: true,
    },
    build: {
        inlineStylesheets: 'auto',
        assets: '_astro',
    },
    markdown: {
        shikiConfig: {
            theme: 'one-dark-pro'
        }
    },
    integrations: [mdx(), sitemap()],
    vite: {
        plugins: [tailwindcss()],
        build: {
            cssCodeSplit: true,
            sourcemap: false,
            reportCompressedSize: false,
            assetsInlineLimit: 4096,
            chunkSizeWarningLimit: 500,
        },
    }
});
