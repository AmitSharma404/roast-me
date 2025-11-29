import { ArrowLeft } from "lucide-react"

export const Roasted = () => {
    return (
        <div className="py-4 px-10 flex justify-between">
            <a href="/" >
                    <button className="px-3 py-2 bg-zinc-900 text-white rounded-lg font-semibold cursor-pointer flex items-center justify-center gap-2 border-1 border-foreground/5"> <ArrowLeft size={18}/>Back </button>
                </a>
        </div>
    )
}