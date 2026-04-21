export const NOTICE_TITLE_DEFAULT = "Atenção Convidados(as):";

export const RSVP_VALIDATION_MESSAGE =
  "Para confirmar a presença, informe seu nome e idade e, se houver acompanhantes, inclua também os dados de cada um, considerando 0 para bebês.";

export const RSVP_CONFIG_MESSAGE =
  "O envio para a planilha ainda não está configurado. Defina VITE_RSVP_SUBMIT_URL no ficheiro .env (raiz do projeto). Instruções: scripts/rsvp-sheet-append.gs";

export const RSVP_ERROR_MESSAGE =
  "Não foi possível registrar agora. Tente de novo em instantes ou use o WhatsApp.";

/**
 * @param {{ id: number; nome: string; idade: string }[]} rows
 * @returns {{ partial: boolean; complete: { nome: string; idade: number }[] }}
 */
export function analyzeRows(rows) {
  let partial = false;
  const complete = [];
  for (let i = 0; i < rows.length; i++) {
    const nome = (rows[i].nome || "").trim();
    const idadeStr =
      rows[i].idade === "" || rows[i].idade === null || rows[i].idade === undefined
        ? ""
        : String(rows[i].idade).trim();
    const hasNome = nome.length > 0;
    const hasIdade = idadeStr.length > 0;
    if (hasNome !== hasIdade) {
      partial = true;
      break;
    }
    if (hasNome && hasIdade) {
      const n = parseInt(idadeStr, 10);
      if (Number.isNaN(n) || n < 0 || n > 99) {
        partial = true;
        break;
      }
      complete.push({ nome, idade: n });
    }
  }
  return { partial, complete };
}

/**
 * GET com parâmetro **g** (JSON) + _ts; fallback POST se URL longa.
 * @param {string} url
 * @param {{ nome: string; idade: number }[]} guests
 * @param {{ onOk: () => void; onErr: () => void }} cb
 */
export function submitRsvpViaForm(url, guests, cb) {
  const base = String(url).split("#")[0];
  const qs = new URLSearchParams();
  qs.append("g", JSON.stringify(guests));
  qs.append("_ts", String(Date.now()));
  const q = qs.toString();
  const sep = base.indexOf("?") >= 0 ? "&" : "?";
  const fullGet = base + sep + q;

  let done = false;
  let slowTimer = null;
  /** @type {HTMLIFrameElement | null} */
  let iframe = null;
  /** @type {HTMLFormElement | null} */
  let form = null;

  function cleanup() {
    if (iframe && iframe.parentNode) iframe.parentNode.removeChild(iframe);
    if (form && form.parentNode) form.parentNode.removeChild(form);
  }

  function finishOk() {
    if (done) return;
    done = true;
    if (slowTimer) window.clearTimeout(slowTimer);
    cleanup();
    cb.onOk();
  }

  function finishErr() {
    if (done) return;
    done = true;
    if (slowTimer) window.clearTimeout(slowTimer);
    cleanup();
    cb.onErr();
  }

  if (fullGet.length <= 7500) {
    fetch(fullGet, { method: "GET", mode: "no-cors", cache: "no-store" })
      .then(() => {
        finishOk();
      })
      .catch(() => {
        finishErr();
      });
    return;
  }

  const iframeName = "rsvp_iframe_" + String(Date.now());
  iframe = document.createElement("iframe");
  iframe.setAttribute("name", iframeName);
  iframe.setAttribute("aria-hidden", "true");
  iframe.title = "";
  iframe.style.cssText =
    "position:fixed;width:1px;height:1px;left:-100px;top:0;border:0;opacity:0;pointer-events:none";

  form = document.createElement("form");
  form.method = "POST";
  form.action = base;
  form.target = iframeName;
  form.acceptCharset = "UTF-8";
  form.setAttribute("enctype", "application/x-www-form-urlencoded");

  const gInp = document.createElement("input");
  gInp.type = "hidden";
  gInp.name = "g";
  gInp.value = JSON.stringify(guests);
  form.appendChild(gInp);

  document.body.appendChild(iframe);
  iframe.onload = function afterBlank() {
    iframe.onload = function afterPost() {
      finishOk();
    };
    document.body.appendChild(form);
    try {
      form.submit();
    } catch {
      finishErr();
      return;
    }
    slowTimer = window.setTimeout(() => {
      finishOk();
    }, 8000);
  };
  iframe.src = "about:blank";
}
