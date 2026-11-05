import { createFileRoute } from "@tanstack/react-router";
import { ArchitectApp } from "@/components/architect/architect-app";

export const Route = createFileRoute("/architect")({ component: ArchitectPage });

function ArchitectPage() {
  return <ArchitectApp />;
}
