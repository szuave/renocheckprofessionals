"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Subject = "membership" | "videocall" | "question" | "other";

const OPTIONS: { value: Subject; label: string }[] = [
  { value: "membership", label: "Ik wil aansluiten als partner" },
  { value: "videocall", label: "Plan een videocall voor een kennismaking" },
  { value: "question", label: "Algemene vraag" },
  { value: "other", label: "Iets anders" },
];

export function SubjectDropdown({ initial }: { initial: Subject }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Subject>(initial);
  const [focusIndex, setFocusIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const labelId = useId();
  const buttonId = useId();

  const selected = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0];

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

  function pick(v: Subject) {
    setValue(v);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setFocusIndex(OPTIONS.findIndex((o) => o.value === value));
      } else {
        setFocusIndex((i) => (i + 1) % OPTIONS.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setFocusIndex(OPTIONS.findIndex((o) => o.value === value));
      } else {
        setFocusIndex((i) => (i - 1 + OPTIONS.length) % OPTIONS.length);
      }
    } else if (e.key === "Enter" || e.key === " ") {
      if (open) {
        e.preventDefault();
        pick(OPTIONS[focusIndex].value);
      }
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <input type="hidden" name="subject_type" value={value} />

      <label
        id={labelId}
        htmlFor={buttonId}
        className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted"
      >
        Onderwerp <span className="text-sage">*</span>
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
          "mt-3 flex w-full items-center justify-between gap-3 border-0 border-b bg-transparent px-0 py-2 text-left font-sans text-base text-ink transition-colors focus:outline-none",
          open ? "border-ink" : "border-ink-hair hover:border-ink/40",
        )}
      >
        <span className="truncate">{selected.label}</span>
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
          <ul className="py-2">
            {OPTIONS.map((o, i) => {
              const isSelected = o.value === value;
              const isFocused = i === focusIndex;
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setFocusIndex(i)}
                    onClick={() => pick(o.value)}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 px-5 py-3 text-left font-sans text-[15px] transition-colors",
                      isFocused ? "bg-surface-soft" : "bg-transparent",
                      isSelected ? "text-ink" : "text-ink-soft",
                    )}
                  >
                    <span>{o.label}</span>
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
