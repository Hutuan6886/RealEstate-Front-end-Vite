import { useState } from "react";
import { Link } from "react-router-dom";

import { UserReduxType } from "@/types/types";

import { Button } from "@/components/ui/button";

import { FaCaretDown } from "react-icons/fa";
import { FiEdit, FiLogOut } from "react-icons/fi";
import useLogout from "@/hooks/useLogout";

interface AvatarSideBarProps {
    currentUser: UserReduxType
}

const AvatarSideBar: React.FC<AvatarSideBarProps> = ({ currentUser }) => {
    const [isOpenAvatarSideBar, setOpenAvatarSideBar] = useState(false)

    const onChangeCheckbox = () => {
        setOpenAvatarSideBar(!isOpenAvatarSideBar)
    }


    //todo: LOGOUT
    const { logout } = useLogout()

    return (
        <div className=" w-full flex flex-col items-center gap-2 bg-white shadow-md rounded-[1rem] p-4">
            <div className=" relative z-10 w-full flex flex-row justify-between items-center">
                <div className="w-full flex flex-row items-center justify-between gap-2">
                    <Link to={"/profile"} className="w-full flex flex-row items-center justify-start gap-3" >
                        <div className="p-2 border border-black rounded-[25px]">
                            <img src={`${currentUser.imgUrl ? currentUser.imgUrl : "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png"}`} alt={`${currentUser.imgUrl ? currentUser.imgUrl : "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png"}`} className="w-4 h-4" />
                        </div>
                        <p className="font-semibold">{currentUser.userName}</p>
                    </Link>
                    <div className="relative">
                        <input type="checkbox" className="w-full h-full absolute top-0 left-0 opacity-0 z-30 cursor-pointer" onChange={onChangeCheckbox} />
                        {isOpenAvatarSideBar ? <FaCaretDown className="text-xl rotate-180 transition-transform duration-300" /> : <FaCaretDown className="text-xl rotate-0 transition-transform duration-300" />}
                    </div>
                </div>
            </div>
            {isOpenAvatarSideBar &&
                <Link to={"/management"} className="w-[90%] ml-auto flex flex-col items-start gap-4 text-zinc-700 ">
                    <div className="flex flex-row items-center justify-start gap-2 text-sm hover:text-zinc-800 transition-colors"><div className="p-2 border border-black rounded-[25px]"><FiEdit /></div>Product Management</div>
                    <Button className="flex flex-row items-center justify-start gap-2 ml-auto rounded-[50px] bg-rose-800" onClick={logout} >Log out <FiLogOut /></Button>
                </Link>}
        </div>
    )
}

export default AvatarSideBar
