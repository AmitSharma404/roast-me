import { ChevronsLeftRight, FileText } from "lucide-react"
import { Roasted } from "../Components/Roasted"
import { Dark } from "../Components/Dark"

export const Roast = () => {
    return (
        <div className="text-foreground bg-background min-h-screen w-full overflow-x-hidden">
            <Dark/>
            <div className="h-20 w-[800px] bg-foreground/30  rounded-[50%] blur-[100px] left-70 -top-5 fixed "></div>
                <Roasted/>
                <div className="sm:mx-10 my-6 py-10 px-4 bg-newbg rounded-lg flex flex-col items-center">
                    <div >
                        <h1 className=" text-4xl sm:text-5xl font-bold py-3">Example Roast</h1>
                        <p className="font-semibold text-sm sm:text-xl py-2 px-2">See how our AI roasts different types of content at various intensity levels.</p>
                    </div>
                    <div className="bg-foreground/20 my-10 px-2  rounded-lg py-2 flex items-center justify-center max-w-[480px] ">
                        <button className="sm:px-16 px-5 py-2 sm:py-3 focus:bg-background rounded-lg font-semibold text-lg cursor-pointer flex items-center justify-center gap-2"><FileText/>Resume</button>
                        <button className="sm:px-16 px-5 py-2 sm:py-3 focus:bg-background rounded-lg font-semibold text-lg  cursor-pointer flex items-center justify-center gap-2"><ChevronsLeftRight/>Projects</button>
                    </div>
                </div>


        </div>
    )
}