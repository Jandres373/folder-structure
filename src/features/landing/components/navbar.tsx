import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"

export function LandingNavbar() {
    return (
        <nav className="w-full px-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link to="/" className="mr-6 flex items-center space-x-2" href="/">
                        <span className="hidden font-bold sm:inline-block">Bairu</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link to="/docs"> Docs </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                    </div>
                    <nav className="flex items-center gap-2">
                        <Link to="/auth/login" className={cn(buttonVariants({ variant: 'default' }))}>Iniciar sesión</Link>
                        <Link to="/auth/register" className={cn(buttonVariants({ variant: 'default' }))}>Registrarse</Link>
                    </nav>
                </div>
            </div>
        </nav>
    )
}