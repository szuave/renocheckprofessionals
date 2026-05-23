"use client";

import { useState, useTransition } from "react";

export function DeletePostButton({
  postId,
  action,
  label,
  confirmText,
}: {
  postId: string;
  action: (formData: FormData) => Promise<void>;
  label: string;
  confirmText: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  function handleClick() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    const fd = new FormData();
    fd.set("id", postId);
    startTransition(() => action(fd));
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-full border border-ink-hair/70 bg-white/60 px-5 py-3 text-[14px] font-medium text-ink transition-colors hover:border-red-700/60 hover:text-red-800 disabled:opacity-60"
      >
        {isPending
          ? "Bezig met verwijderen…"
          : confirming
            ? confirmText
            : label}
      </button>
      {confirming && !isPending ? (
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-[14px] text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          Annuleren
        </button>
      ) : null}
    </div>
  );
}
