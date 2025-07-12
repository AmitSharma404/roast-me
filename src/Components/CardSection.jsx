import { Flame, Globe, Laugh, ThumbsUp,Github,  FileText } from "lucide-react"


const Items = [
    {icon:<Flame/>,name:"3 Roast Levels",desc:'Choose from Mild, Spicy, or Extra Burn depending on how much heat you can handle.'},
    {icon:<FileText/>,name:"Resume Analysis",desc:'Upload your resume and get detailed feedback on formatting, content, and impact.'},
    {icon:<Github/>,name:"Github Critics",desc:'Share your GitHub profile for insights on projects, commit patterns, and documentation.'},
    {icon:<Globe/>,name:"Portfolio Review",desc:'Get your portfolio website analyzed for design, UX, and content effectiveness.'},
    {icon:<ThumbsUp/>,name:"Progress Tracking",desc:'Track improvements over time as you implement suggestions.'},
    {icon:<Laugh/>,name:"Humor That Helps",desc:'Learn through laughter with roasts that entertain while educating.'}
]

export const CardSection = () => {

    return (
        <div className="flex flex-col md:px-[4rem] lg:px-[5rem] sm:px-10 px-6 ">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold sm:py-4">Features That Burn and Build</h1>
            <p className="font-semibold text-md md:text-lg py-2">Upload your resume, website, or portfolio and let our AI give you a brutally honest roast.</p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Items.map((item,key)=> (
                    <div key={key} className="border-border/70 border-[1px] px-10 py-10 rounded-2xl hover:border-border">
                        <div className="flex gap-4 items-center py-2  text-center font-bold"><div className="h-10 w-10 bg-indigo-500/20 text-indigo-500 items-center justify-center flex rounded-lg">{item.icon}</div>{item.name}</div>
                        <p className="text-foreground/80 text-sm py-2 text-left sm:text-center">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}