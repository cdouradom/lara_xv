import { useCallback, useEffect, useRef, useState } from "react";
import {
  analyzeRows,
  NOTICE_TITLE_DEFAULT,
  RSVP_CONFIG_MESSAGE,
  RSVP_ERROR_MESSAGE,
  RSVP_VALIDATION_MESSAGE,
  submitRsvpViaForm,
} from "../rsvpApi.js";

const RSVP_SUBMIT_URL = (import.meta.env.VITE_RSVP_SUBMIT_URL || "").trim();

export function RsvpModals({ open, onRequestClose }) {
  const idCounter = useRef(1);
  const [rows, setRows] = useState(() => [{ id: 1, nome: "", idade: "" }]);
  const [view, setView] = useState("form");
  const [rsvpAnimOpen, setRsvpAnimOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [noticeAnimOpen, setNoticeAnimOpen] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState("");
  const [noticeTitle, setNoticeTitle] = useState(NOTICE_TITLE_DEFAULT);
  const [submitLoading, setSubmitLoading] = useState(false);

  const resetForm = useCallback(() => {
    idCounter.current = 1;
    setRows([{ id: 1, nome: "", idade: "" }]);
    setView("form");
    setSubmitLoading(false);
  }, []);

  useEffect(() => {
    if (!open) {
      setRsvpAnimOpen(false);
      return;
    }
    resetForm();
    const id = window.requestAnimationFrame(() => setRsvpAnimOpen(true));
    return () => window.cancelAnimationFrame(id);
  }, [open, resetForm]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      document.querySelector(".rsvp-nome")?.focus();
    }, 50);
    return () => window.clearTimeout(t);
  }, [open]);

  const closeRsvp = useCallback(() => {
    setRsvpAnimOpen(false);
    setSubmitLoading(false);
    window.setTimeout(() => {
      onRequestClose();
      resetForm();
    }, 280);
  }, [onRequestClose, resetForm]);

  const openNotice = useCallback((message, titleOpt) => {
    setNoticeMessage(message || "");
    setNoticeTitle(titleOpt && String(titleOpt).trim() ? String(titleOpt).trim() : NOTICE_TITLE_DEFAULT);
    setNoticeOpen(true);
    window.requestAnimationFrame(() => setNoticeAnimOpen(true));
    window.setTimeout(() => {
      const ok = document.getElementById("rsvp-notice-ok");
      ok?.focus();
    }, 80);
  }, []);

  const closeNotice = useCallback(() => {
    setNoticeAnimOpen(false);
    window.setTimeout(() => setNoticeOpen(false), 280);
  }, []);

  const updateRow = (index, field, value) => {
    setRows((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addRow = () => {
    const newId = ++idCounter.current;
    setRows((prev) => [...prev, { id: newId, nome: "", idade: "" }]);
    window.requestAnimationFrame(() => {
      const inputs = document.querySelectorAll(".rsvp-nome");
      inputs[inputs.length - 1]?.focus();
    });
  };

  const onSubmit = () => {
    const r = analyzeRows(rows);
    if (r.partial) {
      openNotice(RSVP_VALIDATION_MESSAGE);
      return;
    }
    if (r.complete.length === 0) {
      closeRsvp();
      return;
    }
    if (!RSVP_SUBMIT_URL) {
      openNotice(RSVP_CONFIG_MESSAGE);
      return;
    }
    setSubmitLoading(true);
    submitRsvpViaForm(RSVP_SUBMIT_URL, r.complete, {
      onOk: () => {
        setSubmitLoading(false);
        setView("success");
      },
      onErr: () => {
        setSubmitLoading(false);
        openNotice(RSVP_ERROR_MESSAGE);
      },
    });
  };

  if (!open) return null;

  return (
    <>
      <div
        className={`rsvp-modal${rsvpAnimOpen ? " rsvp-modal--open" : ""}`}
        id="rsvp-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rsvp-modal-title"
        aria-hidden="false"
      >
        <div className="rsvp-modal__panel" id="rsvp-modal-panel" tabIndex={-1} onClick={(e) => e.stopPropagation()}>
          {view === "form" ? (
            <>
              <div className="rsvp-modal__header" id="rsvp-modal-header">
                <h2 className="rsvp-modal__title" id="rsvp-modal-title">
                  <span aria-hidden="true">🦋</span> Confirmar presença
                </h2>
                <button type="button" className="rsvp-modal__close" id="rsvp-close-btn" aria-label="Fechar" onClick={closeRsvp}>
                  ×
                </button>
              </div>
              <div className="rsvp-modal__body" id="rsvp-modal-body">
                <div className="rsvp-modal__rows" id="rsvp-rows" aria-live="polite">
                  {rows.map((row, index) => {
                    const isLast = index === rows.length - 1;
                    return (
                      <div key={row.id} className="rsvp-row">
                        <div className="rsvp-field rsvp-field--nome">
                          <label className="rsvp-field__label" htmlFor={`rsvp-nome-${row.id}`}>
                            Nome
                          </label>
                          <input
                            type="text"
                            className="rsvp-field__input rsvp-nome"
                            id={`rsvp-nome-${row.id}`}
                            autoComplete="name"
                            placeholder="Digite seu nome completo aqui"
                            maxLength={120}
                            value={row.nome}
                            onChange={(e) => updateRow(index, "nome", e.target.value)}
                          />
                        </div>
                        <div className="rsvp-field rsvp-field--idade">
                          <label className="rsvp-field__label" htmlFor={`rsvp-idade-${row.id}`}>
                            Idade
                          </label>
                          <input
                            type="number"
                            className="rsvp-field__input rsvp-idade"
                            id={`rsvp-idade-${row.id}`}
                            autoComplete="off"
                            placeholder="21"
                            min={0}
                            max={99}
                            step={1}
                            value={row.idade}
                            onChange={(e) => updateRow(index, "idade", e.target.value)}
                          />
                        </div>
                        <button
                          type="button"
                          className={`rsvp-add${isLast ? "" : " rsvp-add--hidden"}`}
                          aria-label="Adicionar pessoa"
                          onClick={() => addRow()}
                        >
                          +
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rsvp-modal__footer" id="rsvp-modal-footer">
                <p className="rsvp-footer__hint">Adicione todos os convidados no +, independente da idade.</p>
                <button
                  type="button"
                  className={`rsvp-submit rsvp-submit--primary${submitLoading ? " rsvp-submit--loading" : ""}`}
                  id="rsvp-submit-btn"
                  aria-busy={submitLoading ? "true" : "false"}
                  disabled={submitLoading}
                  onClick={onSubmit}
                >
                  <span className="rsvp-submit__inner">
                    <span className="rsvp-spinner" id="rsvp-submit-spinner" hidden={!submitLoading} aria-hidden="true" />
                    <span id="rsvp-submit-label">{submitLoading ? "Enviando…" : "Enviar"}</span>
                  </span>
                </button>
              </div>
            </>
          ) : (
            <div className="rsvp-success" id="rsvp-success">
              <p className="rsvp-success__text" id="rsvp-success-text">
                Agradecemos a confirmação!
                <br />
                Até o grande dia ✨
              </p>
              <button type="button" className="rsvp-ok" id="rsvp-ok-btn" onClick={closeRsvp}>
                OK
              </button>
            </div>
          )}
        </div>
      </div>

      {noticeOpen ? (
        <div
          className={`rsvp-modal rsvp-modal--stack${noticeAnimOpen ? " rsvp-modal--open" : ""}`}
          id="rsvp-notice-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rsvp-notice-title"
          aria-hidden="false"
        >
          <div className="rsvp-modal__panel" id="rsvp-notice-panel" tabIndex={-1} onClick={(e) => e.stopPropagation()}>
            <div className="rsvp-modal__header">
              <h2 className="rsvp-modal__title" id="rsvp-notice-title">
                {noticeTitle}
              </h2>
              <button type="button" className="rsvp-modal__close" id="rsvp-notice-close" aria-label="Fechar" onClick={closeNotice}>
                ×
              </button>
            </div>
            <div className="rsvp-modal__body">
              <p className="rsvp-notice__msg" id="rsvp-notice-msg">
                {noticeMessage}
              </p>
            </div>
            <div className="rsvp-modal__footer">
              <button type="button" className="rsvp-notice-ok" id="rsvp-notice-ok" onClick={closeNotice}>
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
