import { Link } from "@tanstack/react-router";

const ITEMS = [
  { to: "/", label: "Sprint", id: "sprint" },
  { to: "/architect", label: "Architect", id: "architect" },
  { to: "/ledger", label: "Ledger", id: "ledger" },
] as const;

export function SkillNav({ current }: { current: (typeof ITEMS)[number]["id"] }) {
  return (
    <nav className="flex flex-wrap gap-x-4 gap-y-1">
      {ITEMS.filter((item) => item.id !== current).map((item) => (
        <Link
          key={item.id}
          to={item.to}
          className="inline-flex min-h-11 items-center text-sm text-muted hover:text-paper"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
