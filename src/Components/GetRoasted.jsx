import { Flame, Lightbulb, MessageCircle, Share2 } from "lucide-react"

const items = [
    {icon:<MessageCircle size={40}/>,name:"Fun & Engaging Feedback",desc:"Receiving feedback doesn't have to be boring. Our AI delivers critiques with humor that makes improvement enjoyable."},
    {icon:<Lightbulb size={40}/>,name:"Actionable Insights",desc:"Behind every joke is a real tip to help you improve your professional materials and stand out."},
    {icon:<Share2 size={40}/>,name:'Shareable Results',desc:"Share your roasts on social media to show your growth journey and sense of humor."}
]

export const GetRoasted = () => {
    return (
        <div className="flex flex-col px-10 py-10">
            <div>
                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-foreground">Why Get Roasted ?</h1>
            </div>
            <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 mt-10 py-4 gap-4">
                {items.map((item,key)=> (
                    <div key={key} className="flex items-center flex-col bg-indigo-500/5 rounded-xl gap-4 px-4 py-6">
                        <div className="h-20 w-20 flex items-center justify-center bg-indigo-500/15 text-indigo-500 rounded-full">{item.icon}</div>
                        <h1 className="text-xl font-bold">{item.name}</h1>
                        <p className="">{item.desc}</p>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center">
                <button className="flex px-4 py-3 border-indigo-500 border-2 bg-indigo-500/20 rounded-lg items-center ">
                    <Flame className="text-orange-500"/>
                    Get Started
                </button>

            </div>
        </div>
    )
}