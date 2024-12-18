import { LandingFooter } from "@/features/footer/components/footer"
import { LandingHero } from "@/features/landing/components/hero"
import { LandingNavbar } from "@/features/navbar/components/navbar"

function Root() {
    return (
        <div className="w-[100dvw] h-[100dvh]">
            <LandingNavbar />
            <LandingHero />
            <LandingFooter />
        </div>
    )
}

export default Root

