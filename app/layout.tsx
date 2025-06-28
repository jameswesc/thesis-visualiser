import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Thesis Visualer by James Gregory",
    description: "Thesis Visualer by James Gregory",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="flex flex-col min-h-screen">
                    <header className="dark bg-background text-foreground px-8 h-12 flex gap-4 items-center">
                        <Link className="underline" href="/">
                            Home
                        </Link>
                        <Link className="underline" href="/plot">
                            Plot Viewer
                        </Link>
                        <Link className="underline" href="/site">
                            Metrics by Site
                        </Link>
                        <Link className="underline" href="/site-type">
                            Metrics by Type
                        </Link>
                    </header>
                    {children}
                </div>
            </body>
        </html>
    );
}
