import { Button } from "../ui/button"
import MainNav from "./MainNav"
import { Link } from "react-router-dom"
import { UserReduxType } from "@/features/user/userSlice"
import { IoClose } from "react-icons/io5"
import AvatarSideBar from "./AvatarSideBar"


interface SideBarProps {
    visible: boolean
    closeSideBar: () => void
    currentUser: UserReduxType
}
const SideBar: React.FC<SideBarProps> = ({ visible, closeSideBar, currentUser }) => {
    return (
        <div className={`${visible && "fixed"} w-full h-full z-20`}>
            <div className={`fixed z-20 w-[60%] md:w-[40%] border-0 h-full bg-teal-700 rounded-l-[0.075rem] transition-all ${!visible ? "top-0 -right-[60%] md:-right-[40%]" : "top-0 right-0"}`}>
                <div className="relative w-full h-full p-3">
                    <Button variant='ghost' className="absolute top-1 left-1 bg-transparent hover:bg-transparent text-xl text-white" onClick={closeSideBar}><IoClose /></Button>
                    <div className="translate-y-16 flex flex-col items-start gap-4">
                        <MainNav className="flex flex-col items-start text-white" />
                        {!currentUser.id ?
                            <div className="w-full flex flex-col items-center gap-3">
                                <Link className="w-full " to='/register'><Button variant='ghost' className="w-full font-semibold text-lg text-teal-700 bg-white"> Register</Button></Link>
                                <Link className="w-full" to='/log-in'><Button variant='login' className="w-full font-semibold text-lg text-white bg-black hover:bg-black"> Log In</Button></Link>
                            </div>
                            : <AvatarSideBar currentUser={currentUser} />}
                    </div>
                </div>
            </div>
            {/* //todo: overlay */}
            {visible && <div className="fixed top-0 left-0 w-[40%] md:w-[60%] h-full" onClick={closeSideBar}></div>}
        </div >
    )
}

export default SideBar
