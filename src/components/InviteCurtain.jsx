import { publicAsset } from "../paths.js";

export function InviteCurtain({ onEnter, leaving, done }) {
  return (
    <div
      className={`invite-curtain${leaving ? " invite-curtain--leaving" : ""}${done ? " invite-curtain--done" : ""}`}
      id="invite-curtain"
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-curtain-title"
      aria-hidden={done ? "true" : undefined}
    >
      <div className="invite-curtain__photos" aria-hidden="true">
        <div className="invite-curtain__photo invite-curtain__photo--veil-upper">
          <img src={publicAsset("veil-photo-field.png")} alt="" width={1200} height={1600} decoding="async" />
        </div>
        <div className="invite-curtain__photo invite-curtain__photo--veil-lower">
          <img src={publicAsset("veil-photo-forest.png")} alt="" width={1200} height={1600} decoding="async" />
        </div>
      </div>
      <div className="invite-curtain__wash" aria-hidden="true" />
      <div className="invite-curtain__glow" aria-hidden="true" />
      <div className="invite-curtain__grain" aria-hidden="true" />
      <h2 id="invite-curtain-title" className="invite-curtain__sr-only">
        Convite Lara XV — toque para abrir
      </h2>
      <button type="button" className="invite-curtain__cta" id="invite-open-btn" aria-describedby="invite-curtain-title" onClick={onEnter}>
        <span className="invite-curtain__ornament" aria-hidden="true">
          <svg width="56" height="10" viewBox="0 0 56 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 5h22M34 5h22" stroke="url(#inviteOrn)" strokeWidth="0.9" strokeLinecap="round" opacity="0.85" />
            <circle cx="28" cy="5" r="1.8" fill="#0a4a2d" opacity="0.22" />
            <defs>
              <linearGradient id="inviteOrn" x1="0" y1="5" x2="56" y2="5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#043220" stopOpacity="0" />
                <stop offset="0.45" stopColor="#0d6b3f" stopOpacity="0.45" />
                <stop offset="0.55" stopColor="#7b63a8" stopOpacity="0.5" />
                <stop offset="1" stopColor="#043220" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="invite-curtain__name">Lara</span>
        <span className="invite-curtain__xv">XV</span>
        <span className="invite-curtain__divider" aria-hidden="true" />
        <span className="invite-curtain__hint">Toque para entrar</span>
      </button>
    </div>
  );
}
