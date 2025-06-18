import { PlotSelect } from "@/components/plot-select";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="dark bg-background text-foreground px-8 py-2 flex items-center">
        <span className="mr-4">Plot</span>
        <PlotSelect />
      </div>
      {children}
    </>
  );
}
