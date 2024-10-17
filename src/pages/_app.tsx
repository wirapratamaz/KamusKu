// src/pages/_app.tsx

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import PWAInstallPrompt from "@/components/PWAInstall";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            {/* Render the PWA Install Prompt globally */}
            <PWAInstallPrompt />
            <Component {...pageProps} />
            <Footer />
        </>
    );
}