import { createLazyFileRoute } from '@tanstack/react-router'
import Root from '@/views/Root'

export const Route = createLazyFileRoute('/')({
    component: Root
})