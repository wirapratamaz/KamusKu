// src/pages/_app.tsx
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastProvider } from '@/components/ui/ToastProvider'
import PWAInstallPrompt from "@/components/PWAInstall";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ToastProvider>
            <PWAInstallPrompt />
            <Component {...pageProps} />
        </ToastProvider>
    )
}