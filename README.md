# Lara XV — Floresta Encantada

Convite digital em **uma página estática**: tema floresta encantada, véu de abertura, animações leves e links para local, RSVP (WhatsApp) e lista de presentes.

## O que há no projeto

| Caminho | Descrição |
|--------|-----------|
| `index.html` | Página única: estilos e scripts embutidos; conteúdo do convite. |
| `assets/` | Imagens PNG usadas pelo HTML (florais, véu, rodapé, ícone “clique aqui”). |

### Imagens esperadas em `assets/`

| Ficheiro | Uso |
|----------|-----|
| `reference-invite.png`, `floral-frame.png` | Canto superior direito (camadas lilás + aquarela) |
| `floral-lilas.png`, `ramo-verde-dourado.png` | Canto superior esquerdo |
| `floral-footer-banner.png` | Faixa floral fixa no rodapé |
| `clique-aqui.png` | Dica visual acima do texto do rodapé |
| `veil-photo-field.png`, `veil-photo-forest.png` | Fotos de fundo do véu de abertura |

## Tecnologias

- **HTML5** + **CSS** (variáveis, `clamp`, safe areas, `prefers-reduced-motion`)
- **AOS** (Animate On Scroll) via [unpkg](https://unpkg.com/aos@2.3.1/)
- **Google Fonts**: Cormorant Garamond, Miss Fajardose, Monsieur La Doulaise, Montserrat

> É necessária ligação à internet para fontes, AOS e links externos (Maps, WhatsApp, Canva).

## Como ver localmente

Abrir `index.html` diretamente no navegador **ou** servir a pasta (recomendado para testar caminhos relativos):

```bash
cd LARA_XV
python3 -m http.server 8080
```

Abrir [http://localhost:8080/](http://localhost:8080/).

## Deploy

Publicar a **raiz** do repositório (com `index.html` na raiz e a pasta `assets/` com as imagens) em [GitHub Pages](https://pages.github.com/), Netlify, Cloudflare Pages ou similar.

## Repositório

Remoto: `git@github.com:cdouradom/lara_xv.git` (branch `main`).

## Git (exemplo de commit)

```bash
git add index.html assets/ README.md .gitignore
git commit -m "Convite Lara XV — Floresta Encantada"
```

O `.gitignore` exclui ficheiros locais que não devem ir para o remoto (`.cursor/`, logs, `_archive/`, etc.).
