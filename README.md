# Lara XV — Floresta Encantada

Convite digital em **React (Vite)** com véu de abertura, animações (AOS), RSVP integrado à Planilha via Google Apps Script, atalhos para Localização / Presentes / Pix e botão fixo de WhatsApp.

## Estrutura do projeto

| Caminho | Descrição |
|---------|-----------|
| `index.html` | Entrada mínima do Vite (monta `#root` e importa `/src/main.jsx`). |
| `src/main.jsx` | Bootstrap do React + estilos globais. |
| `src/App.jsx` | Orquestra o véu (`InviteCurtain`), o convite (`InviteReveal`) e os modais de RSVP. |
| `src/components/InviteReveal.jsx` | Convite em si: hero, data, atalhos (**Local**, **RSVP**, **Presentes**, **Pix**) e FAB do WhatsApp. |
| `src/components/RsvpModals.jsx` | Modal "Confirmar presença" + modal de avisos. |
| `src/components/InviteCurtain.jsx` | Véu inicial "Toque para entrar". |
| `src/rsvpApi.js` | Envio do RSVP para o Apps Script (usa `VITE_RSVP_SUBMIT_URL`). |
| `src/paths.js` | Helper `publicAsset()` que monta o caminho correto para `public/assets/` respeitando o `base` do Vite. |
| `src/index.css` | CSS global do convite (todas as variáveis e layouts). |
| `public/assets/` | **Gerado automaticamente** a partir de `assets/` pelo `postinstall` (ver abaixo). Está no `.gitignore`. |
| `scripts/ensure-public-assets.mjs` | Script que copia `assets/` → `public/assets/` a cada `npm install`. |
| `scripts/rsvp-sheet-append.gs` | Google Apps Script que recebe o RSVP e grava na planilha. |
| `legacy/static-invite.html` | Versão 100% HTML estática, mantida só como referência histórica (não entra no build). |
| `netlify.toml` | Configuração do Netlify (`publish = "dist"`, Node 20). |
| `vite.config.js` | Config do Vite (`base: "/"`). |

### Imagens (pasta `assets/` na raiz)

| Ficheiro | Uso |
|----------|-----|
| `reference-invite.png`, `floral-frame.png` | Canto superior direito |
| `floral-lilas.png`, `ramo-verde-dourado.png` | Canto superior esquerdo |
| `floral-footer-banner.png` | Rodapé fixo |
| `clique-aqui.png` | Dica "clique aqui" |
| `veil-photo-field.png`, `veil-photo-forest.png` | Véu inicial |

> Edite sempre em `assets/`. O script `scripts/ensure-public-assets.mjs` (rodado via `postinstall`) copia para `public/assets/`, que é o que o Vite serve em dev e empacota no build.

## Pré-requisitos

- **Node.js 18+** (Netlify usa Node 20, definido em `netlify.toml`).
- `npm` (já vem com o Node).

## Variável de ambiente (RSVP)

1. Copie `.env.example` para `.env` na raiz.
2. Defina `VITE_RSVP_SUBMIT_URL` com o URL `/exec` da Web App publicada (Apps Script).

```bash
cp .env.example .env
# edite .env e cole o URL
```

Sem essa variável, o modal de RSVP exibe uma mensagem de configuração em vez de enviar. **No Netlify**, defina a mesma variável em *Site settings → Environment variables*.

## Desenvolvimento

```bash
npm install   # já copia assets/ → public/assets/ via postinstall
npm run dev
```

Abra a URL exibida no terminal (por padrão [http://localhost:5173/](http://localhost:5173/)). Se preferir outra porta:

```bash
npx vite --port=4000
```

## Build e preview local

```bash
npm run build     # gera dist/
npm run preview   # serve dist/ localmente
```

## Deploy no Netlify

O repositório já está configurado para Netlify via `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

Fluxo automático no Netlify:

1. `npm install` → dispara `postinstall` → copia `assets/` para `public/assets/`.
2. `npm run build` → Vite gera `dist/` (HTML + CSS + JS + imagens).
3. Netlify publica o conteúdo de `dist/`.

**Checklist antes de subir:**

- [ ] Variáveis `.env` sensíveis **não** estão commitadas (`.env` está no `.gitignore`; só `.env.example` vai para o Git).
- [ ] `VITE_RSVP_SUBMIT_URL` configurada em *Site settings → Environment variables* no Netlify.
- [ ] `npm run build` roda sem erros localmente (verifique `dist/index.html`, `dist/assets/*.css`, `dist/assets/*.js`, imagens).
- [ ] Novas imagens colocadas em `assets/` (o script copia para `public/assets/`).
- [ ] `vite.config.js` com `base: "/"` (domínio raiz do Netlify). Para GitHub Pages em subpasta, trocar para `base: "/nome-do-repo/"`.

### Observações importantes

- A ação **Pix** (ícone de copiar chave/Copia e Cola) usa `navigator.clipboard.writeText`, que requer **HTTPS** ou `localhost`. O Netlify serve via HTTPS, então funciona out-of-the-box. Há fallback com `document.execCommand('copy')` para navegadores antigos.
- O projeto é **SPA sem rotas** (só modais). Não é necessário arquivo `_redirects` no Netlify.
- As fontes do Google, AOS e links externos (Maps, Amazon, WhatsApp) precisam de internet — igual ao comportamento anterior.

## Repositório

Remoto: `git@github.com:cdouradom/lara_xv.git`.
