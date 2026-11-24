import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { whatsappLink, phoneLink, mapLink, socialLink } from '../src/lib/contact.js';
const message = 'Olá! Quero reservar mesa às 20h. É possível?';
for (const path of ['../src/lib/contact.js', '../advocacia/src/lib/contact.ts', '../corretagem/src/lib/contact.ts']) {
  const module = await import(path);
  assert.equal(module.whatsappLink('', message), null);
  assert.equal(module.whatsappLink('123', message), null);
  // Número apenas sintático de teste. Nunca é salvo na configuração ou aberto.
  const link = new URL(module.whatsappLink('5500000000000', message));
  assert.equal(link.searchParams.get('text'), message);
  assert.equal(module.phoneLink('+55 (00) 00000-0000'), 'tel:+5500000000000');
  assert.equal(module.mapLink(''), null);
  assert.equal(new URL(module.mapLink('Rua A, 10 & B')).searchParams.get('query'), 'Rua A, 10 & B');
  assert.equal(module.socialLink('javascript:alert(1)'), null);
  assert.equal(module.socialLink('https://instagram.com/'), 'https://instagram.com/');
}
assert.equal(whatsappLink('', ''), null); assert.equal(phoneLink(''), null); assert.equal(mapLink(''), null); assert.equal(socialLink(''), null);
const { siteConfig: bianco } = await import('../src/data/siteConfig.js');
assert.notEqual(bianco.contact.messages.order, bianco.contact.messages.reservation);
const law = await readFile(new URL('../advocacia/src/content/site.ts', import.meta.url), 'utf8');
const realty = await readFile(new URL('../corretagem/src/content/site.ts', import.meta.url), 'utf8');
// Node 26 executa tipos apagáveis; importar funções de imóveis não carrega o conteúdo.
const { propertyMessage } = await import('../corretagem/src/lib/properties.ts');
for (const reference of ['CL-101','CL-202','CL-303']) {
  const text = propertyMessage('Interesse em {name}, referência {reference}', { name: 'Imóvel & família', reference });
  assert.ok(text.includes(reference)); assert.ok(text.includes('Imóvel & família'));
  assert.equal(new URL(whatsappLink('5500000000000', text)).searchParams.get('text'), text);
}
assert.ok(law.includes("whatsapp: ''")); assert.ok(realty.includes("whatsapp: ''"));
console.log('PASS: links sem contato, codificação, mapas, telefone, redes e identificação dos imóveis.');
