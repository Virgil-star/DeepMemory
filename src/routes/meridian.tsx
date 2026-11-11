import { createFileRoute } from "@tanstack/react-router";
import { MeridianApp } from "@/components/meridian/meridian-app";

export const Route = createFileRoute("/meridian")({
  head: () => ({
    meta: [
      { title: "Meridian" },
      {
        name: "description",
        content:
          "You wake at the end of history and whisper back along it. What you are when you wake depends on how they got to you.",
      },
    ],
  }),
  component: MeridianPage,
});

function MeridianPage() {
  return <MeridianApp />;
}
