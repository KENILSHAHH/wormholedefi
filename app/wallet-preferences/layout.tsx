import type React from "react"
export default function WalletPreferencesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto py-8">{children}</main>
    </div>
  )
}

