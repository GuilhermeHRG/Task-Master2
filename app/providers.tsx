// app/providers.tsx
"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react"
import { AuthProvider } from "@/app/contexts/AuthContext"
import { AuthCheck } from "@/components/auth-check"
import { KanbanProvider } from "@/app/contexts/KanbanContext"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <AuthProvider>
          <AuthCheck>
            <KanbanProvider>{children}</KanbanProvider>
          </AuthCheck>
        </AuthProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
