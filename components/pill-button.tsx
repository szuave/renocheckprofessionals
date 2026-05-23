import Link from "next/link";
import { cn } from "@/lib/utils";

const pillClass =
  "group inline-flex cursor-pointer items-center gap-5 rounded-full bg-surface-soft py-2 pl-8 pr-2 text-[17px] text-ink ring-1 ring-ink/[0.08]";

type IconKind = "arrow" | "user";

function GlyphArrow() {
  return (
    <svg
      viewBox="0 0 16 10"
      className="h-[12px] w-[16px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 5h14M11 1l4 4-4 4" />
    </svg>
  );
}

function GlyphUser() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="8" cy="6" r="2.6" />
      <path d="M2.8 13.8a5.6 5.6 0 0 1 10.4 0" />
    </svg>
  );
}

function PillContent({
  children,
  icon = "arrow",
}: {
  children: React.ReactNode;
  icon?: IconKind;
}) {
  return (
    <>
      <span>{children}</span>
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors duration-300 group-hover:bg-sage">
        {icon === "user" ? <GlyphUser /> : <GlyphArrow />}
      </span>
    </>
  );
}

export function PillLink({
  href,
  children,
  className,
  icon,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  icon?: IconKind;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(pillClass, className)}
    >
      <PillContent icon={icon}>{children}</PillContent>
    </Link>
  );
}

export function PillButton({
  children,
  type = "submit",
  className,
  icon,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  icon?: IconKind;
}) {
  return (
    <button type={type} className={cn(pillClass, className)} {...props}>
      <PillContent icon={icon}>{children}</PillContent>
    </button>
  );
}
