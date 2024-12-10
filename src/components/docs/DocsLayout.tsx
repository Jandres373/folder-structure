import React from 'react'
import { Link } from '@tanstack/react-router'

interface DocsSidebarItem {
  title: string
  href: string
}

const sidebarItems: DocsSidebarItem[] = [
  { title: 'Introducción', href: '/docs/introduction' },
  { title: 'Primeros Pasos', href: '/docs/getting-started' },
  { title: 'Arquitectura', href: '/docs/architecture' },
  { title: 'Guía de Desarrollo', href: '/docs/development-guide' },
  { title: 'API Reference', href: '/docs/api-reference' },
  { title: 'Guía de Estilo', href: '/docs/style-guide' },
  { title: 'Despliegue', href: '/docs/deployment' },
]

interface DocsLayoutProps {
  children: React.ReactNode
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-50 dark:bg-gray-900 p-6">
        <nav className="space-y-1">
          <div className="mb-4">
            <Link
              to="/docs"
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              Documentación
            </Link>
          </div>
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 max-w-4xl mx-auto prose dark:prose-invert">
        {children}
      </main>
    </div>
  )
}
