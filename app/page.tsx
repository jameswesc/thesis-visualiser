import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="p-8 max-w-2xl prose prose-blue">
            <h1>Thesis Visualiser</h1>

            <p>
                This site is being built by me to support my Master's thesis.
                Please do not share further without permission. Please email me
                at{" "}
                <a href="mailto:james.gregory@utas.edu.au">
                    james.gregory@utas.edu.au
                </a>{" "}
                if you have any questions.
            </p>
            <p className="p-4 bg-amber-100 border border-amber-200 rounded-md">
                🚧 <b>This site is under active development.</b>
                <br />
                🛜{" "}
                <b>
                    Viewing a plot fetches ~10MB of data and can take a while.
                </b>
            </p>
            <h2>Pages</h2>
            <h3>Plot Viewer</h3>
            <p>
                The <Link href="/plot">plot viewer</Link> shows the point cloud
                and metrics for each individual plot. Check out some of the
                super tall trees at{" "}
                <Link href="/plot?id=AGG_O_01_P5">AGG_O_01_P5</Link>, the clear
                midstorey in{" "}
                <Link href="/plot?id=NRM_O_19_P3">NRM_O_19_P3</Link>, or bare
                mid- and understorey in{" "}
                <Link href="/plot?id=PPO_Y_07_P3">PPO_Y_07_P3</Link>.
            </p>
            <h3>Metrics</h3>
            <p>
                Metrics can be viewed grouped <Link href="/site">by site</Link>{" "}
                or by <Link href="/site-type">site type</Link>. Currently,
                metrics are just those created by{" "}
                <a href="https://github.com/r-lidar/lidR/wiki/stdmetrics">
                    lidR's stdmetrics
                </a>
                . Metrics shown will be changing a lot.
            </p>
            <h2>Site Types</h2>
            <AspectRatio ratio={1}>
                <Image
                    src="/land-classes.png"
                    alt="Chart showing land classes (site types)"
                    fill
                />
            </AspectRatio>
            <h2>Technologies</h2>
            <ul>
                <li>
                    Point clouds are being visualised with{" "}
                    <a href="https://threejs.org/">Three.js</a>.
                </li>
                <li>
                    Point clouds are stored and loaded as parquet files because
                    I couldn't find an easy to use LAS/LAZ/COPC loader for the
                    web.
                </li>
                <li>
                    Charts are created with{" "}
                    <a href="https://observablehq.com/plot/">Observable Plot</a>
                </li>
                <li>
                    This website is using{" "}
                    <a href="https://nextjs.org/">Next.js</a> hosted on{" "}
                    <a href="https://vercel.com/">Vercel</a>.
                </li>
            </ul>
        </div>
    );
}
