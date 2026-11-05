import { createFileRoute } from "@tanstack/react-router";
import { SprintApp } from "@/components/offer/sprint-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <SprintApp />;
}
