import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
await mkdir('design/bianco', { recursive: true });
await mkdir('src/assets', { recursive: true });
// Run once after generating the source image and its responsive encodings.
for (const size of [480, 800, 1280]) {
  try { await rename(`public/images/bianco-margherita-${size}.webp`, `src/assets/bianco-margherita-${size}.webp`); } catch (error) { if (error.code !== 'ENOENT') throw error; }
}
try { await rename('public/images/bianco-margherita-source.png', 'design/bianco/margherita-source.png'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const component = await readFile('src/components/Brand.jsx', 'utf8');
const path = component.match(/d="(M10 5[^"]+)"/)[1];
for (const [name,color] of [['wine','#6c2632'],['mono','#000000']]) {
  await writeFile(`design/bianco/mark-${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 72"><path fill="${color}" fill-rule="evenodd" d="${path}"/></svg>`);
  await writeFile(`design/bianco/logo-${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 90"><g transform="translate(0 8)" fill="${color}"><path fill-rule="evenodd" d="${path}"/><text x="78" y="48" font-family="Georgia,serif" font-size="58" letter-spacing="-4">bianco</text><text x="82" y="69" font-family="Arial,sans-serif" font-size="10" letter-spacing="3">PIZZA ARTIGIANALE</text></g></svg>`);
}
