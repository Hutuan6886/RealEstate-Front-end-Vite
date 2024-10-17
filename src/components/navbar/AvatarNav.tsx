import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

import { logoutUserFailure, logoutUserLoading, logoutUserSuccess } from "@/features/user/userSlice";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ToastAction } from "@/components/ui/toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

import { FiEdit, FiLogOut } from "react-icons/fi";

const AvatarNav = () => {
    const navigate = useNavigate()

    const { currentUser } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const logout = async () => {
        //todo: Để thực hiện logout function: Post api logout -> tại api thực hiện clearCookie access_token. Tại front-end thực hiện update currentUser thành user rỗng 
        try {
            dispatch(logoutUserLoading())
            const res = await fetch('/api/auth/logout', {
                method: 'post', cache: 'no-cache',
                headers: {
                    "Content-type": "application/json"
                }
            })
            const { message } = await res.json()
            if (res.ok) {
                dispatch(logoutUserSuccess())
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
                dispatch(logoutUserFailure())
            }
        } catch (error) {
            toast({
                variant: "destructive",
                className: 'bg-red-600 border-0 text-white rounded-[0.375rem]',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            dispatch(logoutUserFailure())
        }
    }

    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Avatar className="cursor-pointer">
                    <AvatarImage src={`${currentUser.imgUrl ? currentUser.imgUrl : "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png"}`} alt={`${currentUser.imgUrl ? currentUser.imgUrl : "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png"}`} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50 bg-white rounded-[0.375rem]">
                <DropdownMenuItem className="p-0" onClick={() => navigate('/profile')}>
                    <div className="w-full flex flex-row justify-start items-center gap-2 rounded-[0.375rem] cursor-pointer text-black p-2 hover:bg-zinc-200 transition">
                        <div className="p-2 border border-black rounded-[25px]">
                            <img src={`${currentUser.imgUrl ? currentUser.imgUrl : "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png"}`} alt={`${currentUser.imgUrl ? currentUser.imgUrl : "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png"}`} className="w-4" />
                        </div>
                        {currentUser.userName}
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0" onClick={() => navigate('/management')}>
                    <div className="w-full flex flex-row justify-start items-center gap-2 rounded-[0.375rem] cursor-pointer hover:bg-zinc-200 text-black transition p-2 ">
                        <div className="p-2 border border-black rounded-[25px]">
                            <FiEdit className="w-4" />
                        </div>
                        Management Product
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem className=" p-0" onClick={logout}>
                    <div className="w-full flex flex-row justify-start items-center gap-2 font-semibold rounded-[0.375rem] cursor-pointer hover:bg-zinc-200 text-black transition p-2">
                        <div className="p-2 border border-black rounded-[25px]">
                            <FiLogOut className="w-4" />
                        </div>
                        Log out
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}

export default AvatarNav
