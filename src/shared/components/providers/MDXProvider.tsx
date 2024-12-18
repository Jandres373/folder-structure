import { FC, PropsWithChildren } from 'react'
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react'
import { mdxComponents } from '../docs/MdxComponents'

interface MDXProviderProps extends PropsWithChildren {
  components?: any
}

export const MDXProvider: FC<MDXProviderProps> = ({ children, components = mdxComponents }) => {
  return (
    <BaseMDXProvider components={components}>
      {children}
    </BaseMDXProvider>
  )
}

export default MDXProvider
