import { Error } from '@/components/fallbacks/Error'
import { NotFound } from '@/components/fallbacks/NotFound'
import { ScrollArea } from '@/components/ui/scroll-area'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
    notFoundComponent: NotFound,
    errorComponent: Error,
    component: () => (
        <div className='w-[100dvw] h-[100dvh] overflow-hidden'>
            <ScrollArea className='w-full h-full'>
                <Outlet />
            </ScrollArea>
            <TanStackRouterDevtools />
        </div>
    ),
})