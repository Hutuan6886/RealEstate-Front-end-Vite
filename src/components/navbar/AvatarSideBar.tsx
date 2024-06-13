import { UserReduxType, logoutFailure, logoutLoading, logoutSuccess } from "@/features/user/userSlice"
import AvatarNav from "./AvatarNav"
import { FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { Button } from "../ui/button";

interface AvatarSideBarProps {
    currentUser: UserReduxType
}

const AvatarSideBar: React.FC<AvatarSideBarProps> = ({ currentUser }) => {
    const [isOpenAvatarSideBar, setOpenAvatarSideBar] = useState(false)
    const dispatch = useDispatch()

    const onChangeCheckbox = () => {
        setOpenAvatarSideBar(!isOpenAvatarSideBar)
    }

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
        <div className=" w-full flex flex-col items-center gap-2 bg-white shadow-md rounded-[1rem] p-4">
            <div className=" relative z-10 w-full flex flex-row justify-between items-center">
                <input type="checkbox" className="w-full h-full absolute top-0 left-0 opacity-0 z-30 cursor-pointer" onChange={onChangeCheckbox} />
                <div className="w-full flex flex-row items-center justify-start gap-2"><AvatarNav /> {currentUser.userName} </div>
                {isOpenAvatarSideBar ? <FaCaretDown className="text-xl rotate-180 transition-transform duration-300" /> : <FaCaretDown className="text-xl rotate-0 transition-transform duration-300" />}
            </div>
            {isOpenAvatarSideBar && <div className="w-[80%] ml-auto flex flex-col items-start gap-4 text-zinc-700 ">
                <Link to="/management" className="hover:text-zinc-800 transition-colors">Management</Link>
                <Link to="/profile" className="hover:text-zinc-800 transition-colors">User Information</Link>
                <Button className="flex flex-row items-center justify-start gap-2 ml-auto rounded-[50px] bg-rose-800" onClick={logout} >Log out <FiLogOut /></Button>
            </div>}
        </div>
    )
}

export default AvatarSideBar
