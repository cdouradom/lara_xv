import { useCallback, useEffect, useRef, useState } from "react";
import AOS from "aos";
import { InviteCurtain } from "./components/InviteCurtain.jsx";
import { InviteReveal } from "./components/InviteReveal.jsx";
import { RsvpModals } from "./components/RsvpModals.jsx";

export default function App() {
  const [revealed, setRevealed] = useState(false);
  const [curtainLeaving, setCurtainLeaving] = useState(false);
  const [curtainDone, setCurtainDone] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const aosStarted = useRef(false);
  const inviteScrollBound = useRef(false);

  const bindInviteScrollForAOS = useCallback(() => {
    if (inviteScrollBound.current) return;
    const mainEl = document.getElementById("invite-main");
    if (!mainEl) return;
    inviteScrollBound.current = true;
    mainEl.addEventListener(
      "scroll",
      () => {
        AOS.refresh();
      },
      { passive: true },
    );
  }, []);

  const startAOS = useCallback(() => {
    if (aosStarted.current) {
      AOS.refresh();
      return;
    }
    aosStarted.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      AOS.init({ disable: true });
    } else {
      AOS.init({ duration: 850, once: true, offset: 20, easing: "ease-out-cubic" });
    }
    bindInviteScrollForAOS();
  }, [bindInviteScrollForAOS]);

  const openInvite = useCallback(() => {
    setRevealed(true);
    startAOS();
    window.setTimeout(() => {
      AOS.refresh();
    }, 100);
    const mainEl = document.getElementById("invite-main");
    if (mainEl && document.activeElement !== mainEl) {
      try {
        mainEl.focus({ preventScroll: true });
      } catch {
        mainEl.focus();
      }
    }
  }, [startAOS]);

  const handleCurtainEnter = useCallback(() => {
    if (curtainLeaving) return;
    setCurtainLeaving(true);
    window.setTimeout(() => {
      openInvite();
    }, 280);
    window.setTimeout(() => {
      setCurtainDone(true);
    }, 820);
  }, [curtainLeaving, openInvite]);

  return (
    <>
      <InviteReveal revealed={revealed} ariaHidden={!revealed} onOpenRsvp={() => setRsvpOpen(true)} />
      <InviteCurtain onEnter={handleCurtainEnter} leaving={curtainLeaving} done={curtainDone} />
      <RsvpModals open={rsvpOpen} onRequestClose={() => setRsvpOpen(false)} />
    </>
  );
}
