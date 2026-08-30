import { AppChrome } from '../components/AppChrome'
import { getSiteContent } from '../lib/site-content'

export const dynamic = 'force-dynamic'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent()
  return <AppChrome content={content}>{children}</AppChrome>
}
