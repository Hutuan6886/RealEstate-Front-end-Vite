import { Button } from "@/components/ui/button"

interface HelpItemProps {
    title: string
    description: string
    imgUrl: string
    buttonTitle: string
    onClick: () => void
}
const HelpItem: React.FC<HelpItemProps> = ({ title, description, imgUrl, buttonTitle, onClick }) => {
    return (
        <div className="w-full h-full p-2">
            <div className="flex flex-col items-center gap-2">
                <img className="size-32" src={imgUrl} alt={imgUrl} />
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-center text-zinc-700">{description}</p>
                <Button className="w-full font-semibold shadow-lg hover:border hover:border-teal-700 hover:text-teal-700 hover:bg-white" variant="login" onClick={onClick}>{buttonTitle}</Button>
            </div>
        </div>
    )
}

export default HelpItem
