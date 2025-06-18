import { PlotRenderer } from "@/components/plot-renderer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { fetchPlotData } from "@/lib/fetch-plot";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ plot_id: string }>;
}) {
  const { plot_id } = await params;
  const plotData = fetchPlotData(plot_id);

  return (
    <div className="p-8">
      <AspectRatio ratio={4 / 3} className="bg-gray-100 rounded-2xl">
        <Suspense>
          <PlotRenderer plotId={plot_id} data={plotData} />
        </Suspense>
      </AspectRatio>
    </div>
  );
}
