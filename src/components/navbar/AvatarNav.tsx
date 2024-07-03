import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logoutFailure, logoutLoading, logoutSuccess } from "@/features/user/userSlice";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const AvatarNav = () => {
    const dispatch = useDispatch()

    const logout = async () => {
        //todo: Để thực hiện logout function: Post api logout -> tại api thực hiện clearCookie access_token. Tại front-end thực hiện update currentUser thành user rỗng 
        try {
            dispatch(logoutLoading())
            const res = await fetch('/api/auth/logout', {
                method: 'post', cache: 'no-cache',
                headers: {
                    "Content-type": "application/json"
                }
            })
            const { message } = await res.json()
            if (res.ok) {
                dispatch(logoutSuccess())
                toast({
                    className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
                    description: message
                })
            } else {
                toast({
                    variant: 'destructive',
                    className: 'bg-red-600 border-0 text-white rounded-[0.375rem]',
                    description: message
                })
                dispatch(logoutFailure())
            }
        } catch (error) {
            toast({
                variant: "destructive",
                className: 'bg-red-600 border-0 text-white rounded-[0.375rem]',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            dispatch(logoutFailure())
        }
    }

    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Avatar className="cursor-pointer">
                    <AvatarImage src="https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50 bg-white rounded-[0.375rem]">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <hr />
                <DropdownMenuItem className="p-0"><Link to="/management" className="w-full rounded-[0.375rem] hover:bg-teal-700 hover:text-white transition p-2 ">Management</Link></DropdownMenuItem>
                <DropdownMenuItem className="p-0"><Link to="/profile" className="w-full rounded-[0.375rem] hover:bg-teal-700 hover:text-white transition p-2">User Information</Link></DropdownMenuItem>
                <DropdownMenuItem><Link className="flex flex-row justify-start items-center gap-2 font-semibold" to="" onClick={logout}>Log out <FiLogOut /></Link></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AvatarNav
