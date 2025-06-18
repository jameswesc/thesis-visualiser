import { PlotHistogram } from "@/components/plot/plot-historgram";
import { PlotRenderer } from "@/components/plot/plot-renderer";
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
    <div className="px-8 py-4 grid gap-4 lg:grid-cols-2 grid-cols-1">
      <AspectRatio ratio={4 / 3} className="bg-gray-100 rounded-2xl col-span-1">
        <Suspense>
          <PlotRenderer plotId={plot_id} data={plotData} />
        </Suspense>
      </AspectRatio>
      <div className="col-span-1">
        <Suspense>
          <PlotHistogram plotId={plot_id} data={plotData} />
        </Suspense>
      </div>
    </div>
  );
}
