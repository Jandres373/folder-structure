import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
    notFoundComponent: () => <div>crear un fallback</div>,
    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
})