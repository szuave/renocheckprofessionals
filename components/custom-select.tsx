"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type CustomSelectOption = {
  value: string;
  label: string;
};

export function CustomSelect({
  name,
  label,
  options,
  initial,
  placeholder,
  required,
}: {
  name: string;
  label: string;
  options: CustomSelectOption[];
  initial?: string;
  placeholder?: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>(initial ?? "");
  const [focusIndex, setFocusIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const labelId = useId();
  const buttonId = useId();

  const selected = options.find((o) => o.value === value);
  const displayLabel = selected?.label ?? placeholder ?? "Selecteer…";

  useEffect(() => {
    if (!open) return;
    function handlePointer(e: MouseEvent | TouchEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("touchstart", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("touchstart", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  function pick(v: string) {
    setValue(v);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        const idx = options.findIndex((o) => o.value === value);
        setFocusIndex(idx === -1 ? 0 : idx);
      } else {
        setFocusIndex((i) => (i + 1) % options.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        const idx = options.findIndex((o) => o.value === value);
        setFocusIndex(idx === -1 ? 0 : idx);
      } else {
        setFocusIndex((i) => (i - 1 + options.length) % options.length);
      }
    } else if (e.key === "Enter" || e.key === " ") {
      if (open) {
        e.preventDefault();
        pick(options[focusIndex].value);
      }
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />

      <label
        id={labelId}
        htmlFor={buttonId}
        className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted"
      >
        {label}
        {required ? <span className="ml-1 text-sage">*</span> : null}
      </label>

      <button
        id={buttonId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={cn(
          "mt-2 flex w-full items-center justify-between gap-3 border-0 border-b bg-transparent px-0 py-1.5 text-left font-sans text-[14px] transition-colors focus:outline-none",
          open ? "border-ink" : "border-ink-hair hover:border-ink/40",
          selected ? "text-ink" : "text-ink-muted",
        )}
      >
        <span className="truncate">{displayLabel}</span>
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex h-5 w-5 shrink-0 items-center justify-center text-ink-muted transition-transform duration-200",
            open ? "rotate-180" : "",
          )}
        >
          <svg
            viewBox="0 0 12 8"
            className="h-2.5 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 1.5l5 5 5-5" />
          </svg>
        </span>
      </button>

      {open ? (
        <div
          role="listbox"
          aria-labelledby={labelId}
          className="absolute left-0 right-0 top-full z-30 mt-3 overflow-hidden rounded-2xl border border-ink-hair/70 bg-white shadow-[0_12px_40px_-12px_rgba(15,23,20,0.15)]"
        >
          <ul className="max-h-[260px] overflow-y-auto py-2">
            {options.map((o, i) => {
              const isSelected = o.value === value;
              const isFocused = i === focusIndex;
              return (
                <li key={`${o.value}-${i}`}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setFocusIndex(i)}
                    onClick={() => pick(o.value)}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left font-sans text-[14px] transition-colors",
                      isFocused ? "bg-surface-soft" : "bg-transparent",
                      isSelected ? "text-ink" : "text-ink-soft",
                    )}
                  >
                    <span className="truncate">{o.label}</span>
                    {isSelected ? (
                      <span
                        aria-hidden="true"
                        className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-sage"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 8l3.5 3.5L13 5" />
                        </svg>
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
