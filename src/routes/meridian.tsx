import { createFileRoute, Link } from "@tanstack/react-router";
import { MeridianApp } from "@/components/meridian/meridian-app";
import { TITLE_LINK } from "@/components/meridian/title";

export const Route = createFileRoute("/meridian")({
  head: () => ({
    meta: [
      { title: "Meridian" },
      { name: "theme-color", content: "#000000" },
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
  return (
    <MeridianApp
      leave={
        <Link to="/" className={TITLE_LINK}>
          Leave
        </Link>
      }
    />
  );
}
