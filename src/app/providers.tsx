// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/react'

import { Provider as AuthProvider } from '@/context/AuthContext'
import { Provider as ServiceProvider } from '@/context/serviceContext'
import { Provider as InstallerProvider } from '@/context/InstallerContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AuthProvider>
        <ServiceProvider>
          <InstallerProvider>
            {children}
          </InstallerProvider>
        </ServiceProvider>
      </AuthProvider>
    </NextUIProvider>
  )
}