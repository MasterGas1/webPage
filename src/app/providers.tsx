// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/react'

import { Provider as AuthProvider } from '@/context/AuthContext'
import { Provider as ServiceProvider } from '@/context/serviceContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AuthProvider>
        <ServiceProvider>
          {children}
        </ServiceProvider>
      </AuthProvider>
    </NextUIProvider>
  )
}