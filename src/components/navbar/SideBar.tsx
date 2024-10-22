import { Link } from "react-router-dom"

import { UserReduxType } from "@/types/types"

import MainNav from "./MainNav"
import AvatarSideBar from "./AvatarSideBar"

import { Button } from "@/components/ui/button"

import { IoClose } from "react-icons/io5"

interface SideBarProps {
    visible: boolean
    closeSideBar: () => void
    currentUser: UserReduxType
}
const SideBar: React.FC<SideBarProps> = ({ visible, closeSideBar, currentUser }) => {
    return (
        <div className={`${visible && "fixed"} w-full h-full z-20`}>
            <div className={`fixed z-20 w-[60%] md:w-[40%] border-0 h-full bg-zinc-800 rounded-l-[0.075rem] transition-all ${!visible ? "top-0 -right-[60%] md:-right-[40%]" : "top-0 right-0"}`}>
                <div className="relative w-full h-full p-3">
                    <Button variant='ghost' className="absolute top-1 left-1 bg-transparent hover:bg-transparent text-xl text-white" onClick={closeSideBar}><IoClose /></Button>
                    <div className="translate-y-16 flex flex-col items-start gap-3">
                        <MainNav className="flex flex-col items-start text-white" />
                        {currentUser.id
                            ? <Link to='/saved-homes'><Button className="text-white font-semibold" variant='nav'>Saved Homes</Button></Link>
                            : null}
                        {!currentUser.id ?
                            <div className="w-full flex flex-row items-center gap-2">
                                <Link className="w-full " to='/register'><Button variant='default' className="w-full font-bold bg-white text-zinc-700"> Register</Button></Link>
                                <Link className="w-full" to='/log-in'><Button variant='login' className="w-full font-bold"> Log In</Button></Link>
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
