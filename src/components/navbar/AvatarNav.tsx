import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

import useLogout from "@/hooks/useLogout";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { FiEdit, FiLogOut } from "react-icons/fi";

const AvatarNav = () => {
    const navigate = useNavigate()

    //todo: USER REDUX
    const { currentUser } = useSelector((state: RootState) => state.user)

    const { logout } = useLogout()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Avatar className="cursor-pointer">
                    <AvatarImage src={`${currentUser.imgUrl}`} alt={`${currentUser.imgUrl}`} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50 bg-white rounded-[0.375rem]">
                <DropdownMenuItem className="p-0" onClick={() => navigate('/profile')}>
                    <div className="w-full flex flex-row justify-start items-center gap-2 rounded-[0.375rem] cursor-pointer text-black p-2 hover:bg-zinc-200 transition">
                        <div className="p-2 border border-black rounded-[25px]">
                            <img src={`${currentUser.imgUrl}`} alt={`${currentUser.imgUrl}`} className="w-4 h-4" />
                        </div>
                        {currentUser.userName}
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0" onClick={() => navigate('/management')}>
                    <div className="w-full flex flex-row justify-start items-center gap-2 rounded-[0.375rem] cursor-pointer hover:bg-zinc-200 text-black transition p-2 ">
                        <div className="p-2 border border-black rounded-[25px]">
                            <FiEdit className="w-4 h-4" />
                        </div>
                        Product Management
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem className=" p-0" onClick={logout}>
                    <div className="w-full flex flex-row justify-start items-center gap-2 font-semibold rounded-[0.375rem] cursor-pointer hover:bg-zinc-200 text-black transition p-2">
                        <div className="p-2 border border-black rounded-[25px]">
                            <FiLogOut className="w-4 h-4" />
                        </div>
                        Log out
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}

export default AvatarNav
