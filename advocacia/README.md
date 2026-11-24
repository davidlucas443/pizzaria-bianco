# Almeida & Prado — base de advocacia

Demonstração independente em React, Vite, TypeScript e CSS Modules. A composição editorial usa azul profundo, tons claros, Georgia e fontes de sistema; os espaços amplos e as divisórias discretas favorecem a leitura. Não há fontes remotas nem biblioteca de interface.

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

- `src/content/site.ts`: conteúdo tipado completo, marca, títulos, botões, contatos, imagens, áreas, profissionais, FAQ, etapas, metadados e visibilidade. O tipo `SiteConfig` descreve a estrutura.
- `src/content/types.ts`: tipos básicos de imagens, marca e contatos.
- `src/styles/global.css`: tokens `--primary`, `--canvas`, `--surface`, `--display`, `--body`, `--section`, `--gutter`, `--container` e cores de contato.
- `src/components/*.module.css`: estilos de cada composição.
- `src/components/`: Layout, Editorial (abertura, escritório, profissionais), Practice (áreas, etapas, FAQ), Contact e ContactAction.
- `src/lib/contact.ts`: redirecionamentos.

O logotipo fica em `brand.logo`: use `null` para o nome em texto ou `{ src: './images/logo.svg', alt: 'Nome do escritório' }`.

## Áreas de atuação, profissionais e dúvidas

Adicione/remova objetos de `practice.items`, cada um com `title` e `text`. Edite as etapas em `process.items` e as perguntas/respostas em `faq.items`. A FAQ usa `details/summary` nativos, operáveis por teclado.

A lista `people.items` começa vazia, com aviso discreto na demonstração. Para inserir um profissional real, forneça `name`, `role`, `bio`, `registration` e `image` (objeto de imagem ou `null`). A identificação e o registro só aparecem quando informados. Não foram criados nomes de profissionais, registros, títulos ou experiência. Não use fotografia de banco como se fosse de um integrante real.

A mensagem de consulta fica em `contact.message`. Os textos apresentados evitam promessa de resultado e não constituem orientação sobre casos concretos. Revise o conteúdo com o responsável pelo escritório antes da entrega.

## Seções opcionais

Em `sections`, altere `office`, `people`, `process` e `faq` entre `true` e `false`. A navegação omite os links vinculados a seções ocultas. Abertura, áreas de atuação e contato são principais.

## Fotografia utilizada

| Arquivo local | Origem |
| --- | --- |
| `public/images/escritorio.webp` | [Fotografia original](https://images.unsplash.com/photo-1497366754035-f200968a6e72) |

Georgia, Segoe UI e Arial são usadas pela pilha de fontes do dispositivo; nenhum arquivo de fonte é redistribuído.

## Build e tipos

```powershell
npm.cmd run typecheck
npm.cmd run build
```

O build também executa a verificação de tipos. A configuração Vite usa PostCSS local vazio para não herdar configurações de uma pasta superior. Copiar apenas esta pasta é suficiente; o portfólio, a Bianco e a corretagem não são dependências.

Para usar outra porta local: `npm.cmd run dev -- --port 5174`. A verificação conjunta de navegador está documentada no README da Bianco; o site funciona sem ela.
