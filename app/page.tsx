import { EmissionsOverviewWidget } from "@/src/widgets/emissions-overview/emissions-overview-widget";

export default function Home() {
  return (
    <main className="min-h-full flex-1 bg-zinc-50 dark:bg-zinc-950">
      <EmissionsOverviewWidget />
    </main>
  );
}
