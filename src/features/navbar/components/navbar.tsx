import { Link } from "@tanstack/react-router"

export function LandingNavbar() {
    return (
        <nav className="w-full px-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center">
                <nav className="mr-4 hidden md:flex">
                    <Link to="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">Bairu</span>
                    </Link>
                    <Link to="/docs" className="mr-6 flex items-center space-x-2">
                        <span className="hidden sm:inline-block">docs</span>
                    </Link>
                </nav>
            </div>
        </nav>
    )
}