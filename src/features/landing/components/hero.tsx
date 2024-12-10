import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"

export function LandingHero() {
    return (
        <section className="flex items-center justify-center min-h-screen bg-white text-gray-800 shadow-lg">
            <div className="text-center p-6">
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                    Estructura de carpetas Bairu <br className="hidden sm:inline" />
                    vite - next.js
                </h1>
                <p className="mt-4 max-w-lg mx-auto text-lg md:text-xl">
                    Ejemplo práctico de organización de carpetas para proyectos de desarrollo web frontend con Next.js o Vite.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                    <Link to="/users" className={cn(buttonVariants({ variant: 'default' }))}>Ver demo</Link>
                    <Link to="/docs" className={cn(buttonVariants({ variant: 'outline' }))}>Ver documentación</Link>
                </div>
            </div>
        </section>
    )
}