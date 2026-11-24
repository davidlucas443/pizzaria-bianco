import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { siteConfig } from './src/content/site';
const escapeHtml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
export default defineConfig({
  base: './',
  css: { postcss: { plugins: [] } },
  plugins: [react(), {
    name: 'business-metadata',
    transformIndexHtml(html: string) {
      return html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(siteConfig.meta.title)}</title>`)
        .replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*"/g, (_, prefix) => `${prefix}${escapeHtml(siteConfig.meta.description)}"`)
        .replace(/(<meta property="og:title" content=")[^"]*"/, (_, prefix) => `${prefix}${escapeHtml(siteConfig.meta.title)}"`);
    },
  }],
});
