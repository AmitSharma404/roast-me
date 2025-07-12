import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react"

export const Dark = () => {

    const [isDarkmode,setIsDarkmode] = useState(true);


    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if(theme === 'light') {
            document.documentElement.classList.add('dark');
            setIsDarkmode(false);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkmode(true);
        }
    },[])
        
        const ThemeToggle = () => {
            if(isDarkmode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme','light');
                setIsDarkmode(false);
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme','dark');
                setIsDarkmode(true)
            }
        }





    return (
        <button className="fixed top-3 right-50 cursor-pointer z-10 hidden lg:block" onClick={ThemeToggle} >
           
                {isDarkmode ? <div className="h-10 w-10 flex justify-center items-center bg-yellow-400/20 rounded-full"><Sun className="text-yellow-300"/></div> : <div className="h-10 w-10 flex justify-center items-center bg-blue-700/20 rounded-full"><Moon className="text-blue-700"/></div> }
        </button>
    )
}