# Bianco — base de pizzaria

## Rebranding — do forno à mesa

A Bianco agora usa uma abertura editorial inspirada na composição da Viudes, header transparente, marca centralizada e um monograma B com abertura de forno. Todas as seções ocupam a largura disponível e têm altura mínima de uma viewport; o conteúdo pode aumentar essa altura no celular. A segunda seção alterna três fotografias diferentes, sem zoom, com legendas sincronizadas. A imagem principal é uma ilustração fotográfica gerada por IA, não uma foto de produto real. O original e as versões SVG horizontal, compacta e monocromática ficam em `design/bianco/`. Os SVGs horizontais usam Georgia; o header usa a tipografia configurada no site.

- `src/rebrand.css`: composição, header, cores e responsividade do rebranding.
- `src/components/Brand.jsx`: marca vetorial usada no site.
- `src/components/BioPage.jsx`: página de links compacta servida em `/bio`.
- `src/lib/useMotion.js`: Lenis sincronizado ao ticker do GSAP e uma única cena fixada via ScrollTrigger em telas maiores que 900 px e altura mínima de 650 px. No celular e com movimento reduzido, os detalhes seguem em fluxo normal.
- `src/components/LoadingScreen.jsx`: espera apenas a decodificação da foto principal, por até 1,5 segundo, liberando imediatamente em falha ou quando já carregada. Header e pedido continuam disponíveis. Links diretos pulam a espera.
- `src/data/siteConfig.js`: conteúdo, contatos, imagem responsiva e três etapas de `journey`. A afirmação de longa fermentação é conteúdo demonstrativo do briefing e precisa ser confirmada para um negócio real.
- `src/assets/`: WebPs da abertura em 480, 800 e 1280 px. Vite gera nomes com hash. Configure cache longo e `immutable` para `/assets/` na hospedagem e revalidação para o HTML; nenhum service worker é usado. Outras fotos são antecipadas por proximidade.

Execute `node scripts/verify-rebrand.mjs` com o servidor local em `http://127.0.0.1:5173`, ou defina `BIANCO_URL` para testar um preview de produção. O roteiro verifica sete larguras com e sem movimento, teclado, âncoras, acessibilidade e falhas de imagem. Resultados e capturas ficam em `.qa/rebrand/`. `node scripts/optimize-hero.mjs` recria os WebPs a partir do original; requer Chrome instalado. A medição automatizada de frames serve como comparação local, não como garantia de desempenho em celulares físicos.

Documentação consultada: [Lenis](https://github.com/darkroomengineering/lenis), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) e [GSAP no React](https://gsap.com/resources/React/).

### Ponto de retomada — 24/11/2026

Trabalho interrompido a pedido para salvar no GitHub. Implementados: nova marca, abertura, carregamento limitado, Lenis/GSAP, três fotos alternadas na segunda seção, header transparente e seções com altura mínima de tela inteira. Build final e verificação de contatos passaram. A suíte de navegador passou nas sete larguras com movimento normal e reduzido antes do último ajuste de espaço da seção fixa. Esse ajuste foi conferido no navegador de desenvolvimento, com as três fotos avançando e voltando corretamente. Ao retomar, rodar `scripts/verify-rebrand.mjs` no preview de produção para conferir o ajuste final e continuar a revisão visual com o usuário. As pastas de advocacia e corretagem também fazem parte deste ponto de salvamento.

Uma casa de pizza artesanal com vinho, creme, tipografia expressiva e fotografias de comida. O projeto existente foi mantido em React, JavaScript, Vite 5 e Tailwind 3. Há apresentação, destaques, cardápio por categoria, história, diferenciais e contato.

As novas bases ficam em [advocacia](./advocacia/README.md) e [corretagem](./corretagem/README.md), com seus próprios pacotes, lockfiles, código, recursos e builds. Cada uma pode ser copiada sozinha para uma nova pasta. Não são workspaces npm e não usam arquivos da Bianco em execução.

## Ambiente e execução

Validado com Node.js 26.5.0 e npm 11.17.0 no Windows. Para os projetos TypeScript, o Vite aceita Node `^20.19.0 || >=22.12.0`; use uma versão compatível. Não há backend, banco, autenticação ou painel.

Abra esta pasta no VS Code e use o terminal integrado:

```powershell
npm.cmd ci
npm.cmd run dev
npm.cmd run build
npm.cmd run preview
```

No Linux/macOS, use `npm` no lugar de `npm.cmd`. No Windows, `npm.cmd` também evita o bloqueio de `npm.ps1` pela política do PowerShell. Acesse a URL local que o Vite imprimir. Para encerrar, pressione Ctrl+C.

O build gera `dist/`. Essa pasta pode ser publicada posteriormente em uma hospedagem estática. O `vercel.json` encaminha `/bio` ao app React para que a rota também funcione quando acessada diretamente. Não abra o HTML pelo protocolo `file://`: use o servidor local. Nenhum serviço precisa de variável de ambiente ou credencial.

## Contatos e mensagens

Os dados de contato são configurados em `siteConfig.js` e devem ser confirmados antes da publicação. Os botões de pedido do site e de `/bio` usam o WhatsApp configurado; o telefone e o endereço alimentam os links de chamada e de mapas.

- WhatsApp: preencha com DDI, DDD e número, apenas dígitos. Use somente um número autorizado pelo cliente.
- Telefone: informe o número completo com DDI; a página monta o link `tel:+...`.
- Instagram: use uma URL completa com `https://`. O link só aparece com uma URL válida.
- Endereço: escreva o endereço real completo. “Como chegar” só aparece quando ele estiver preenchido e abre a busca codificada do Google Maps.
- Horários: altere `contact.hours`; os horários atuais são ilustrativos.

As mensagens passam por `encodeURIComponent`. Não digite a mensagem já codificada nem inclua informações pessoais sensíveis no texto padrão. A validação de formato não confirma a propriedade de um número: isso precisa ser conferido por você antes da entrega. Links de WhatsApp, Instagram e mapas abrem uma nova aba; o telefone usa o aplicativo do dispositivo.

## Imagens e origem dos recursos

As fotografias estão em `public/images/`, baixadas do Unsplash em WebP com largura limitada e qualidade 78. A [licença Unsplash](https://unsplash.com/license) permite uso comercial e não comercial. Não são imagens Unsplash+. As fotografias são referências visuais e não retratam o negócio ou os anúncios reais do cliente. Substitua-as por imagens autorizadas do negócio na entrega.

Altere cada objeto de imagem (`src` e `alt`) na configuração. Salve novos arquivos em `public/images/` e use caminhos relativos como `./images/foto.webp`. Escreva uma descrição alternativa correspondente ao conteúdo da foto. As imagens de abertura carregam com prioridade; as demais usam carregamento adiado. Não há rastreador, mapa incorporado ou recurso visual pago.

O favicon em `public/favicon.svg` é uma composição original de texto e forma. Substitua-o junto com o logotipo. Os arquivos do portfólio não são dependências desta base.

## Antes de entregar a um cliente

Substitua marca, logotipo, favicon, textos e imagens; confirme horários, endereço, contatos, ofertas e informações profissionais. Revise mensagens e todos os redirecionamentos em dispositivos reais. Ajuste `meta.title` e `meta.description` na configuração: o Vite injeta esses valores no HTML de produção e nos metadados Open Graph. A cor do navegador fica em `index.html`, no campo `theme-color`.

Mantenha o aviso de demonstração enquanto houver conteúdo ilustrativo. Só o remova após substituir e conferir todas as informações. Não acrescente avaliações, números, credenciais ou promessas sem dados verificáveis. Não houve commit, push, PR ou deploy nesta etapa.


## Onde personalizar

- `src/data/siteConfig.js`: todo o conteúdo do negócio, imagens, marca, metadados, navegação, contatos, mensagens e visibilidade.
- `src/index.css`: variáveis `--wine`, `--cream`, `--paper`, `--font-body`, `--font-display`, `--section`, `--gutter` e `--content`, além dos estilos de composição.
- `tailwind.config.js`: integra as cores e fontes ao tema Tailwind.
- `src/components/`: navegação, abertura/apresentação/história, cardápio, contato e ação de atendimento.
- `src/lib/contact.js`: montagem e validação dos redirecionamentos.

`brand.logo` aceita `null` para a marca em texto ou `{ src: './images/logo.svg', alt: 'Nome da marca' }` para uma imagem. Textos dos botões ficam em `ui`.

A tipografia usa Fraunces e Manrope do Google Fonts, com alternativas locais Georgia e sans-serif. O CSS das fontes requer internet; sem conexão, as alternativas mantêm a página utilizável. Fontes de origem: [Fraunces](https://fonts.google.com/specimen/Fraunces) e [Manrope](https://fonts.google.com/specimen/Manrope), distribuídas com licença aberta pelo Google Fonts.

## Pedidos e página Bio

Edite `contact.messages.order` para personalizar a mensagem de pedido no WhatsApp. A página `/bio` compartilha os mesmos contatos e oferece atalhos para pedido, cardápio, mapa, telefone e site principal. Os botões de reserva não estão disponíveis.

## Adicionar ou remover pratos

Edite `menu.categories`. Cada categoria tem `name` e `items`; cada item tem `name`, `description` e `price` numérico em reais. Para remover, exclua o item ou a categoria.

A vitrine visual fica em `featured.items`, com nome, descrição, preço e objeto de imagem. Mantenha os preços e ingredientes coerentes com o cardápio ao editar as duas listas. A fotografia deve corresponder aos ingredientes anunciados. Não há carrinho: o pedido é combinado no atendimento.

## Seções opcionais

Em `sections`, altere `presentation`, `featured`, `story` e `features` para `true` ou `false`. Os links de navegação ligados a uma seção oculta também são removidos. Cardápio e contato são seções principais. Se criar outra seção opcional, associe seu link à chave de visibilidade em `navigation[].section`.

## Fotografias utilizadas

| Arquivo local | Origem |
| --- | --- |
| `public/images/pizza-hero.webp` | [Fotografia original](https://images.unsplash.com/photo-1513104890138-7c749659a591) |
| `public/images/pizza-tomate.webp` | [Fotografia original](https://images.unsplash.com/photo-1574071318508-1cdbab80d002) |
| `public/images/pizza-pepperoni.webp` | [Fotografia original](https://images.unsplash.com/photo-1628840042765-356cda07504e) |
| `public/images/pizza-forno.webp` | [Fotografia original](https://images.unsplash.com/photo-1565299624946-b28f40a0ae38) |
| `public/images/mesa.webp` | [Fotografia original](https://images.unsplash.com/photo-1414235077428-338989a2e8c0) |

O script opcional `node scripts/download-assets.mjs` recupera as fotos das três bases e exige internet. Não é necessário para executar ou gerar o site: os arquivos já estão locais.

## Verificação das três bases

Depois de instalar e gerar o build de cada projeto:

```powershell
npm.cmd run verify:contact
npm.cmd run verify:browser
```

`verify:contact` usa suporte nativo do Node a tipos apagáveis (Node 22.18+ ou 24/26). Confere mensagens codificadas, mapas, telefone, URLs de redes sociais, números ausentes e referências dos imóveis sem enviar mensagens ou abrir contatos.

`verify:browser` usa Playwright Core e axe com o Chrome já instalado, inicia três previews locais nas portas 4173–4175 e os encerra ao terminar. Configure `CHROME_PATH` se o navegador estiver em outro caminho. Não é necessário baixar outro navegador. Para servidores já abertos, defina `QA_USE_EXISTING_SERVERS=1` e, se preciso, `BIANCO_URL`, `ADVOCACIA_URL` e `CORRETAGEM_URL`.

O roteiro verifica 320, 390, 768, 900, 1023 e 1440 px: imagens carregadas, ausência de overflow, menu e Escape, foco visível, salto para conteúdo, âncoras abaixo do cabeçalho, avisos de contato, FAQ, filtros e detalhes de imóveis. Gera capturas em 390 e 1440 px e um relatório em `.qa/` (ignorado pelo Git). A análise automatizada não substitui revisão humana nem teste com leitor de tela.
