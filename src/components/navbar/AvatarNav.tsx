import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";


const AvatarNav = () => {
    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src="https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50 bg-white">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link to="/management">Management</Link></DropdownMenuItem>
                <DropdownMenuItem><Link to="/profile">User Information</Link></DropdownMenuItem>
                <DropdownMenuItem><Link className="flex flex-row justify-start items-center gap-2" to="">Log out <FiLogOut /></Link></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AvatarNav
