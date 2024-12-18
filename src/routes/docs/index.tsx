import DocsPage from '@/pages/docs/DocsPage'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (<DocsPage />)
}
