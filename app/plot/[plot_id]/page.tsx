import { PlotRenderer } from "@/components/plot-renderer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { fetchPlotData } from "@/lib/fetch-plot";

export default async function Page({
  params,
}: {
  params: Promise<{ plot_id: string }>;
}) {
  const { plot_id } = await params;
  const plotData = await fetchPlotData(plot_id);

  return (
    <div className="p-8">
      <AspectRatio ratio={16 / 9} className="bg-gray-100 rounded-2xl">
        <PlotRenderer plotId={plot_id} data={plotData} />
      </AspectRatio>
    </div>
  );
}
