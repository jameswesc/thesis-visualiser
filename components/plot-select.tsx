"use client";

import * as React from "react";
import plots from "@/lib/plots.json";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { groups } from "d3";

const plotsByTypeBySite = groups(
  plots,
  (d) => d.site_type,
  (d) => d.site,
);

export function PlotSelect() {
  const { plot_id } = useParams<{ plot_id: string }>();
  const router = useRouter();

  return (
    <Select
      value={plot_id}
      onValueChange={(sitePlotId) => router.push(`/plot/${sitePlotId}`)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a plot" />
      </SelectTrigger>
      <SelectContent>
        {plotsByTypeBySite.map(([siteType, plotsBySite]) => (
          <SelectGroup key={siteType}>
            <SelectLabel className="font-bold mt-2">{siteType}</SelectLabel>
            {plotsBySite.map(([site, plots]) => (
              <SelectGroup key={site}>
                <SelectLabel>{site}</SelectLabel>
                {plots.map((p) => (
                  <SelectItem value={p.site_plot_id} key={p.fid}>
                    {p.site_plot_id}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
