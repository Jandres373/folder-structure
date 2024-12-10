import { LandingFooter } from "../components/footer"
import { LandingHero } from "../components/hero"
import { LandingNavbar } from "../components/navbar"

function LandingPage() {
    return (
        <div className="w-[100dvw] h-[100dvh]">
            <LandingNavbar />
            <LandingHero />
            <LandingFooter />
        </div>
    )
}

export default LandingPage