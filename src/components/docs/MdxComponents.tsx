import React from 'react'
import { Link } from '@tanstack/react-router'

interface CustomLinkProps {
  href: string
  children: React.ReactNode
}

const CustomLink = ({ href, children }: CustomLinkProps) => {
  const isInternalLink = href && href.startsWith('/')

  if (isInternalLink) {
    return <Link to={href}>{children}</Link>
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

interface CodeBlockProps {
  children: string
  className?: string
}

const CodeBlock = ({ children, className }: CodeBlockProps) => {
  const language = className?.replace('language-', '')

  return (
    <pre className={`${className} p-4 rounded-lg overflow-x-auto`}>
      <code>{children}</code>
    </pre>
  )
}

export const mdxComponents = {
  a: CustomLink,
  code: CodeBlock,
  // Añade más componentes personalizados aquí según sea necesario
  h1: (props: any) => (
    <h1 className="text-4xl font-bold mb-8" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-semibold mt-12 mb-6" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-semibold mt-8 mb-4" {...props} />
  ),
  p: (props: any) => (
    <p className="mb-4 leading-7" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-6 mb-4" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal pl-6 mb-4" {...props} />
  ),
  li: (props: any) => (
    <li className="mb-2" {...props} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
  ),
  td: (props: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" {...props} />
  ),
}
