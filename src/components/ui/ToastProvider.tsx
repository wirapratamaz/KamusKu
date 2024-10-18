// src/components/ui/ToastProvider.tsx

'use client'

import * as React from 'react'
import { ToastProvider as RadixToastProvider } from '@radix-ui/react-toast'
import { ToastViewport } from './ToastViewport'

export function ToastProvider({ children }: { children: React.ReactNode }) {
    return (
        <RadixToastProvider duration={5000}>
            {children}
            <ToastViewport />
        </RadixToastProvider>
    )
}