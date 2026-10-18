"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";
import { navLinks } from "./nav-links";

/** Menu button and panel below 900px. Wider screens show the links inline. */
export function MobileMenu({
  registerHref,
  basePath = "",
}: {
  registerHref: string;
  basePath?: "" | "/";
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="min-[900px]:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex size-[46px] items-center justify-center rounded-full border-[1.5px] border-mist-300 bg-white text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
      >
        {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
      </button>
      <nav
        id={panelId}
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 border-b border-mist-200 bg-white px-5 pt-2 pb-6 shadow-[0_24px_48px_-28px_rgba(15,42,29,0.45)]"
      >
        <ul className="flex flex-col">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={`${basePath}${link.href}`}
                onClick={close}
                className="block border-b border-mist-200 py-4 text-lg font-medium text-ink-900"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={registerHref}
          onClick={close}
          className="mt-5 flex min-h-12 items-center justify-center rounded-full border-[1.5px] border-brand-300 px-5 font-semibold text-brand-900"
        >
          Register your organisation
        </a>
      </nav>
    </div>
  );
}
