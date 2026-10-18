"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";
import { navLinks } from "./nav-links";

/** Menu button and panel for narrow screens (below `md`). Desktop shows the links inline. */
export function MobileMenu({ registerHref }: { registerHref: string }) {
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
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex size-12 items-center justify-center rounded-full border-[1.5px] border-sand-100/45 text-sand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
      >
        {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
      </button>
      <nav
        id={panelId}
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 border-t border-sand-100/15 bg-brand-900 px-5 pt-2 pb-6 shadow-xl"
      >
        <ul className="flex flex-col">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={close}
                className="block border-b border-sand-100/10 py-4 text-lg font-medium text-sand-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={registerHref}
          onClick={close}
          className="mt-5 flex min-h-12 items-center justify-center rounded-full bg-sand-100 px-5 font-semibold text-brand-900"
        >
          Register your organisation
        </a>
      </nav>
    </div>
  );
}
