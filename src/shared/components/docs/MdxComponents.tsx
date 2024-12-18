import React from 'react'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { Check, Copy, ExternalLink } from 'lucide-react'
import type { AnchorHTMLAttributes, DetailedHTMLProps, HTMLAttributes, ImgHTMLAttributes } from 'react'

type CustomLinkProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

const CustomLink: React.FC<CustomLinkProps> = ({ href = '#', children, className, ...props }) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  const linkClasses = cn(
    'inline-flex items-center gap-1.5',
    'font-medium transition-colors duration-200',
    'text-blue-600 hover:text-blue-800',
    'dark:text-blue-400 dark:hover:text-blue-300',
    'underline-offset-4 hover:underline',
    className
  )

  if (isInternalLink) {
    return (
      <Link to={href} className={linkClasses}>
        {children}
      </Link>
    )
  }

  if (isAnchorLink) {
    return (
      <a href={href} className={linkClasses} {...props}>
        {children}
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClasses}
      {...props}
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
    </a>
  )
}

const Pre = ({ children, ...props }: HTMLAttributes<HTMLPreElement>) => {
  const [copied, setCopied] = React.useState(false)

  const onCopy = async () => {
    if (typeof children === 'string') {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="relative group">
      <pre
        className="mt-4 overflow-x-auto rounded-lg bg-gray-100 py-4 px-4 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={onCopy}
        className={cn(
          "absolute right-4 top-4 hidden h-8 w-8 items-center justify-center",
          "rounded-md border border-gray-200 bg-white/80 backdrop-blur",
          "text-gray-600 transition-colors duration-200",
          "hover:bg-gray-100 hover:text-gray-900",
          "dark:border-gray-700 dark:bg-gray-800/80",
          "dark:text-gray-400 dark:hover:bg-gray-700/80 dark:hover:text-gray-200",
          "group-hover:flex"
        )}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )
}

export const mdxComponents = {
  a: CustomLink,
  pre: Pre,
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20",
        "text-4xl font-bold tracking-tight",
        "text-gray-900 dark:text-gray-50",
        "lg:text-5xl"
      )}
      {...props}
    />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 pb-2 first:mt-0",
        "text-3xl font-semibold tracking-tight",
        "text-gray-900 dark:text-gray-50",
        "border-b border-gray-200 dark:border-gray-800"
      )}
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20",
        "text-2xl font-semibold tracking-tight",
        "text-gray-900 dark:text-gray-50"
      )}
      {...props}
    />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20",
        "text-xl font-semibold tracking-tight",
        "text-gray-900 dark:text-gray-50"
      )}
      {...props}
    />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6",
        "text-gray-700 dark:text-gray-300"
      )}
      {...props}
    />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn(
        "my-6 ml-6 list-disc",
        "text-gray-700 dark:text-gray-300",
        "[&>li]:mt-2"
      )}
      {...props}
    />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        "my-6 ml-6 list-decimal",
        "text-gray-700 dark:text-gray-300",
        "[&>li]:mt-2"
      )}
      {...props}
    />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className="text-gray-700 dark:text-gray-300" {...props} />
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-4 pl-6 italic",
        "border-gray-300 dark:border-gray-700",
        "text-gray-800 dark:text-gray-200"
      )}
      {...props}
    />
  ),
  img: (props: ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      className={cn(
        "rounded-lg border bg-white",
        "border-gray-200 dark:border-gray-800",
        "transition-colors duration-200"
      )}
      loading="lazy"
      alt={props.alt || ""}
      {...props}
    />
  ),
  hr: (props: HTMLAttributes<HTMLHRElement>) => (
    <hr
      className="my-8 border-gray-200 dark:border-gray-800 transition-colors duration-200"
      {...props}
    />
  ),
  table: (props: HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table
        className={cn(
          "w-full border-collapse text-sm",
          "text-gray-700 dark:text-gray-300"
        )}
        {...props}
      />
    </div>
  ),
  tr: (props: HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "m-0 border-b p-0 transition-colors duration-200",
        "border-gray-200 dark:border-gray-800",
        "even:bg-gray-50 dark:even:bg-gray-900"
      )}
      {...props}
    />
  ),
  th: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold",
        "border-gray-200 dark:border-gray-800",
        "text-gray-900 dark:text-gray-100"
      )}
      {...props}
    />
  ),
  td: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border px-4 py-2 text-left",
        "border-gray-200 dark:border-gray-800",
        "text-gray-700 dark:text-gray-300"
      )}
      {...props}
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded px-[0.3rem] py-[0.2rem]",
        "font-mono text-sm font-semibold",
        "text-gray-900 dark:text-gray-100"
      )}
      {...props}
    />
  ),
}

export default mdxComponents
