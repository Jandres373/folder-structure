import { DocId } from '@/features/docs_/docs_content/types/mdx_docs.types'
import SingleDocPage from '@/pages/docs/$docId/SingleDocPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/$docId/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { docId } = Route.useParams()
    return <SingleDocPage docId={docId as DocId} />
}
