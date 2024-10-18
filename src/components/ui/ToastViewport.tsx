// src/components/ui/ToastViewport.tsx

'use client'

import * as Toast from '@radix-ui/react-toast'

export function ToastViewport() {
    return (
        <Toast.Viewport className="fixed bottom-0 right-0 p-16 flex flex-col gap-2 w-96 max-w-full m-0 list-none z-50 outline-none" />
    )
}