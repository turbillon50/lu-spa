export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="app-shell flex min-h-[100dvh] flex-col">
      {children}
    </main>
  )
}
