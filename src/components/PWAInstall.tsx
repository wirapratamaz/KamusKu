'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

// Define the interface for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[]
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export default function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
    const [showInstallPrompt, setShowInstallPrompt] = useState<boolean>(false)

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault()
            // Save the event so it can be triggered later.
            setDeferredPrompt(e as BeforeInstallPromptEvent)
            // Update UI to notify the user they can install the PWA
            setShowInstallPrompt(true)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        }
    }, [])

    const handleInstallClick = async () => {
        if (!deferredPrompt) return

        // Show the install prompt
        deferredPrompt.prompt()
        try {
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.userChoice
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt')
            } else {
                console.log('User dismissed the install prompt')
            }
        } catch (error) {
            console.error('Error during user choice:', error)
        }
        // Reset the deferred prompt
        setDeferredPrompt(null)
        setShowInstallPrompt(false)
    }

    if (!showInstallPrompt) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Install Kamus Bahasa Indonesia</h2>
                    <p className="text-sm text-muted-foreground">Tambahkan aplikasi ini ke layar utama Anda untuk akses cepat</p>
                </div>
                <Button onClick={handleInstallClick}>
                    Install
                </Button>
            </div>
        </div>
    )
}