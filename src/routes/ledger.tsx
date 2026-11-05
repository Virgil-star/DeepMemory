import { createFileRoute } from "@tanstack/react-router";
import { MemoryApp } from "@/components/memory/memory-app";

export const Route = createFileRoute("/ledger")({ component: Ledger });

function Ledger() {
  return <MemoryApp />;
}
