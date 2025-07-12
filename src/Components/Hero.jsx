import { ChevronRight, Flame } from "lucide-react"

export const Hero = () => {
    return (
        <div className="flex items-center justify-between py-50 px-10 transition-all duration-300 ">
            <div className="h-20 w-[800px] bg-foreground/30  rounded-[50%] blur-[100px] left-70 -top-5 fixed z-0">
                
            </div>
            <div className="grid grid-cols-2 text-left gap-6 items-center">
                <div>
                    <h1 className="text-5xl font-bold text-foreground">Get Your Work Roasted With a Side of Wisdom</h1>
                    <p className="py-5 text-lg text-foreground/60">Upload your resume, GitHub repo, or portfolio and receive <br /> AI-generated roasts that are both hilarious and helpful.</p>
                    <div className="flex items-center gap-10">
                        <button className="flex items-center justify-center gap-1 px-3 py-3 bg-foreground text-background rounded-md font-semibold">
                            <Flame className="text-orange-500 "/> Start Roasting
                        </button>
                        <button className="flex items-center justify-center gap-2 group font-semibold text-sm cursor-pointer">View Example <ChevronRight size={16} className="group-hover:translate-x-1 duration-300"/></button>
                    </div> 
                </div>
                <div className="border-border border-[1px] px-2 rounded-2xl flex items-center justify-center flex-col gap-2 bg-background py-20">
                    <button className="p-1 px-2 rounded-lg bg-foreground text-background text-sm font-semibold">Example Roast</button>
                    <h1 className="text-center text-xl font-semibold">"Your projects are scarcer than a WiFi signal on a road trip—unstable, frustrating, and in need of a reboot. Time to re-build!"</h1>
                    <button className="p-1 px-3 flex items-center justify-center bg-green-500/10 text-green-500 rounded-full gap-1" >
                        Intensity: Spicy <Flame className="text-orange-500"/> <Flame className="text-orange-500"/>
                    </button>
                </div>
            </div>
        </div>
    )
}