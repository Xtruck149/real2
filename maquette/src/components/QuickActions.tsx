"use client";

import { useRef } from "react";
import { ICONS, Icon } from "./Illustrations";

type Props = {
  whatsapp: string | null;
  whatsappMessage: string;
  tel: string | null;
  name: string;
};

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

const FLOAT = "grid h-14 w-14 place-items-center rounded-full border-[2.5px] border-ink shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";

/**
 * Floating contact buttons above the dock. Without a confirmed WhatsApp number the button explains the
 * situation instead of opening a chat with anyone. A call button appears only once a number is confirmed.
 */
export function QuickActions({ whatsapp, whatsappMessage, tel, name }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const waHref = whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}` : null;

  const whatsappProps = waHref
    ? { href: waHref, target: "_blank", rel: "noopener noreferrer" }
    : { href: "#whatsapp-demo", onClick: (e: React.MouseEvent) => { e.preventDefault(); dialogRef.current?.showModal(); } };

  return (
    <>
      <div className="fixed bottom-24 right-4 z-30 flex flex-col gap-3 md:bottom-28 md:right-6">
        {tel ? (
          <a href={tel} aria-label="Appeler le restaurant" className={`${FLOAT} bg-sun text-ink`}>
            <Icon d={ICONS.phone} />
          </a>
        ) : null}
        <a
          {...whatsappProps}
          data-testid="whatsapp"
          aria-label={waHref ? "Écrire sur WhatsApp (nouvel onglet)" : "WhatsApp (non configuré dans la démonstration)"}
          className={`${FLOAT} bg-[#25d366] text-[#0b2e17]`}
        >
          <WhatsAppIcon />
        </a>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="whatsapp-demo-title"
        className="m-auto w-[min(92vw,28rem)] rounded-2xl border-[3px] border-ink bg-surface p-6 text-ink shadow-[6px_6px_0_var(--color-ink)] backdrop:bg-ink/80"
      >
        <h2 id="whatsapp-demo-title" className="text-2xl">WhatsApp : démonstration</h2>
        <p className="mt-3 text-muted">
          Dans la version finale, ce bouton ouvrira une conversation WhatsApp avec {name}, avec un message pré-rempli. Le numéro
          sera configuré uniquement après validation par l&apos;établissement.
        </p>
        <form method="dialog" className="mt-6 text-right">
          <button className="btn btn-primary" autoFocus>
            J&apos;ai compris
          </button>
        </form>
      </dialog>
    </>
  );
}
