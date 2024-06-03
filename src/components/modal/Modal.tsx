import { useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { closeDeleteModal } from "@/features/user/userSlice";

interface ModalProps {
    children: React.ReactNode,
    isOpen: boolean;
    title: string;
    description?: string
}
const Modal: React.FC<ModalProps> = ({ children, isOpen, title, description }) => {
    const dispatch = useDispatch()

    const onChange = (open: boolean) => {
        //* Nếu click vào close button trên modal -> onOpenChange thực thi -> open truyền vào onChange là false -> if thực thi set state close Modal
        if (!open) {
            dispatch(closeDeleteModal()) //* set state close Modal
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent className="bg-white rounded-[0.375rem]">
                <DialogHeader>
                    <DialogTitle className="text-teal-700">{title}</DialogTitle>
                    <DialogDescription className="text-zinc-400">{description}</DialogDescription>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}

export default Modal
