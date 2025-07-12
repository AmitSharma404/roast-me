import { CircleCheckBig, MessageSquare, Upload, Zap } from "lucide-react"

const items = [
    {icon:<Upload size={40}/>,name:'Upload Your Work',desc:'Share your resume, GitHub profile, or portfolio website link.'},
    {icon:<Zap size={40}/>,name:'Choose Roast Level',desc:'Select from Mild, Spicy, or Extra Burn intensity levels.'},
    {icon:<MessageSquare size={40}/>,name:'Get Roasted',desc:"Receive AI-generated feedback that's both funny and insightful."},
    {icon:<CircleCheckBig size={40}/>,name:'Implement & Improve',desc:'Use the actionable advice to enhance your professional materials.'},
]

export const Work = () => {
    return (
        <div className="flex flex-col py-20 md:px-10 pb-20">
            <div><h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">How it works ?</h1>
            <p className="text-xl py-3 sm:px-4 px-6">Four simple steps to get roasted and improve your professional presence.</p>
            </div>
            <div className="grid sm:grid-col-2 md:grid-cols-4 px-10 md:px-0 py-10 gap-4">
                {items.map((item,key)=> (
                    <div key={key} className="flex items-center flex-col py-6 bg-indigo-500/5 gap-2 rounded-lg px-3">
                        <div className="h-20 w-20 bg-indigo-500/20 text-indigo-500 flex items-center justify-center rounded-full">{item.icon}</div>
                        <h1 className="font-bold text-xl">{item.name}</h1>
                        <p>{item.desc}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}