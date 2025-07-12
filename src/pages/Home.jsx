import { CardSection } from "../Components/CardSection"
import { Dark } from "../Components/Dark"
import { Footer } from "../Components/Footer"
import { GetRoasted } from "../Components/GetRoasted"
import { Hero } from "../Components/Hero"
import { Navbar } from "../Components/Navbar"
import { Work } from "../Components/Work"

export const Home = () => {
    return (
        <div className="text-foreground bg-background min-h-screen w-full overflow-x-hidden">
            <Navbar/>
            <Dark/>
            <main>
                <Hero/>
                <CardSection/>
                <Work/>
                <GetRoasted/>
            </main>
            <Footer/>

        </div>
    )
}