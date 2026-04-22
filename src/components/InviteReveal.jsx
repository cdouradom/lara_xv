import { useEffect, useState } from "react";
import { publicAsset } from "../paths.js";

const PIX_COPY_PASTE =
  "00020101021126330014br.gov.bcb.pix0111473838488025204000053039865802BR5925Lara Sousa Marques Dourad6009SAO PAULO622905251KPVP0TG0V3YZ07H0GY4FDKKY63049EB1";

export function InviteReveal({ revealed, ariaHidden, onOpenRsvp }) {
  const [pixToast, setPixToast] = useState(null);

  useEffect(() => {
    if (!pixToast) return undefined;
    const id = window.setTimeout(() => setPixToast(null), 2600);
    return () => window.clearTimeout(id);
  }, [pixToast]);

  const handleCopyPix = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(PIX_COPY_PASTE);
      } else {
        const ta = document.createElement("textarea");
        ta.value = PIX_COPY_PASTE;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        ta.style.top = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (!ok) throw new Error("execCommand failed");
      }
      setPixToast("copied");
    } catch {
      setPixToast("error");
    }
  };

  return (
    <div
      className={`invite-reveal${revealed ? " invite-reveal--visible" : ""}`}
      id="invite-reveal"
      aria-hidden={ariaHidden ? "true" : "false"}
    >
      {/* Fundo fotográfico do véu (campo + floresta) — mobile e desktop; stage mais suave quando visível */}
      {/* Só campo (alta transparência); o véu “Toque para entrar” mantém as duas fotos em InviteCurtain */}
      <div className="invite-desktop-veil" aria-hidden="true">
        <div className="invite-desktop-veil__photos">
          <div className="invite-desktop-veil__photo invite-desktop-veil__photo--field">
            <img src={publicAsset("veil-photo-field.png")} alt="" width={1200} height={1600} decoding="async" loading="lazy" />
          </div>
        </div>
        <div className="invite-desktop-veil__wash" />
        <div className="invite-desktop-veil__glow" />
        <div className="invite-desktop-veil__grain" />
      </div>
      <div className="stage" aria-hidden="true">
        <div className="bg-base" />
        <div className="bg-shimmer" />
      </div>

      <div className="floral-header-tl" role="presentation" aria-hidden="true">
        <span className="floral-header-tl__layer floral-header-tl__layer--lilas" />
        <span className="floral-header-tl__layer floral-header-tl__layer--verde" />
      </div>
      <div className="floral-merge floral-merge--tr" role="presentation" aria-hidden="true">
        <span className="floral-merge__layer floral-merge__layer--lilac" />
        <span className="floral-merge__layer floral-merge__layer--aquarela" />
      </div>
      <div className="footer-floral" role="presentation" aria-hidden="true">
        <img
          className="footer-floral__img"
          src={publicAsset("floral-footer-banner.png")}
          alt=""
          width={626}
          height={249}
          decoding="async"
        />
      </div>
      <main className="invite" role="main" id="invite-main" tabIndex={-1}>
        <div className="invite-shell">
          <section className="invite-section invite-section--hero" aria-labelledby="invite-hero-heading">
            <h1 className="hero" id="invite-hero-heading" data-aos="fade-down" data-aos-duration="1000" data-aos-easing="ease-out-cubic">
              <span className="hero__name">Lara</span>
              <span className="hero__xv">XV</span>
            </h1>
            <div className="divider" data-aos="zoom-in" data-aos-delay="120" aria-hidden="true" />
          </section>

          <section className="invite-section invite-section--intro" aria-label="Mensagem do convite">
            <p className="body-text" data-aos="fade-up" data-aos-delay="180" data-aos-duration="850">
              Entre a delicadeza da natureza e o encanto de um sonho que floresce, temos a honra de convidá-lo(a) para uma
              noite memorável.
            </p>
            <p className="body-text body-text--accent" data-aos="fade-up" data-aos-delay="280" data-aos-duration="850">
              Inspirado na magia de uma floresta encantada, celebraremos os seus 15 anos.
            </p>
          </section>

          <section
            className="invite-section invite-section--when"
            aria-label="Sexta-feira, 19 de junho de 2026, às 20 horas"
          >
            <div className="date-poster" data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">
              <div className="date-poster__rail">
                <span className="date-poster__line" />
                <span className="date-poster__rail-label">Sexta</span>
                <span className="date-poster__line" />
              </div>
              <div className="date-poster__center">
                <span className="date-poster__month">JUN</span>
                <time className="date-poster__day" dateTime="2026-06-19T20:00">
                  19
                </time>
                <span className="date-poster__year">2026</span>
              </div>
              <div className="date-poster__rail">
                <span className="date-poster__line" />
                <span className="date-poster__rail-label">20hrs</span>
                <span className="date-poster__line" />
              </div>
            </div>
            <p className="dress-code" data-aos="fade-up" data-aos-delay="440" data-aos-duration="800">
              Traje Social
            </p>
          </section>

          <section className="invite-section invite-section--links" aria-label="Atalhos do convite">
            <div className="actions-wrap" data-aos="fade-up" data-aos-delay="500" data-aos-duration="750">
              <nav className="actions" aria-label="Links do convite">
                <a
                  className="action"
                  href="https://www.google.com/maps/search/?api=1&query=R+Helena+de+Oliveira,+296+Santa+Barbara+D%27Oeste"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Localização"
                >
                  <span className="action__ring" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                  <span>Local</span>
                </a>
                <button type="button" className="action" title="RSVP" onClick={onOpenRsvp}>
                  <span className="action__ring" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4" />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </span>
                  <span>RSVP</span>
                </button>
                <a
                  className="action"
                  href="https://www.amazon.com.br/hz/wishlist/ls/2O0T4TZJE1LKJ?ref_=wl_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Lista de presentes"
                >
                  <span className="action__ring" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 12v10H4V12" />
                      <path d="M2 7h20v5H2z" />
                      <path d="M12 22V7" />
                      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                    </svg>
                  </span>
                  <span>Presentes</span>
                </a>
                <button
                  type="button"
                  className="action"
                  title="Copiar Pix da Lara"
                  onClick={handleCopyPix}
                >
                  <span className="action__ring" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8.5 4.5 L12 8 L15.5 4.5" />
                      <path d="M4.5 8.5 L8 12 L4.5 15.5" />
                      <path d="M19.5 8.5 L16 12 L19.5 15.5" />
                      <path d="M8.5 19.5 L12 16 L15.5 19.5" />
                      <path d="M12 8 L16 12 L12 16 L8 12 Z" />
                    </svg>
                  </span>
                  <span>Pix</span>
                </button>
              </nav>
            </div>
          </section>

          <section className="invite-section invite-section--footer" aria-label="Confirmação e dicas">
            <div className="footer-area" data-aos="fade-in" data-aos-delay="600">
              <div className="footer-block">
                <p className="footer-opt">Confirme até 31/05</p>
                <div className="footer-tap" aria-hidden="true">
                  <img className="footer-tap__img" src={publicAsset("clique-aqui.png")} alt="" width={80} height={80} decoding="async" />
                </div>
                <p className="footer-hint">CLIQUE NOS ÍCONES PARA MAIS INFORMAÇÕES!</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <div
        className={`pix-toast${pixToast ? " pix-toast--visible" : ""}${
          pixToast === "error" ? " pix-toast--error" : ""
        }`}
        role="status"
        aria-live="polite"
      >
        <span className="pix-toast__icon" aria-hidden="true">
          {pixToast === "error" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v5" />
              <path d="M12 16h.01" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          )}
        </span>
        <span className="pix-toast__text">
          {pixToast === "error" ? "Não foi possível copiar. Tente novamente." : "Pix da Lara Copiado!"}
        </span>
      </div>
      <a
        className="wa-fab"
        href="https://api.whatsapp.com/send/?phone=5519995643602&text=Oii%2C+quero+falar+sobre+a+Festa+da+Lara%21+&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        title="Contato WhatsApp"
      >
        <span className="wa-fab__label">WhatsApp</span>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
