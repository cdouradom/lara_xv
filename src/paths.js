/**
 * Base do site (Vite `base`) + caminho para ficheiros em `public/assets/`.
 * Importante: estes URLs entram em variáveis CSS usadas dentro de CSS empacotado
 * em `/assets/index-*.css`. Com `./assets/...` o browser resolve em relação ao CSS
 * e obtém `/assets/assets/...` (404). Por isso normalizamos para caminho absoluto na origem.
 */
export function publicAsset(filename) {
  let b = import.meta.env.BASE_URL || "/";
  if (b === "./" || b === ".") {
    b = "/";
  }
  if (!b.endsWith("/")) b += "/";
  return `${b}assets/${filename}`;
}

/** Para `url('...')` em CSS variables. */
export function publicAssetUrl(filename) {
  return `url('${publicAsset(filename)}')`;
}

export function setRootImageCssVars() {
  const r = document.documentElement;
  r.style.setProperty("--ref-lilac", publicAssetUrl("reference-invite.png"));
  r.style.setProperty("--ref-aquarela", publicAssetUrl("floral-frame.png"));
  r.style.setProperty("--header-floral-lilas", publicAssetUrl("floral-lilas.png"));
  r.style.setProperty("--header-floral-verde", publicAssetUrl("ramo-verde-dourado.png"));
}
