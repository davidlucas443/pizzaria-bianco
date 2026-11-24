// Reexecutar somente quando precisar recuperar as fotografias originais.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
const assets = [
  [
    "public/images/pizza-hero.webp",
    "1513104890138-7c749659a591",
    1200
  ],
  [
    "public/images/pizza-tomate.webp",
    "1574071318508-1cdbab80d002",
    800
  ],
  [
    "public/images/pizza-pepperoni.webp",
    "1628840042765-356cda07504e",
    800
  ],
  [
    "public/images/pizza-forno.webp",
    "1565299624946-b28f40a0ae38",
    800
  ],
  [
    "public/images/mesa.webp",
    "1414235077428-338989a2e8c0",
    1000
  ],
  [
    "advocacia/public/images/escritorio.webp",
    "1497366754035-f200968a6e72",
    1000
  ],
  [
    "corretagem/public/images/casa.webp",
    "1600596542815-ffad4c1539a9",
    1600
  ],
  [
    "corretagem/public/images/apartamento.webp",
    "1600210492486-724fe5c67fb0",
    1100
  ],
  [
    "corretagem/public/images/interior.webp",
    "1600607687920-4e2a09cf159d",
    1000
  ],
  [
    "corretagem/public/images/jardim.webp",
    "1600047509807-ba8f99d2cdde",
    1000
  ],
  [
    "corretagem/public/images/refugio.webp",
    "1600210491892-03d54c0aaf87",
    1000
  ]
];
await Promise.all(assets.map(async ([path, id, width]) => {
  const url = `https://images.unsplash.com/photo-${id}?fm=webp&fit=crop&w=${width}&q=78`;
  const response = await fetch(url);
  if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`${path}: ${response.status}`);
  const data = Buffer.from(await response.arrayBuffer());
  await mkdir(dirname(path), { recursive: true }); await writeFile(path, data);
  console.log(`${path}: ${Math.round(data.length/1024)} KB`);
}));
