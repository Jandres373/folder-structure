import MDXProvider from '@/shared/components/providers/MDXProvider'

import { FC, Suspense } from 'react'
import { contentMap } from '@/features/docs_/docs_content/constants/content.map'
import { DocId } from '@/features/docs_/docs_content/types/mdx_docs.types'

interface SingleDocPageProps {
  docId: DocId
}

const SingleDocPage: FC<SingleDocPageProps> = ({ docId }) => {
  const Content = contentMap[docId]

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <MDXProvider>
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-pulse">Loading documentation...</div>
              </div>
            }
          >
            <Content />
          </Suspense>
        </MDXProvider>
      </article>
    </div>
  )
}

export default SingleDocPage