# Lara XV — Floresta Encantada

Convite digital com **React (Vite)**: o mesmo layout, animações, véu de abertura, RSVP para a planilha (Google Apps Script), WhatsApp e lista de presentes.

## Estrutura do projeto

| Caminho | Descrição |
|--------|-----------|
| `index.html` | Entrada mínima do Vite (monta `#root`). |
| `src/` | Aplicação React (`App.jsx`, componentes, estilos globais). |
| `src/index.css` | CSS do convite (extraído da versão estática; variáveis de imagem de canto são definidas em `src/paths.js` + `main.jsx`). |
| `public/assets/` | Cópia gerada automaticamente a partir de `assets/` (`npm install` / `postinstall`). Não é obrigatório commitar. |
| `scripts/rsvp-sheet-append.gs` | Apps Script para receber o RSVP na folha. |
| `legacy/static-invite.html` | Cópia de referência da página **só HTML** anterior (não usada no build). |

### Imagens (pasta `assets/` na raiz)

| Ficheiro | Uso |
|----------|-----|
| `reference-invite.png`, `floral-frame.png` | Canto superior direito |
| `floral-lilas.png`, `ramo-verde-dourado.png` | Canto superior esquerdo |
| `floral-footer-banner.png` | Rodapé fixo |
| `clique-aqui.png` | Dica “clique aqui” |
| `veil-photo-field.png`, `veil-photo-forest.png` | Véu inicial |

O script `scripts/ensure-public-assets.mjs` copia `assets/` → `public/assets/` em cada `npm install`, para o Vite servir os ficheiros.

## Variável de ambiente (RSVP)

1. Copia `.env.example` para `.env`.
2. Define `VITE_RSVP_SUBMIT_URL` com o URL da Web App publicada (Apps Script), o mesmo valor que antes estava no HTML.

Sem este URL, o RSVP mostra a mensagem de configuração em vez de enviar.

## Desenvolvimento

Requer **Node.js** (recomendado v18+).

```bash
npm install
npm run dev
```

Abre o URL indicado no terminal (por defeito [http://localhost:5173/](http://localhost:5173/)).

## Build e deploy

```bash
npm run build
```

Saída em `dist/`. Pré-visualização local:

```bash
npm run preview
```

Para **GitHub Pages** a partir da pasta do projeto (ex.: `https://<user>.github.io/lara_xv/`):

1. Em `vite.config.js`, ajusta `base` para o nome do repositório, por exemplo `base: '/lara_xv/'`.
2. Faz deploy do **conteúdo de `dist/`** (GitHub Actions, branch `gh-pages`, ou “Pages” a apontar para a artefacto de build).

> Fontes, AOS e links externos continuam a precisar de internet.

## Repositório

Remoto: `git@github.com:cdouradom/lara_xv.git`.
