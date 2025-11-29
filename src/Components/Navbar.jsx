import { Flame } from "lucide-react"
import { useEffect, useState } from "react"

export const Navbar = () => {

    const [isScrolled,setIsScrolled] = useState(false);

    useEffect(()=>{
        const handlescroll = () => {
        if(window.scrollY > 10) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }

        }
        window.addEventListener('scroll',handlescroll); 
        return () => window.removeEventListener('scroll',handlescroll);
    
    },[])
    
    return (
        <nav className={`px-6 py-2 fixed flex justify-between items-center transition-all duration-300 w-full z-10 ${
        isScrolled ? "bg-transparent shadow-md/5 backdrop-blur-lg" : "bg-transparent"
      }`}>
            <div className="flex items-center justify-center gap-2 px-3 py-2 bg-transparent">
                <div ><Flame className="text-indigo-500" size={30}/></div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Roast ME!</h1>
            </div>
            <div className="py-2">
                <button className="px-5 py-1 bg-foreground text-indigo-500 rounded-md flex cursor-pointer">
                    Roast Now! <Flame size={20} className="bg-foreground text-orange-500"/>
                </button>
            </div>
        </nav>
    )
}