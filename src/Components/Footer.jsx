import { Heart } from "lucide-react"
import { useState } from "react"

const github = {name:"My github",href:'https://github.com/AmitSharma404'}

export const Footer = () => {

    const [count,setCount] = useState(0);
    return (
        <div className="py-6 px-10 flex flex-col">
            <div>
                <hr className="border-none h-[2px] w-full bg-foreground/70 my-6"/>
            </div>
            <div>
                <h1 className="text-lg font-bold">{new Date().getFullYear()} Roast My Stuff. All rights reserved <a href={github.href} className="text-indigo-500">{github.name}</a> {count} </h1>
            </div>
            <div className="absolute right-20 h-14 w-14 bg-pink-500/20 rounded-full flex items-center justify-center translate-y-8 cursor-pointer select-none" onClick={() => setCount((prev)=>prev+1)}>
                <Heart fill="#f6339a" size={30} className="text-pink-500 active:scale-80 transition-transform duration-300"/>
            </div>
        </div>
    )
}