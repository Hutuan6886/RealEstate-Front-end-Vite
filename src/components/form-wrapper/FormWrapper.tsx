import { Link } from "react-router-dom";


interface FormWrapperProps {
    label: string;
    redirectLabel: string
    redirectUrl: string;
    children: React.ReactNode
}
const FormWrapper: React.FC<FormWrapperProps> = ({ label, redirectLabel, redirectUrl, children }) => {
    return (
        <div className="relative w-full h-full">
            <div className="absolute w-full flex flex-col items-center gap-5 top-0 left-0 md:top-1/2 md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2">
                <h1 className="font-bold text-4xl text-teal-700">{label}</h1>
                {children}
                <Link className="text-sm italic hover:text-zinc-700 transition" to={redirectUrl}>{redirectLabel}</Link>
            </div>
        </div>
    )
}

export default FormWrapper
