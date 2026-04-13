# Lara XV — Convite digital

Site estático: **`index.html`** + pasta **`assets/`**.

## Conteúdo do repositório

| Caminho | Uso |
|--------|-----|
| `index.html` | Convite (véu de abertura, animações, AOS). |
| `assets/` | Imagens referenciadas pelo HTML. |

### Ficheiros em `assets/`

- `reference-invite.png`, `floral-frame.png` — canto superior direito  
- `floral-lilas.png`, `ramo-verde-dourado.png` — canto superior esquerdo  
- `floral-footer-banner.png` — rodapé fixo  
- `clique-aqui.png` — dica no rodapé  
- `veil-photo-forest.png`, `veil-photo-field.png` — fotos de fundo do véu (semi-transparentes)  

## Git

```bash
cd LARA_XV
git add index.html assets/ README.md .gitignore
git commit -m "Convite Lara XV"
```

O `.gitignore` exclui coisas que não devem ir para o remoto (`.cursor/`, logs, `_archive/`, etc.).

## Local

Abrir `index.html` no browser ou:

```bash
python3 -m http.server 8080
```

→ `http://localhost:8080/`

## Deploy

Publicar a **raiz** do repositório (com `index.html` na raiz) em GitHub Pages, Netlify, Cloudflare Pages, etc.
