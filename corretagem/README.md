# Clara — base de corretagem de imóveis

Demonstração independente em React, Vite, TypeScript e CSS Modules. Uma vitrine contemporânea com fotografia ampla, branco, verde profundo e um bloco de contato em verde claro. O primeiro imóvel recebe uma composição maior; os demais formam uma grade. Filtros e detalhes ajudam a comparar sem criar um aplicativo complexo.

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

O build gera `dist/`. Essa pasta pode ser publicada posteriormente em uma hospedagem estática. Não abra o HTML pelo protocolo `file://`: use o servidor local. Nenhum serviço precisa de variável de ambiente ou credencial.

## Contatos e mensagens

Os campos `contact.whatsapp`, `phone`, `instagram` e `address` começam vazios por segurança. Nenhum contato da versão anterior foi reaproveitado. Enquanto o WhatsApp estiver vazio ou sintaticamente inválido, os botões abrem um aviso acessível; nenhum número recebe mensagens.

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

- `src/content/site.ts`: conteúdo tipado, marca, títulos, botões, contatos, lista de imóveis, mensagem de interesse, imagens, etapas, metadados e visibilidade.
- `src/content/types.ts`: tipos básicos de marca, imagens e contatos.
- `src/styles/global.css`: tokens `--primary`, `--canvas`, `--surface`, `--display`, `--body`, `--section`, `--gutter`, `--container` e cores do contato.
- `src/components/*.module.css`: estilos de cada composição.
- `src/components/`: Layout, Experience (abertura, diferenciais, sobre, etapas), Properties, Contact e ContactAction.
- `src/lib/properties.ts`: formato de preço e mensagem por imóvel.
- `src/lib/contact.ts`: redirecionamentos.

`brand.logo` aceita `null` para o nome em texto ou `{ src: './images/logo.svg', alt: 'Nome da marca' }`. O campo `about.registration` começa vazio: só preencha com informação real e confirmada do profissional. Nenhum CRECI ou credencial foi inventado.

## Adicionar ou remover imóveis

Edite `listings.items`. O tipo `Property` descreve:

| Campo | Conteúdo |
| --- | --- |
| `reference` | Referência única e estável, também usada na mensagem |
| `name`, `type` | Nome e tipo de imóvel; os filtros surgem automaticamente dos tipos |
| `location` | Bairro/cidade ou localização aproximada; evite publicar endereço privado sem autorização |
| `price` | Valor numérico em reais, formatado pela página |
| `area`, `bedrooms`, `bathrooms`, `parking` | Área privativa em m², quartos, banheiros e vagas |
| `description`, `features` | Texto e lista de características |
| `costs` | Condomínio, IPTU, condições e despesas |
| `photos` | Lista de objetos `{ src, alt }`; a primeira foto é a capa |

Duplique um objeto, dê uma referência exclusiva e substitua todos os dados. Para remover, exclua o objeto. Forneça ao menos uma fotografia por imóvel. “Fotos e detalhes” abre `details/summary` nativos, com características, despesas e galeria. Não há rota ou backend adicional.

## Mensagens de interesse

`contact.message` controla o contato geral. `listings.interestMessage` controla cada anúncio, com os marcadores `{name}` e `{reference}`. Ambos são substituídos antes da codificação do link. Mantenha ao menos a referência na mensagem para identificar o imóvel. Cada botão “Tenho interesse” usa os dados do próprio anúncio.

Enquanto o contato estiver vazio, nenhum anúncio redireciona para um número inventado. As fotos e os imóveis atuais são referências ilustrativas e não representam unidades disponíveis para venda.

## Seções opcionais

Altere `sections.benefits`, `sections.about` e `sections.process` para `true` ou `false`. Os links correspondentes saem da navegação. Abertura, imóveis e contato são principais.

## Fotografias utilizadas

| Arquivo local | Origem |
| --- | --- |
| `public/images/casa.webp` | [Fotografia original](https://images.unsplash.com/photo-1600596542815-ffad4c1539a9) |
| `public/images/apartamento.webp` | [Fotografia original](https://images.unsplash.com/photo-1600210492486-724fe5c67fb0) |
| `public/images/interior.webp` | [Fotografia original](https://images.unsplash.com/photo-1600607687920-4e2a09cf159d) |
| `public/images/jardim.webp` | [Fotografia original](https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde) |
| `public/images/refugio.webp` | [Fotografia original](https://images.unsplash.com/photo-1600210491892-03d54c0aaf87) |

A tipografia usa Segoe UI/Arial do dispositivo, sem fonte remota. As galerias ilustrativas podem reunir ambientes de fotografias diferentes. Na entrega, cada anúncio deve usar fotos autorizadas da mesma unidade e dados conferidos.

## Build e tipos

```powershell
npm.cmd run typecheck
npm.cmd run build
```

O build também executa TypeScript. O PostCSS está isolado na configuração Vite para não herdar Tailwind de outra pasta. Copiar apenas este projeto é suficiente; as outras bases e o portfólio não são dependências.

Para usar outra porta local: `npm.cmd run dev -- --port 5175`. A verificação conjunta de navegador está no README da Bianco; o site funciona sem ela.
